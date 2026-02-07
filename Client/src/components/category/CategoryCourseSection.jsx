import { useState } from "react";
import CourseSlider from "../category/CourseSlider";
import React from "react";

export default function CategoryCoursesSection({ courses }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="mx-auto max-w-maxContent px-4 py-12">
      <h2 className="section_heading">
        Courses to get you started
      </h2>

      <div className="my-4 flex border-b border-richblack-600 text-sm">
        {["Most Popular", "New"].map((label, i) => {
          const index = i + 1;
          return (
            <button
              key={label}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 ${
                activeTab === index
                  ? "border-b border-yellow-25 text-yellow-25"
                  : "text-richblack-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <CourseSlider Courses={courses} />
    </section>
  );
}
