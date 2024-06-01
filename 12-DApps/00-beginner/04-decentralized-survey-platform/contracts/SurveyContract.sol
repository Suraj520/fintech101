// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SurveyContract {
    struct Survey {
        string title;
        string[] questions;
        mapping(uint => string[]) responses;
    }

    mapping(uint => Survey) public surveys;
    uint public surveyCount;

    // Event declaration for creating a survey
    event SurveyCreated(uint surveyId, string title);

    // Event declaration for submitting a response
    event ResponseSubmitted(uint surveyId, uint questionId);

    constructor() {
        surveyCount = 0;
    }

    function createSurvey(string memory _title, string[] memory _questions) public {
        Survey storage newSurvey = surveys[surveyCount];
        newSurvey.title = _title;
        for (uint i = 0; i < _questions.length; i++) {
            newSurvey.questions.push(_questions[i]);
        }
        emit SurveyCreated(surveyCount, _title);
        surveyCount++;
    }

    function submitResponse(uint _surveyId, uint _questionId, string memory _response) public {
        require(_surveyId < surveyCount, "Survey does not exist.");
        require(_questionId < surveys[_surveyId].questions.length, "Question does not exist.");
        surveys[_surveyId].responses[_questionId].push(_response);
        emit ResponseSubmitted(_surveyId, _questionId);
    }

    function getSurvey(uint _surveyId) public view returns (string memory title, string[] memory questions) {
        require(_surveyId < surveyCount, "Survey does not exist.");
        Survey storage survey = surveys[_surveyId];
        return (survey.title, survey.questions);
    }

    // This function retrieves responses for a specific question in a survey.
    // Note: In a real-world scenario, consider how to handle response visibility and anonymity.
    function getResponses(uint _surveyId, uint _questionId) public view returns (string[] memory) {
        require(_surveyId < surveyCount, "Survey does not exist.");
        require(_questionId < surveys[_surveyId].questions.length, "Question does not exist.");
        return surveys[_surveyId].responses[_questionId];
    }
}