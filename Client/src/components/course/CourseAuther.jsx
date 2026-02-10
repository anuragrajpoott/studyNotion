import React from "react";

const CourseAuthor = ({ instructor }) => {
  if (!instructor) return null;

  const {
    firstName,
    lastName,
    image,
    additionalDetails,
  } = instructor;

  const avatar =
    image ||
    `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Author</h2>

      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={`${firstName} ${lastName}`}
          className="h-14 w-14 rounded-full object-cover"
        />

        <p className="text-lg font-medium">
          {firstName} {lastName}
        </p>
      </div>

      {additionalDetails?.about && (
        <p className="text-richblack-200 leading-relaxed">
          {additionalDetails.about}
        </p>
      )}
    </div>
  );
};

export default CourseAuthor;
