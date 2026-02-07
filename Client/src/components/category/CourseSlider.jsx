import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import CourseCard from "../category/CourseCard";

import React from "react";

export default function CourseSlider({
  courses = [],
  cardHeight = "h-[250px]",
}) {
  if (!courses.length) {
    return (
      <p className="text-xl text-richblack-5">
        No courses found
      </p>
    );
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={25}
      loop
      modules={[FreeMode, Pagination]}
      breakpoints={{
        1024: { slidesPerView: 3 },
      }}
      className="max-h-120"
    >
      {courses.map((course) => (
        <SwiperSlide key={course?._id}>
          <CourseCard course={course} Height={cardHeight} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
