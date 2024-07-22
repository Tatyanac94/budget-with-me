// components/ExpenseSheetForm.jsx
"use client"
import React, { useState } from 'react';

const ExpenseSheetForm = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSheetData = {
      title,
      description,
      budget,
      // Add more fields as needed
    };
    onCreate(newSheetData);
    setTitle('');
    setDescription('');
    setBudget(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input type="number" placeholder="Budget" value={budget} onChange={(e) => setBudget(parseFloat(e.target.value))} />
      {/* Add more input fields for income, categories, goals, etc. */}
      <button type="submit">Create Expense Sheet</button>
    </form>
  );
};

export default ExpenseSheetForm;
