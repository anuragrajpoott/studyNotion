const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    accountType: {
      type: String,
      enum: ["Admin", "Student", "Instructor"],
      default: "Student",
      index: true,
    },

    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      default: null,
    },

  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
