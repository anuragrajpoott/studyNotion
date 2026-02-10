import { useSelector } from "react-redux";
import CourseHero from "../components/course/CourseHero";
import CourseSidebar from "../components/course/CourseSidebar";
import CourseCurriculum from "../components/course/CourseCurriculum";
import CourseAuthor from "../components/course/CourseAuther";
import Error from "../pages/Error";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../services/operations/courseOperations";
import { setCourseDetails } from "../store/slices/courseSlice";
import mockCategoryPageData from "../assets/data/mockCategoryPageData";

import React from "react";

const Course = () => {

     const { courseId } = useParams();

    
     


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseDetails(courseId));
  }, [courseId, dispatch]);



  const { courseDetails, loading, error } = useSelector(
    (state) => state.course
  );

  
  if (loading){
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner" />
      </div>
    );
  };
  if (error || !courseDetails) {
    dispatch(
        setCourseDetails(
          mockCategoryPageData.selectedCategoryCourses[0]
        )
      );
  };


  return (
   <main className="bg-richblack-900 text-white">
      <div className="w-11/12 max-w-maxContent mx-auto py-10">  
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          <CourseHero course={courseDetails} />
          <CourseCurriculum course={courseDetails} />
          <CourseAuthor instructor={courseDetails?.instructor} />
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CourseSidebar course={courseDetails} />
        </div>
      </div>
        </div>
    </main>
  );
};

export default Course;
