// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20Minimal {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}

interface ISetAsideVerifier {
    function verifyProof(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[8] calldata publicSignals
    ) external view returns (bool);
}

interface IFactsRegistry {
    struct Attestation {
        bytes32 channelRef;
        uint256 factsDigest;
        uint256 earningsCommitment;
        uint32 videos;
        uint32 contradictions;
        uint64 sealedAt;
    }

    function attestation(uint256 dealId, uint256 periodId) external view returns (Attestation memory);
}

/// @notice Holds a sponsorship under a contractual compliance clause. The
/// creator's share releases only after the period's sampled review has closed
/// and a proof shows a deposit, signed by the deal's fiduciary, covers what the
/// statute requires. The earnings and public facts in that proof must match the
/// oracle report for the period, and a reported contradiction stops the payout.
/// The trust itself stays with a bank or fiduciary, never in this contract.
contract ProofGatedEscrow {
    struct Deal {
        address brand;
        address creator;
        address reviewer;
        uint96 amount;
        uint64 refundAfter;
        uint8 jurisdiction;
        bool settled;
        uint256 fiduciaryAx;
        uint256 fiduciaryAy;
    }

    IERC20Minimal public immutable token;
    ISetAsideVerifier public immutable verifier;
    IFactsRegistry public immutable registry;

    mapping(uint256 => Deal) public deals;
    /// @dev Keyed by deal and period; holds the commitment the reviewer signed off.
    mapping(uint256 => mapping(uint256 => uint256)) public reviewed;

    event DealOpened(uint256 indexed dealId, uint256 amount);
    event ReviewClosed(uint256 indexed dealId, uint256 indexed periodId, uint256 commitment);
    event Released(uint256 indexed dealId, uint256 indexed periodId);
    event Refunded(uint256 indexed dealId);

    error DealExists();
    error UnknownDeal();
    error NotReviewer();
    error ReviewOpen();
    error InvalidProof();
    error AlreadySettled();
    error TooEarly();
    error TransferFailed();
    error BadJurisdiction();
    error EmptyCommitment();
    error NotAttested();
    error Contradiction();

    constructor(IERC20Minimal token_, ISetAsideVerifier verifier_, IFactsRegistry registry_) {
        token = token_;
        verifier = verifier_;
        registry = registry_;
    }

    function open(
        uint256 dealId,
        address creator,
        address reviewer,
        uint96 amount,
        uint64 refundAfter,
        uint8 jurisdiction,
        uint256 fiduciaryAx,
        uint256 fiduciaryAy
    ) external {
        if (deals[dealId].brand != address(0)) revert DealExists();
        if (jurisdiction > 2) revert BadJurisdiction();
        deals[dealId] =
            Deal(msg.sender, creator, reviewer, amount, refundAfter, jurisdiction, false, fiduciaryAx, fiduciaryAy);
        if (!token.transferFrom(msg.sender, address(this), amount)) revert TransferFailed();
        emit DealOpened(dealId, amount);
    }

    function closeReview(uint256 dealId, uint256 periodId, uint256 commitment) external {
        Deal storage deal = deals[dealId];
        if (deal.brand == address(0)) revert UnknownDeal();
        if (msg.sender != deal.reviewer) revert NotReviewer();
        if (commitment == 0) revert EmptyCommitment();
        reviewed[dealId][periodId] = commitment;
        emit ReviewClosed(dealId, periodId, commitment);
    }

    function release(
        uint256 dealId,
        uint256 periodId,
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c
    ) external {
        Deal storage deal = deals[dealId];
        if (deal.brand == address(0)) revert UnknownDeal();
        if (deal.settled) revert AlreadySettled();

        uint256 commitment = reviewed[dealId][periodId];
        if (commitment == 0) revert ReviewOpen();

        IFactsRegistry.Attestation memory report = registry.attestation(dealId, periodId);
        if (report.earningsCommitment == 0) revert NotAttested();
        if (report.contradictions != 0) revert Contradiction();

        uint256[8] memory signals = [
            commitment,
            dealId,
            periodId,
            uint256(deal.jurisdiction),
            deal.fiduciaryAx,
            deal.fiduciaryAy,
            report.earningsCommitment,
            report.factsDigest
        ];
        if (!verifier.verifyProof(a, b, c, signals)) revert InvalidProof();

        deal.settled = true;
        if (!token.transfer(deal.creator, deal.amount)) revert TransferFailed();
        emit Released(dealId, periodId);
    }

    /// @notice Returns the money to the brand if no valid proof arrives in time.
    function refund(uint256 dealId) external {
        Deal storage deal = deals[dealId];
        if (deal.brand == address(0)) revert UnknownDeal();
        if (deal.settled) revert AlreadySettled();
        if (block.timestamp < deal.refundAfter) revert TooEarly();

        deal.settled = true;
        if (!token.transfer(deal.brand, deal.amount)) revert TransferFailed();
        emit Refunded(dealId);
    }
}
