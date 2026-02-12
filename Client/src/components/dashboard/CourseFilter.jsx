import React from "react";

const CourseFilters = ({ filters, setFilters }) => {
  return (
    <div className="w-64 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      <label>
        <input
          type="checkbox"
          checked={filters.freeOnly}
          onChange={(e) =>
            setFilters({ ...filters, freeOnly: e.target.checked })
          }
        />
        Free Courses
      </label>

      <select
        value={filters.sortBy}
        onChange={(e) =>
          setFilters({ ...filters, sortBy: e.target.value })
        }
      >
        <option value="newest">Newest</option>
        <option value="duration">Duration</option>
      </select>
    </div>
  );
};

export default CourseFilters;
