import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import Navbar from "./components/Nav/Nav";
import Footer from "./components/footer/Footer";    

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Category from "./pages/Category";
import Error from "./pages/Error";

// Dashboard Pages
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Cart from "./pages/Cart";
import createCourse from "./pages/CreateCourse";
import myCourses from "./pages/MyCourses";




// Guards
import OpenRoute from "./components/core/OpenRoute";
import PrivateRoute from "./components/core/PrivateRoute";
import StudentRoute from "./components/core/StudentRoute";
import InstructorRoute from "./components/core/InstructorRoute";
import { Dashboard } from "./pages/Dashboard";
import { getProfile } from "./services/operations/profileOperations";

function App() {

  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch(); 
   
  useEffect(() => {
    
      // dispatch(getProfile());
    
    
  }, []); 
  
  return (
    <div className="min-h-screen bg-richblack-900 font-inter">
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/category/:categoryId" element={<Category />} />

        <Route
          path="/"
          element={
            <OpenRoute>
              <Home />
            </OpenRoute>
          }
        />

        <Route
          path="/about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <OpenRoute>
              <Contact />
            </OpenRoute>
          }
        />

        {/* =================Auth ROUTES ================= */}
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />


        {/* ================= DASHBOARD (FLAT ROUTES) ================= */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/cart"
          element={
            <StudentRoute>
              <Cart />
            </StudentRoute>
          }
        />


        {/* INSTRUCTOR */}
        <Route
          path="/create-course"
          element={
            <InstructorRoute>
              <createCourse />
            </InstructorRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <InstructorRoute>
              <myCourses />
            </InstructorRoute>
          }
        />


        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
