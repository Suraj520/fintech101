// /src/components/App.js
import React, { useEffect } from 'react';
import { initWeb3 } from '../utils/web3Utils';

function App() {
  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <div className="App">
      {/* Your components like <CreateSurvey />, <SurveyList />, etc. */}
    </div>
  );
}

export default App;