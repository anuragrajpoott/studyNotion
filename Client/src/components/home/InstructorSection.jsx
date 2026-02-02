import { FaArrowRight } from "react-icons/fa";
import React from "react";
import Instructor from "../../assets/visuals/Images/instructor.png";
import Button from "../../components/common/Button";
import HighlightText from "../../components/common/HighlightText";

export default function InstructorSection() {
  return (
    <section className="mx-auto my-20 w-11/12 max-w-maxContent bg-richblack-900 text-white">
      <div className="flex flex-col lg:flex-row gap-20 items-center">
        
        {/* Image */}
        <div className="lg:w-[50%]">
          <img
            src={Instructor}
            alt="Instructor teaching students"
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>

        {/* Content */}
        <div className="lg:w-[50%] flex flex-col gap-10">
          <h2 className="lg:w-[50%] text-4xl font-semibold">
            Become an <HighlightText text="Instructor" />
          </h2>

          <p className="w-[90%] text-[16px] font-medium text-justify text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <Button to="/signup" className="w-fit">
            <span className="flex items-center gap-3">
              Start Teaching Today
              <FaArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
