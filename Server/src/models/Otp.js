const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
  type: String,
  required: true,
  index: true,
}
,

    otpHash: {
      type: String,
      required: true,
      select: false,
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);
