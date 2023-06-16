import React from "react";

const DisplayStats = ({ good, neutral, bad, total }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>Total: {total}</p>
    </div>
  );
};

export default DisplayStats;
