const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../config/cloudinary");

/* =========================================================
   CREATE SUBSECTION
========================================================= */
exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files?.video;

    if (!sectionId || !title || !video) {
      return res.status(400).json({
        success: false,
        message: "sectionId, title, and video are required",
      });
    }

    // ensure section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const subSection = await SubSection.create({
      title,
      description,
      videoUrl: uploadDetails.secure_url,
      timeDuration: uploadDetails.duration,
      section: sectionId,
    });

    return res.status(201).json({
      success: true,
      message: "SubSection created successfully",
      data: subSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* =========================================================
   UPDATE SUBSECTION
========================================================= */
exports.updateSubSection = async (req, res) => {
  try {
    const { subSectionId, title, description } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId is required",
      });
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if (title !== undefined) subSection.title = title;
    if (description !== undefined) subSection.description = description;

    if (req.files?.video) {
      const uploadDetails = await uploadImageToCloudinary(
        req.files.video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = uploadDetails.duration;
    }

    await subSection.save();

    return res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      data: subSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



/* =========================================================
   DELETE SUBSECTION
========================================================= */
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;

    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId is required",
      });
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    await SubSection.findByIdAndDelete(subSectionId);

    return res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
