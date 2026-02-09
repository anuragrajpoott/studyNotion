import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import CourseCard from "../category/CourseCard";

import React from "react";

export default function CourseSlider({ Courses}) {

  console.log("Courses in CourseSlider:", Courses);


  if (Courses.length === 0  ) {
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
      {Courses.map((course) => (
        <SwiperSlide key={course?._id}>
          <CourseCard course={course} Height="h-[205px]" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
