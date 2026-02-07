import CourseSlider from "../category/CourseSlider";

import React from "react";

export default function CategoryTopCourses({ categoryName, courses }) {
  return (
    <section className="mx-auto max-w-maxContent px-4 py-12">
      <h2 className="section_heading">
        Top courses in {categoryName}
      </h2>

      <div className="py-8">
        <CourseSlider Courses={courses} />
      </div>
    </section>
  );
}
