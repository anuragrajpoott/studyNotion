import React from "react";

const CurriculumHeader = ({
  sections,
  lectures,
  duration,
  onCollapseAll,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-semibold">Course Content</h2>

      <div className="flex flex-wrap justify-between gap-2 text-sm text-richblack-300">
        <div className="flex gap-3">
          <span>{sections} sections</span>
          <span>{lectures} lectures</span>
          <span>{duration} total length</span>
        </div>

        <button
          onClick={onCollapseAll}
          className="text-yellow-25 hover:underline"
        >
          Collapse all sections
        </button>
      </div>
    </div>
  );
};

export default CurriculumHeader;
