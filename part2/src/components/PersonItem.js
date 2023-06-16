import React from "react";

const PersonItem = ({ person, handleDele }) => {
  return (
    <li className="note">
      {person.name} {person.number}
      <button onClick={() => handleDele(person)}>Delete</button>
    </li>
  );
};

export default PersonItem;
