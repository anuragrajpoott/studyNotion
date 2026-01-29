const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    timeDuration: {
      type: Number, // seconds
      required: true,
      min: 0,
    },

    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
      index: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// compound index for ordered reads
subSectionSchema.index({ section: 1, order: 1 });

module.exports = mongoose.model("SubSection", subSectionSchema);
