import CourseCard from "./CourseCard";
import React from "react";

const CourseList = ({ courses }) => {
  if (!courses.length) {
    return <p>No courses found.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-6 flex-1">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
