// contracts/WeatherStation.sol

pragma solidity ^0.8.0;

contract WeatherStation {
    struct WeatherData {
        uint256 timestamp;
        string temperature;
        string humidity;
    }

    WeatherData[] public dataEntries;

    function addWeatherData(string memory temperature, string memory humidity) public {
        dataEntries.push(WeatherData(block.timestamp, temperature, humidity));
    }

    function getDataCount() public view returns (uint256) {
        return dataEntries.length;
    }
}