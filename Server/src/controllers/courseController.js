

const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../config/cloudinary");

/* =========================================================
   CREATE COURSE (INSTRUCTOR ONLY)
========================================================= */
exports.createCourse = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      instructions,
      status = "Draft",
    } = req.body;

    const thumbnail = req.files?.thumbnailImage;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !category ||
      !instructions ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const thumbnailUpload = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const course = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorId,
      whatYouWillLearn,
      price,
      tag: JSON.parse(tag),
      category,
      instructions: JSON.parse(instructions),
      thumbnail: thumbnailUpload.secure_url,
      status,
    });

    return res.status(201).json({
      success: true,
      data: course,
      message: "Course created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};


exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if(!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (req.files?.thumbnailImage) {
      const upload = await uploadImageToCloudinary(
        req.files.thumbnailImage,
        process.env.FOLDER_NAME
      );
      course.thumbnail = upload.secure_url;
    }

    Object.keys(req.body).forEach((key) => {
      if (["tag", "instructions"].includes(key)) {
        course[key] = JSON.parse(req.body[key]);
      } else if (key !== "courseId") {
        course[key] = req.body[key];
      }
    });

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update course",
      error: error.message,
    });
  }
};


exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.params;

    if(!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    const course = await Course.findById(courseId)
      .populate("instructor", "firstName lastName")
      .populate("category");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const sections = await Section.find({ course: courseId }).sort({ order: 1 });

    const sectionData = await Promise.all(
      sections.map(async (section) => {
        const subSections = await SubSection.find({
          section: section._id,
        })
          .sort({ order: 1 })
          .select("-videoUrl");

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





exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    if (!instructorId) {
      return res.status(400).json({ success: false, message: "Instructor ID is required" });
    }

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


exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "Course ID is required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    const sections = await Section.find({ course: courseId });

    for (const section of sections) {
      await SubSection.deleteMany({ section: section._id });
      await Section.findByIdAndDelete(section._id);
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
