// /src/utils/web3Utils.js
import Web3 from 'web3';
import SurveyContract from '../abis/SurveyContract.json';

let web3;
let surveyContract;

export const initWeb3 = () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      window.ethereum.request({ method: 'eth_requestAccounts' }); // Modern dApp browsers
      const contractAddress = '<Your_Contract_Address>'; // Replace with your contract's address
      const contractABI = SurveyContract.abi;
      surveyContract = new web3.eth.Contract(contractABI, contractAddress);
    } catch (error) {
      console.error("You must allow access to your account to use the application.");
    }
  } else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
};

export const createSurvey = async (title, questions) => {
  // Implementation
};

export const submitResponse = async (surveyId, questionId, response) => {
  // Implementation
};

export const getSurvey = async (surveyId) => {
  // Implementation
};