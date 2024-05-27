// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract DiceGame is VRFConsumerBase {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;

    mapping(bytes32 => address) public requestIdToSender;

    event DiceRolled(bytes32 indexed requestId, address indexed roller);
    event DiceLanded(bytes32 indexed requestId, uint256 indexed result);

    constructor() 
        VRFConsumerBase(
            0xYourVRFConsumerAddress, // VRF Coordinator
            0xYourLinkTokenAddress // LINK Token
        ) public
    {
        keyHash = 0xYourKeyHash;
        fee = 0.1 * 10 ** 18; // 0.1 LINK
    }

    function rollDice() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = msg.sender;
        emit DiceRolled(requestId, msg.sender);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 diceroll = (randomness % 6) + 1;
        randomResult = diceroll;
        emit DiceLanded(requestId, diceroll);
    }

    // Add a function to allow users to bet on the outcome and distribute rewards.
}