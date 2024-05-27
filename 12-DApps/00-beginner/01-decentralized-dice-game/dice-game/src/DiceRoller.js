// src/DiceRoller.js

import React, { useState } from 'react';
import { ethers } from 'ethers';

const DiceRoller = ({ contractAddress, abi }) => {
    const [rolling, setRolling] = useState(false);
    const [rollResult, setRollResult] = useState(null);

    // Function to request a dice roll
    const rollDice = async () => {
        try {
            setRolling(true);
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const diceGameContract = new ethers.Contract(contractAddress, abi, signer);

                const tx = await diceGameContract.rollDice();
                await tx.wait();

                // Listen for the DiceLanded event
                diceGameContract.on("DiceLanded", (requestId, result) => {
                    setRollResult(result.toNumber());
                    setRolling(false);
                });
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.error(error);
            setRolling(false);
        }
    };

    return (
        <div>
            <button onClick={rollDice} disabled={rolling}>
                {rolling ? 'Rolling...' : 'Roll Dice'}
            </button>
            {rollResult !== null && <p>Dice landed on: {rollResult}</p>}
        </div>
    );
};

export default DiceRoller;