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
      select: false, // 🔐 important
    },

    accountType: {
      type: String,
      enum: ["Admin", "Student", "Instructor"],
      default: "Student",
    },

    additionalDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    profileImage: {
      type: String,
    },

    token: {
      type: String,
    },

    otp: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Otp",
},

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
