import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Import the ABI of your contract. Make sure to replace this with your actual ABI
import WeatherStationABI from './WeatherStationABI.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [dataCount, setDataCount] = useState(0);

  // Initialize web3 and contract instance
  useEffect(() => {
    const initWeb3 = async () => {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      
      // Replace 'YourDeployedContractAddress' with your actual contract address
      const deployedNetwork = { address: 'YourDeployedContractAddress' };
      
      const contract = new web3.eth.Contract(
        WeatherStationABI, // Use the imported ABI
        deployedNetwork && deployedNetwork.address,
      );
      
      setWeb3(web3);
      setAccounts(accounts);
      setContract(contract);
    };
    initWeb3();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract && temperature && humidity) {
      try {
        await contract.methods.addWeatherData(temperature, humidity).send({ from: accounts[0] });
        alert('Weather data submitted successfully!');
        setTemperature('');
        setHumidity('');
      } catch (error) {
        alert(`Failed to submit weather data: ${error.message}`);
      }
    } else {
      alert('Please make sure both temperature and humidity are provided.');
    }
  };

  const fetchDataCount = async () => {
    if (contract) {
      try {
        const count = await contract.methods.getDataCount().call();
        setDataCount(count);
        alert(`Data count fetched successfully: ${count}`);
      } catch (error) {
        alert(`Failed to fetch data count: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h1>Decentralized Weather Station</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          placeholder="Temperature (°C)"
        />
        <input
          type="text"
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          placeholder="Humidity (%)"
        />
        <button type="submit">Submit Weather Data</button>
      </form>
      <button onClick={fetchDataCount}>Get Data Count</button>
      <p>Data Entries: {dataCount}</p>
    </div>
  );
}

export default App;