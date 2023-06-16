import React from "react";

const NextAnecdote = ({ handleClick }) => {
  return (
    <div>
      <button onClick={handleClick}>Next Anecdote</button>
    </div>
  );
};

export default NextAnecdote;
