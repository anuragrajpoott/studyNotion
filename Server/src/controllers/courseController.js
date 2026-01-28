const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const CourseProgress = require("../models/CourseProgress");

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

/* =========================================================
   CREATE COURSE
========================================================= */
exports.createCourse = async (req, res) => {
  try {
    const userId = req.user.id;

    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag: _tag,
      category,
      status = "Draft",
      instructions: _instructions,
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    const tag = JSON.parse(_tag || "[]");
    const instructions = JSON.parse(_instructions || "[]");

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag.length ||
      !thumbnail ||
      !category ||
      !instructions.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const instructor = await User.findOne({
      _id: userId,
      accountType: "Instructor",
    });

    if (!instructor) {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructor._id,
      whatYouWillLearn,
      price,
      tag,
      category,
      thumbnail: thumbnailImage.secure_url,
      status,
      instructions,
    });

    await User.findByIdAndUpdate(instructor._id, {
      $push: { courses: newCourse._id },
    });

    return res.status(201).json({
      success: true,
      data: newCourse,
      message: "Course created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

/* =========================================================
   EDIT COURSE
========================================================= */
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (req.files?.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    for (const key in updates) {
      if (key === "tag" || key === "instructions") {
        course[key] = JSON.parse(updates[key]);
      } else if (key !== "courseId") {
        course[key] = updates[key];
      }
    }

    await course.save();

    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};

/* =========================================================
   GET ALL COURSES
========================================================= */
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ status: "Published" })
      .select("courseName price thumbnail instructor ratingAndReviews studentsEnrolled")
      .populate("instructor");

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot fetch courses",
    });
  }
};

/* =========================================================
   GET COURSE DETAILS (PUBLIC)
========================================================= */
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    let totalSeconds = 0;
    courseDetails.courseContent.forEach((section) => {
      section.subSection.forEach((sub) => {
        totalSeconds += sub.timeDuration;
      });
    });

    const totalDuration = convertSecondsToDuration(totalSeconds);

    return res.status(200).json({
      success: true,
      data: { courseDetails, totalDuration },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   GET FULL COURSE DETAILS (ENROLLED USER)
========================================================= */
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const progress = await CourseProgress.findOne({
      course: courseId,
      user: userId,
    });

    let totalSeconds = 0;
    courseDetails.courseContent.forEach((section) => {
      section.subSection.forEach((sub) => {
        totalSeconds += sub.timeDuration;
      });
    });

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration: convertSecondsToDuration(totalSeconds),
        completedVideos: progress?.completedVideos || [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   GET INSTRUCTOR COURSES
========================================================= */
exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor: instructorId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   DELETE COURSE
========================================================= */
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // remove course from users
    await User.updateMany(
      { courses: courseId },
      { $pull: { courses: courseId } }
    );

    // delete sections & subsections
    for (const sectionId of course.courseContent) {
      const section = await Section.findById(sectionId);
      if (section) {
        await SubSection.deleteMany({ _id: { $in: section.subSection } });
        await Section.findByIdAndDelete(sectionId);
      }
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
