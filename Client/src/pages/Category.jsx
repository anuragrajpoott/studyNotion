import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

import { getCategoryPageDetails } from "../services/operations/categoryOperations";

import CategoryHero from "../components/category/CategoryHero";
import CategoryCoursesSection from "../components/category/CategoryCourseSection";
import CategoryTopCourses from "../components/category/CategoryTopCourses";
import CategoryFrequentlyBought from "../components/category/CategoryFrequentlyBought";

export default function Category() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const { loading, categoryCourses } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getCategoryPageDetails(categoryId));
  }, [dispatch, categoryId]);

  if (loading || !categoryCourses) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <main>
      <CategoryHero category={categoryCourses.selectedCategory} />

      <CategoryCoursesSection
        courses={categoryCourses.selectedCategoryCourses}
      />

      <CategoryTopCourses
        categoryName={categoryCourses.differentCategory?.name}
        courses={categoryCourses.differentCategoryCourses}
      />

      <CategoryFrequentlyBought
        courses={categoryCourses.mostSellingCourses}
      />
    </main>
  );
}
