const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    dateOfBirth: {
      type: Date, // ✅ correct type
    },

    about: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    contactNumber: {
      type: String, // ✅ phone numbers should be strings
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
