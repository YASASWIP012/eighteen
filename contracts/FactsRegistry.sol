// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Receives public channel facts sealed by a workflow. The channel is a
/// hash, and only counts and a digest are stored, so no child is named here.
contract FactsRegistry {
    address public immutable forwarder;

    struct Seal {
        bytes32 digest;
        uint32 videos;
        uint32 contradictions;
        uint64 sealedAt;
    }

    mapping(bytes32 => Seal[]) private seals;

    event FactsSealed(bytes32 indexed channelRef, bytes32 digest, uint32 videos, uint32 contradictions);

    error NotForwarder();

    constructor(address forwarder_) {
        forwarder = forwarder_;
    }

    function onReport(bytes calldata, bytes calldata report) external {
        if (msg.sender != forwarder) revert NotForwarder();
        (bytes32 channelRef, bytes32 digest, uint32 videos, uint32 contradictions) =
            abi.decode(report, (bytes32, bytes32, uint32, uint32));
        seals[channelRef].push(Seal(digest, videos, contradictions, uint64(block.timestamp)));
        emit FactsSealed(channelRef, digest, videos, contradictions);
    }

    function sealCount(bytes32 channelRef) external view returns (uint256) {
        return seals[channelRef].length;
    }

    function sealAt(bytes32 channelRef, uint256 index) external view returns (Seal memory) {
        return seals[channelRef][index];
    }

    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0x01ffc9a7 || interfaceId == 0x805ffb3d;
    }
}
