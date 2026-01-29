const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dateOfBirth: Date,

    about: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    contactNumber: {
      type: String,
      trim: true,
    },

    profileImage: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Profile", profileSchema);
