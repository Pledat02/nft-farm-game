// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/access/Ownable.sol";

/// @title GameNFT
/// @notice Idle-farming character NFT. Each token accrues resource points
/// over time since its last claim, at a rate determined by its level.
contract GameNFT is ERC721, Ownable {
    /// @notice Base resource points accrued per second at level 1.
    uint256 public constant BASE_RATE = 1;

    uint256 private _nextTokenId;

    mapping(uint256 => uint256) public level;
    mapping(uint256 => uint256) public lastClaimTime;
    mapping(uint256 => uint256) public resourcePoints;

    event Minted(address indexed to, uint256 indexed tokenId);
    event Claimed(uint256 indexed tokenId, uint256 amount, uint256 newTotal);

    constructor() ERC721("Game Farmer", "FARMER") Ownable(msg.sender) {}

    /// @notice Mint a new level-1 Farmer NFT to the caller.
    function mint() external returns (uint256 tokenId) {
        tokenId = _nextTokenId++;
        level[tokenId] = 1;
        lastClaimTime[tokenId] = block.timestamp;
        _safeMint(msg.sender, tokenId);
        emit Minted(msg.sender, tokenId);
    }

    /// @notice Claim accrued resource points for a Farmer NFT.
    /// @dev Only the token owner can claim. Resets the accrual clock.
    function claim(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "GameNFT: not owner");

        uint256 elapsed = block.timestamp - lastClaimTime[tokenId];
        uint256 accrued = elapsed * BASE_RATE * level[tokenId];

        resourcePoints[tokenId] += accrued;
        lastClaimTime[tokenId] = block.timestamp;

        emit Claimed(tokenId, accrued, resourcePoints[tokenId]);
    }

    /// @notice Resource points a token would accrue if claimed right now.
    function pendingRewards(uint256 tokenId) external view returns (uint256) {
        uint256 elapsed = block.timestamp - lastClaimTime[tokenId];
        return elapsed * BASE_RATE * level[tokenId];
    }
}
