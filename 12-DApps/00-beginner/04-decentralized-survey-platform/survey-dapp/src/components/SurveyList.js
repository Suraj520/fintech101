// /src/components/SurveyList.js
import React, { useEffect, useState } from 'react';
import { getSurvey } from '../utils/web3Utils';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Fetch surveys and set state
  }, []);

  return (
    <div>
      {surveys.map((survey, index) => (
        <div key={index}>
          {/* Display survey details */}
        </div>
      ))}
    </div>
  );
}

export default SurveyList;