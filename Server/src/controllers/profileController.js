const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const User = require("../models/User");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

/* =========================================================
   UPDATE PROFILE
========================================================= */
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth,
      about,
      contactNumber,
      gender,
    } = req.body;

    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // update user basic info
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    await user.save();

    // update profile
    const profile = await Profile.findById(user.additionalDetails);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
    if (about) profile.about = about;
    if (contactNumber) profile.contactNumber = contactNumber;
    if (gender) profile.gender = gender;

    await profile.save();

    const updatedUserDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   DELETE ACCOUNT
========================================================= */
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // remove user from enrolled courses
    await Course.updateMany(
      { studentsEnrolled: userId },
      { $pull: { studentsEnrolled: userId } }
    );

    // delete course progress
    await CourseProgress.deleteMany({ user: userId });

    // delete profile
    await Profile.findByIdAndDelete(user.additionalDetails);

    // delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted",
      error: error.message,
    });
  }
};

/* =========================================================
   GET LOGGED IN USER DETAILS
========================================================= */
exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   UPDATE DISPLAY PICTURE
========================================================= */
exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const displayPicture = req.files?.displayPicture;

    if (!displayPicture) {
      return res.status(400).json({
        success: false,
        message: "Display picture is required",
      });
    }

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { image: image.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Display picture updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   GET ENROLLED COURSES (STUDENT DASHBOARD)
========================================================= */
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findById(userId)
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: { path: "subSection" },
        },
      })
      .exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    userDetails = userDetails.toObject();

    for (const course of userDetails.courses) {
      let totalDurationInSeconds = 0;
      let totalSubSections = 0;

      course.courseContent.forEach((section) => {
        section.subSection.forEach((sub) => {
          totalDurationInSeconds += sub.timeDuration;
          totalSubSections += 1;
        });
      });

      course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

      const progress = await CourseProgress.findOne({
        course: course._id,
        user: userId,
      });

      const completed = progress?.completedVideos.length || 0;

      course.progressPercentage =
        totalSubSections === 0
          ? 100
          : Math.round((completed / totalSubSections) * 10000) / 100;
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   INSTRUCTOR DASHBOARD
========================================================= */
exports.instructorDashboard = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor: instructorId });

    const courseStats = courses.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalRevenue = totalStudentsEnrolled * course.price;

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalRevenue,
      };
    });

    return res.status(200).json({
      success: true,
      data: courseStats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
