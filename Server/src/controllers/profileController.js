const User = require("../models/User");
const Profile = require("../models/Profile");
const Enrollment = require("../models/Enrollment");
const { uploadImageToCloudinary } = require("../config/cloudinary");

/* =========================================================
   UPDATE PROFILE
========================================================= */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { firstName, lastName, dateOfBirth, about, contactNumber, gender } =
      req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // update basic user info
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    await user.save();

    // update profile
    const profile = await Profile.findById(user.profile);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    if (dateOfBirth) profile.dateOfBirth = dateOfBirth;
    if (about) profile.about = about;
    if (contactNumber) profile.contactNumber = contactNumber;
    if (gender) profile.gender = gender;

    await profile.save();

    const updatedUser = await User.findById(userId).populate("profile");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateDisplayPicture = async (req, res) => {
  try {
    const userId = req.user.id;
    const displayPicture = req.files?.displayPicture;

    if (!displayPicture) {
      return res
        .status(400)
        .json({ success: false, message: "Display picture required" });
    }

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: image.secure_url },
      { new: true }
    ).populate("profile");

    return res.status(200).json({
      success: true,
      message: "Profile image updated",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // delete enrollments
    await Enrollment.deleteMany({ user: userId });

    // delete profile
    if (user.profile) {
      await Profile.findByIdAndDelete(user.profile);
    }

    // delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("profile");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
