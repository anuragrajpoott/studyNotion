import FoundingStory from "../../assets/visuals/Images/foundingstory.png";
import React from "react";

export default function FoundingStorySection() {
  return (
    <section>
      <div className="mx-auto w-11/12 max-w-maxContent flex flex-col lg:flex-row items-center gap-10">
        <div className="my-24 lg:w-1/2 flex flex-col gap-10">
          <h2 className="bg-linear-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-4xl font-semibold text-transparent">
            Our Founding Story
          </h2>

          <p className="text-base font-medium text-richblack-300">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education...
          </p>

          <p className="text-base font-medium text-richblack-300">
            We envisioned a platform that could bridge these gaps and empower
            individuals from all walks of life to unlock their full potential.
          </p>
        </div>

        <img
          src={FoundingStory}
          alt=""
          className="shadow-[0_0_20px_0] shadow-[#FC6767]"
        />
      </div>
    </section>
  );
}
