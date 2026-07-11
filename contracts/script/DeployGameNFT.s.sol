// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {GameNFT} from "../src/GameNFT.sol";

contract DeployGameNFT is Script {
    function run() external returns (GameNFT) {
        uint256 deployerKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerKey);
        GameNFT nft = new GameNFT();
        vm.stopBroadcast();

        console.log("GameNFT deployed at:", address(nft));
        return nft;
    }
}
