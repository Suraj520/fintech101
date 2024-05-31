// migrations/2_deploy_contracts.js

const WeatherStation = artifacts.require("WeatherStation");

module.exports = function (deployer) {
    deployer.deploy(WeatherStation);
};