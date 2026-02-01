import React from "react";

const stats = [
  { count: "5K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];

export default function StatsSection() {
  return (
    <section className="bg-richblack-700">
      <div className="mx-auto w-11/12 max-w-maxContent text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {stats.map((item, index) => (
            <div key={index} className="py-10">
              <h3 className="text-3xl font-bold text-richblack-5">
                {item.count}
              </h3>
              <p className="text-base font-semibold text-richblack-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
