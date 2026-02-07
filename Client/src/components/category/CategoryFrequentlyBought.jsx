import CourseCard from "./CourseCard";
import React from "react";

export default function CategoryFrequentlyBought({ courses }) {
  return (
    <section className="mx-auto max-w-maxContent px-4 py-12">
      <h2 className="section_heading">Frequently Bought</h2>

      <div className="grid grid-cols-1 gap-6 py-8 lg:grid-cols-2">
        {courses?.slice(0, 4).map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            Height="h-[400px]"
          />
        ))}
      </div>
    </section>
  );
}
