const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    courseDescription: {
      type: String,
      required: true,
      trim: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    whatYouWillLearn: {
      type: String,
      trim: true,
    },

    courseContent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
      },
    ],

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    thumbnail: {
      type: String,
    },

    tag: {
      type: [String],
      required: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      index: true,
    },

    studentsEnrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    instructions: {
      type: [String],
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


module.exports = mongoose.model("Course", courseSchema);
