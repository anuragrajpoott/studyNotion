import React from "react";

const CourseHero = ({ course }) => {
  const {
    courseName,
    courseDescription,
    studentsEnrolled,
    instructor,
    createdAt,
  } = course;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold">{courseName}</h1>
      <p className="text-richblack-200">{courseDescription}</p>

      <div className="flex items-center gap-2">
        <span>{studentsEnrolled?.length} students</span>
      </div>

      <p>
        Created by {instructor.firstName} {instructor.lastName}
      </p>
      <p className="text-sm text-richblack-300">
        Created at {new Date(createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </p>
    </div>
  );
};

export default CourseHero;
