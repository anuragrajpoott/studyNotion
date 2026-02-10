import { Link } from "react-router-dom";
import React from "react";

export default function CourseCard({
  course,
  height = "h-[250px]",
}) {
  if (!course) return null;

  const {
    _id,
    thumbnail,
    courseName,
    instructor,
    price,
  } = course;

  return (
    <Link to={`/courses/${_id}`} className="block">
      <div className="rounded-lg">
        {/* Thumbnail */}
        <img
          src={thumbnail}
          alt={courseName}
          className={`${height} w-full rounded-xl object-cover`}
        />

        {/* Details */}
        <div className="flex flex-col gap-2 px-1 py-3">
          <p className="text-xl font-semibold text-richblack-5">
            {courseName}
          </p>

          <p className="text-sm text-richblack-50">
            {instructor?.name}
          </p>

          <p className="text-xl font-semibold text-richblack-5">
            ₹ {price}
          </p>
        </div>
      </div>
    </Link>
  );
}
