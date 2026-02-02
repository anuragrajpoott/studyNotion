import { useState } from "react";
import React from "react";

import { HomePageExplore } from "../../assets/data/homepage-explore";
import CourseCard from "./CourseCard";
import HighlightText from "../../components/common/HighlightText";

const TABS = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(TABS[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  function handleTabChange(tab) {
    setCurrentTab(tab);

    const selectedCategory = HomePageExplore.find(
      (item) => item.tag === tab
    );

    if (!selectedCategory) return;

    setCourses(selectedCategory.courses);
    setCurrentCard(selectedCategory.courses[0].heading);
  }

  return (
    <section className="mx-auto w-11/12 max-w-maxContent">
      {/* ================= HEADER ================= */}
      <div className="text-center my-10">
        <h2 className="text-4xl font-semibold">
          Unlock the <HighlightText text="Power of Code" />
        </h2>

        <p className="mt-1 text-lg font-semibold text-richblack-300">
          Learn to Build Anything You Can Imagine
        </p>
      </div>

      {/* ================= TABS ================= */}
      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-richblack-800 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {TABS.map((tab) => {
          const isActive = currentTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`
                px-7 py-1.75 rounded-full text-[16px] transition-all duration-200
                ${isActive
                  ? "bg-richblack-900 text-richblack-5"
                  : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"}
              `}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="hidden lg:block lg:h-96" />

      {/* ================= CARDS ================= */}
      <div className="lg:absolute flex flex-wrap justify-center lg:justify-between gap-10 lg:gap-0 w-11/12 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-80 text-black mb-7 lg:mb-0 px-3 lg:px-0">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            cardData={course}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </section>
  );
}
