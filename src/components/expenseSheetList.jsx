// components/ExpenseSheetList.jsx
import React from 'react';

const ExpenseSheetList = ({ sheets, onDelete }) => {
  return (
    <ul>
      {sheets.map(sheet => (
        <li key={sheet.id}>
          <h3>{sheet.title}</h3>
          <p>{sheet.description}</p>
          <p>Budget: ${sheet.budget}</p>
          {/* Render other details as needed */}
          <button onClick={() => onDelete(sheet.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ExpenseSheetList;
