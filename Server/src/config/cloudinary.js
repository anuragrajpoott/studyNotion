const cloudinary = require("cloudinary").v2;

/* =========================================================
   CLOUDINARY CONFIG
========================================================= */
exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
    });

    console.log("✅ Cloudinary connected");
  } catch (error) {
    console.error("❌ Cloudinary connection failed:", error.message);
    throw error;
  }
};

/* =========================================================
   UPLOAD IMAGE / VIDEO TO CLOUDINARY
========================================================= */
exports.uploadImageToCloudinary = async (
  file,
  folder,
  height,
  quality
) => {
  try {
    if (!file || !file.tempFilePath) {
      throw new Error("File not found for upload");
    }

    const options = {
      folder,
      resource_type: "auto", // image / video
    };

    if (height) options.height = height;
    if (quality) options.quality = quality;

    const result = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    return result;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);
    throw error;
  }
};
