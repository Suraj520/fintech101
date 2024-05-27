// src/App.js

import React from 'react';
import './App.css';
import DiceRoller from './DiceRoller';
import diceGameAbi from './diceGameAbi.json'; // Assume this is your contract's ABI

const contractAddress = "0xYourContractAddress";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DiceRoller contractAddress={contractAddress} abi={diceGameAbi} />
      </header>
    </div>
  );
}

export default App;