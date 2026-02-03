import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import React from "react";

import Button from "../../components/common/Button";

export default function CodeBlocks({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div
      className={`flex ${position} my-20 justify-between flex-col gap-10 lg:gap-10 text-white`}
    >
      {/* ================= LEFT SECTION ================= */}
      <div className="w-full lg:w-[50%] flex flex-col gap-8">
        {heading}

        <p className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </p>

        <div className="flex gap-7 mt-7">
          <Button to={ctabtn1.link}>
            <span className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </span>
          </Button>

          <Button to={ctabtn2.link} variant="secondary">
            {ctabtn2.btnText}
          </Button>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="relative h-fit code-border flex py-3 text-[10px] sm:text-sm leading-4.5 sm:leading-6 w-full lg:w-117.5">
        {backgroundGradient}

        {/* Line Numbers */}
        <div className="w-[10%] text-center select-none text-richblack-400 font-bold font-inter">
          {Array.from({ length: 11 }).map((_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Code Animation */}
        <div
          className={`w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColor} pr-1`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor
            repeat={Infinity}
            style={{ whiteSpace: "pre-line", display: "block" }}
            omitDeletionAnimation
          />
        </div>
      </div>
    </div>
  );
}
