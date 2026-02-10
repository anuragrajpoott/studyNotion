import { AiOutlineDown } from "react-icons/ai";
import CourseLecture from "./CourseLecture";
import React from "react";

const CourseSection = ({ section, isOpen, onToggle }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-richblack-600 bg-richblack-700">
      {/* Header */}
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <div className="flex items-center gap-2">
          <AiOutlineDown
            className={`transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
          <p className="font-medium">{section.sectionName}</p>
        </div>

        <span className="text-sm text-yellow-25">
          {section.subSection.length} lecture(s)
        </span>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="flex flex-col gap-2 border-t border-richblack-600 bg-richblack-900 px-6 py-4">
          {section.subSection.map((lecture) => (
            <CourseLecture key={lecture._id} lecture={lecture} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseSection;
