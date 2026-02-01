import React from "react";

import HighlightText from "../../components/common/HighlightText";
import BannerImage1 from "../../assets/visuals/Images/aboutus1.webp";
import BannerImage2 from "../../assets/visuals/Images/aboutus2.webp";
import BannerImage3 from "../../assets/visuals/Images/aboutus3.webp";

export default function AboutHeroSection() {
  return (
    <section className="bg-richblack-700">
      <div className="relative mx-auto w-11/12 max-w-maxContent text-center text-white">
        <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
          Driving Innovation in Online Education for a{" "}
          <HighlightText text="Brighter Future" />
          <p className="mx-auto mt-3 text-base font-medium text-richblack-300 lg:w-[95%]">
            Studynotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </header>

        <div className="sm:h-17.5 lg:h-37.5" />

        <div className="absolute bottom-0 left-1/2 grid w-full -translate-x-1/2 translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
          <img src={BannerImage1} alt="" />
          <img src={BannerImage2} alt="" />
          <img src={BannerImage3} alt="" />
        </div>
      </div>
    </section>
  );
}
