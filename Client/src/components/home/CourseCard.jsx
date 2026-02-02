import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";
import React from "react";

export default function CourseCard({
  cardData,
  currentCard,
  setCurrentCard,
}) {
  const isActive = currentCard === cardData?.heading;

  return (
    <button
      type="button"
      onClick={() => setCurrentCard(cardData?.heading)}
      className={`
        w-90 lg:w-[30%] h-75 text-left cursor-pointer
        ${isActive
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : "bg-richblack-800"}
        text-richblack-25 box-border
      `}
    >
      {/* ================= TOP ================= */}
      <div className="h-[80%] p-6 flex flex-col gap-3 border-b-2 border-dashed border-richblack-400">
        <h3
          className={`text-[20px] font-semibold ${
            isActive && "text-richblack-800"
          }`}
        >
          {cardData?.heading}
        </h3>

        <p className="text-richblack-400">
          {cardData?.description}
        </p>
      </div>

      {/* ================= BOTTOM ================= */}
      <div
        className={`flex justify-between px-6 py-3 font-medium ${
          isActive ? "text-blue-300" : "text-richblack-300"
        }`}
      >
        <div className="flex items-center gap-2 text-[16px]">
          <HiUsers />
          <span>{cardData?.level}</span>
        </div>

        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <span>{cardData?.lessionNumber} Lessons</span>
        </div>
      </div>
    </button>
  );
}
