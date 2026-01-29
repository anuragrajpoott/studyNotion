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

    whatYouWillLearn: String,

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    thumbnail: String,

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

    instructions: [String],

    status: {
      type: String,
      enum: ["Draft", "Published"],
      default: "Draft",
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Course", courseSchema);
