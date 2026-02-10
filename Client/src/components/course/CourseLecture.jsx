import { HiOutlineVideoCamera } from "react-icons/hi";
import React from "react";

const CourseLecture = ({ lecture }) => {
  return (
    <div className="flex items-center gap-3 py-2 text-sm text-richblack-200">
      <HiOutlineVideoCamera className="text-richblack-300" />
      <p>{lecture.title}</p>
    </div>
  );
};

export default CourseLecture;
