const SurveyContract = artifacts.require("SurveyContract");

module.exports = function(deployer) {
  deployer.deploy(SurveyContract);
};