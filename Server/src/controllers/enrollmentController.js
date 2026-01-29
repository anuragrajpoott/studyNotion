
const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Enrollment = require("../models/Enrollment");


/* =========================================================
   ENROLL IN COURSE (NO PAYMENT)
========================================================= */
exports.enrollInCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // 1️⃣ Check course exists & is published
    const course = await Course.findOne({
      _id: courseId,
      status: "Published",
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or not published",
      });
    }

    // 2️⃣ Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: userId,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(409).json({
        success: false,
        message: "Already enrolled in this course",
      });
    }

    // 3️⃣ Create enrollment
    const enrollment = await Enrollment.create({
      user: userId,
      course: courseId,
    });

    return res.status(201).json({
      success: true,
      message: "Enrolled successfully",
      data: enrollment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to enroll in course",
      error: error.message,
    });
  }
};




exports.getEnrolledCourseContent = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    const course = await Course.findById(courseId)
      .populate("instructor", "firstName lastName")
      .populate("category");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const sections = await Section.find({ course: courseId }).sort({ order: 1 });

    const sectionData = await Promise.all(
      sections.map(async (section) => {
        const subSections = await SubSection.find({ section: section._id }).sort({
          order: 1,
        });
        return { ...section.toObject(), subSections };
      })
    );

    return res.status(200).json({
      success: true,
      data: { course, sections: sectionData },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* =========================================================
   GET MY ENROLLED COURSES
========================================================= */
exports.getMyEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({ user: userId })
      .populate({
        path: "course",
        select: "courseName thumbnail price instructor",
        populate: {
          path: "instructor",
          select: "firstName lastName",
        },
      })
      .sort({ createdAt: -1 });

    const courses = enrollments.map((enrollment) => ({
      enrollmentId: enrollment._id,
      enrolledAt: enrollment.createdAt,
      course: enrollment.course,
    }));

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled courses",
      error: error.message,
    });
  }
};
