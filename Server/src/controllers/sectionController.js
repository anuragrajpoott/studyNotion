const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

/* =========================================================
   CREATE SECTION
========================================================= */
exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section name and courseId are required",
      });
    }

    // ensure course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const section = await Section.create({
      sectionName,
      course: courseId,
    });

    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* =========================================================
   UPDATE SECTION
========================================================= */
exports.updateSection = async (req, res) => {
  try {
    const { sectionId, sectionName } = req.body;

    if (!sectionId || !sectionName) {
      return res.status(400).json({
        success: false,
        message: "sectionId and sectionName are required",
      });
    }

    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* =========================================================
   DELETE SECTION
========================================================= */
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;

    if (!sectionId) {
      return res.status(400).json({
        success: false,
        message: "sectionId is required",
      });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // delete all subsections under this section
    await SubSection.deleteMany({ section: sectionId });

    // delete section
    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
