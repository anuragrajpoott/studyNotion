import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Error from "./pages/Error";
import VerifyEmail from "./pages/VerifyEmail";

// Dashboard Pages
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";

// Guards
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import StudentRoute from "./components/core/Auth/StudentRoute";
import InstructorRoute from "./components/core/Auth/InstructorRoute";

function App() {
  return (
    <div className="min-h-screen bg-richblack-900 font-inter">
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />

        {/* ================= AUTH ROUTES ================= */}
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
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        {/* ================= DASHBOARD (FLAT ROUTES) ================= */}

        <Route
          path="/dashboard/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        {/* STUDENT */}
        <Route
          path="/dashboard/cart"
          element={
            <StudentRoute>
              <Cart />
            </StudentRoute>
          }
        />
        <Route
          path="/dashboard/enrolled-courses"
          element={
            <StudentRoute>
              <EnrolledCourses />
            </StudentRoute>
          }
        />

        {/* INSTRUCTOR */}
        <Route
          path="/dashboard/add-course"
          element={
            <InstructorRoute>
              <AddCourse />
            </InstructorRoute>
          }
        />
        <Route
          path="/dashboard/my-courses"
          element={
            <InstructorRoute>
              <MyCourses />
            </InstructorRoute>
          }
        />
        <Route
          path="/dashboard/edit-course/:courseId"
          element={
            <InstructorRoute>
              <EditCourse />
            </InstructorRoute>
          }
        />

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
