import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import CourseFilters from "../components/dashboard/CourseFilter";
import CourseList from "../components/dashboard/CourseList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllCourses } from "../services/operations/courseOperations";
import React from "react";

const Dashboard = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
  const { courses, loading } = useSelector((state) => state.course);

  const [filters, setFilters] = useState({
    category: "",
    freeOnly: false,
    priceRange: [0, 10000],
    sortBy: "newest",
  });

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    if (filters.category) {
      result = result.filter(
        (c) => c.category._id === filters.category
      );
    }

    if (filters.freeOnly) {
      result = result.filter((c) => c.price === 0);
    }

    result = result.filter(
      (c) =>
        c.price >= filters.priceRange[0] &&
        c.price <= filters.priceRange[1]
    );

    if (filters.sortBy === "duration") {
      result.sort((a, b) => b.totalDuration - a.totalDuration);
    }

    return result;
  }, [courses, filters]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 flex gap-8 text-white">
      <CourseFilters filters={filters} setFilters={setFilters} />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default Dashboard;
