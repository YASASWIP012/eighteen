// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Receives reports sealed by a workflow. The channel is a hash, and
/// earnings arrive only as a commitment, so no child or income appears here.
contract FactsRegistry {
    uint256 private constant SNARK_FIELD =
        21888242871839275222246405745257275088548364400416034343698204186575808495617;

    address public immutable forwarder;

    struct Attestation {
        bytes32 channelRef;
        uint256 factsDigest;
        uint256 earningsCommitment;
        uint32 videos;
        uint32 contradictions;
        uint64 sealedAt;
    }

    /// @dev Keyed by deal and period; a later report replaces an earlier one.
    mapping(uint256 => mapping(uint256 => Attestation)) private attestations;

    event FactsSealed(
        uint256 indexed dealId,
        uint256 indexed periodId,
        bytes32 channelRef,
        uint256 factsDigest,
        uint256 earningsCommitment,
        uint32 videos,
        uint32 contradictions
    );

    error NotForwarder();

    constructor(address forwarder_) {
        forwarder = forwarder_;
    }

    function onReport(bytes calldata, bytes calldata report) external {
        if (msg.sender != forwarder) revert NotForwarder();
        (
            uint256 dealId,
            uint256 periodId,
            bytes32 channelRef,
            bytes32 digest,
            uint256 earningsCommitment,
            uint32 videos,
            uint32 contradictions
        ) = abi.decode(report, (uint256, uint256, bytes32, bytes32, uint256, uint32, uint32));

        uint256 factsDigest = uint256(digest) % SNARK_FIELD;
        attestations[dealId][periodId] = Attestation(
            channelRef, factsDigest, earningsCommitment, videos, contradictions, uint64(block.timestamp)
        );
        emit FactsSealed(dealId, periodId, channelRef, factsDigest, earningsCommitment, videos, contradictions);
    }

    function attestation(uint256 dealId, uint256 periodId) external view returns (Attestation memory) {
        return attestations[dealId][periodId];
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0x01ffc9a7 || interfaceId == 0x805ffb3d;
    }
}
