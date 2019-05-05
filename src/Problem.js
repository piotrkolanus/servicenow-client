import React from 'react';
import './Problem.css';

const Problem = ({ number, shortDescription, notes, editForm }) => {
  return (
    <div className="problem__wrapper">
      <li>
        Problem number: {number}
        Short description:
        {shortDescription} Work notes: {notes}
      </li>
      <button onClick={editForm}>Edit</button>
    </div>
  );
};

export default Problem;
