import React from "react";

const Content = ({ course }) => {
  return (
    <div>
      <p>
        {course.title} {course.exercises}
      </p>
    </div>
  );
};

export default Content;
