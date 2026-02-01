import React from "react";

export default function VisionMissionSection() {
  return (
    <section>
      <div className="mx-auto w-11/12 max-w-maxContent flex flex-col lg:flex-row justify-between gap-10">
        <div className="my-24 lg:w-[40%] flex flex-col gap-10">
          <h2 className="bg-linear-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent">
            Our Vision
          </h2>
          <p className="text-base font-medium text-richblack-300">
            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
          </p>
        </div>

        <div className="my-24 lg:w-[40%] flex flex-col gap-10">
          <h2 className="bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-4xl font-semibold text-transparent">
            Our Mission
          </h2>
          <p className="text-base font-medium text-richblack-300">
            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
