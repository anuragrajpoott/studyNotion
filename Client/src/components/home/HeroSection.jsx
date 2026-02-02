import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../../components/common/HighlightText";
import Button from "../../components/common/Button";
import Banner from "../../assets/visuals/Images/banner.mp4";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center gap-8 text-white">

      <Link to="/signup">
        <div className="group mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 hover:scale-95 transition">
          <div className="flex items-center gap-2 rounded-full px-10 py-1 group-hover:bg-richblack-900">
            Become an Instructor <FaArrowRight />
          </div>
        </div>
      </Link>

      <h1 className="text-center text-4xl font-semibold">
        Empower Your Future with{" "}
        <HighlightText text="Coding Skills" />
      </h1>

      <p className="w-[90%] text-center text-lg font-bold text-richblack-300">
        Learn at your own pace from anywhere with hands-on projects and expert
        feedback.
      </p>

      <div className="flex gap-7 mt-6">
        <Button to="/signup">Learn More</Button>
        <Button to="/login" variant="secondary">
          Book a Demo
        </Button>
      </div>

      <div className="my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
        <video muted loop autoPlay className="shadow-[20px_20px_rgba(255,255,255)]">
          <source src={Banner} type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
