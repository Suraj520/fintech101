// /src/components/CreateSurvey.js
import React, { useState } from 'react';
import { createSurvey } from '../utils/web3Utils';

function CreateSurvey() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState(['']);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createSurvey(title, questions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Survey Title"
      />
      {/* Implement questions input fields */}
      <button type="submit">Create Survey</button>
    </form>
  );
}

export default CreateSurvey;