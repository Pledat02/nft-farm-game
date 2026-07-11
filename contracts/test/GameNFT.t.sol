// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {GameNFT} from "../src/GameNFT.sol";

contract GameNFTTest is Test {
    GameNFT nft;

    address alice = address(0xA11CE);
    address bob = address(0xB0B);

    function setUp() public {
        nft = new GameNFT();
    }

    function test_MintAssignsOwnerAndInitialState() public {
        vm.prank(alice);
        uint256 tokenId = nft.mint();

        assertEq(nft.ownerOf(tokenId), alice);
        assertEq(nft.level(tokenId), 1);
        assertEq(nft.lastClaimTime(tokenId), block.timestamp);
        assertEq(nft.resourcePoints(tokenId), 0);
    }

    function test_ClaimAccruesResourceAfterTimePasses() public {
        vm.prank(alice);
        uint256 tokenId = nft.mint();

        uint256 elapsed = 3600; // 1 hour
        vm.warp(block.timestamp + elapsed);

        uint256 expected = elapsed * nft.BASE_RATE() * nft.level(tokenId);

        vm.prank(alice);
        nft.claim(tokenId);

        assertEq(nft.resourcePoints(tokenId), expected);
        assertEq(nft.lastClaimTime(tokenId), block.timestamp);
    }

    function test_ClaimAccruesNothingIfNoTimePassed() public {
        vm.prank(alice);
        uint256 tokenId = nft.mint();

        vm.prank(alice);
        nft.claim(tokenId);

        assertEq(nft.resourcePoints(tokenId), 0);
    }

    function test_ClaimRevertsForNonOwner() public {
        vm.prank(alice);
        uint256 tokenId = nft.mint();

        vm.warp(block.timestamp + 3600);

        vm.prank(bob);
        vm.expectRevert("GameNFT: not owner");
        nft.claim(tokenId);
    }

    function test_PendingRewardsMatchesClaimAmount() public {
        vm.prank(alice);
        uint256 tokenId = nft.mint();

        vm.warp(block.timestamp + 1800); // 30 minutes

        uint256 pending = nft.pendingRewards(tokenId);

        vm.prank(alice);
        nft.claim(tokenId);

        assertEq(nft.resourcePoints(tokenId), pending);
    }

    function test_ClaimTwiceAccumulatesSeparately() public {
        vm.prank(alice);
        uint256 tokenId = nft.mint();

        vm.warp(block.timestamp + 1000);
        vm.prank(alice);
        nft.claim(tokenId);
        uint256 firstAmount = nft.resourcePoints(tokenId);

        vm.warp(block.timestamp + 500);
        vm.prank(alice);
        nft.claim(tokenId);

        uint256 secondAccrual = 500 * nft.BASE_RATE() * nft.level(tokenId);
        assertEq(nft.resourcePoints(tokenId), firstAmount + secondAccrual);
    }

    function test_MintIncrementsTokenIdSequentially() public {
        vm.prank(alice);
        uint256 first = nft.mint();
        vm.prank(bob);
        uint256 second = nft.mint();

        assertEq(first, 0);
        assertEq(second, 1);
        assertEq(nft.ownerOf(first), alice);
        assertEq(nft.ownerOf(second), bob);
    }
}
