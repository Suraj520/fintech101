import Web3 from 'web3';
    import React, { useEffect, useState } from 'react';
    import SimpleTokenABI from './SimpleTokenABI.json'; // Import the ABI of your contract

    const App = () => {
      const [account, setAccount] = useState('');
      const [contract, setContract] = useState(null);

      useEffect(() => {
        const loadBlockchainData = async () => {
          const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
          const accounts = await web3.eth.requestAccounts();
          setAccount(accounts[0]);

          const simpleToken = new web3.eth.Contract(SimpleTokenABI, "<Your_Contract_Address>");
          setContract(simpleToken);
        };

        loadBlockchainData();
      }, []);

      // Add more functionality as needed, e.g., to display balance or transfer tokens

      return (
        <div>
          <h2>Simple Token DApp</h2>
          <p>Account: {account}</p>
          {/* Display more information about interactions */}
        </div>
      );
    };

    export default App;