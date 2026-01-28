const Category = require("../models/Category");
const Course = require("../models/Course");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/* =========================================================
   CREATE CATEGORY
========================================================= */
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const category = await Category.create({
      name,
      description,
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   GET ALL CATEGORIES
========================================================= */
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ name: 1 });

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   CATEGORY PAGE DETAILS
========================================================= */
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }

    /* -------------------------
       1. Selected Category
    -------------------------- */
    const selectedCategory = await Category.findById(categoryId);

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    /* -------------------------
       2. Courses in this Category
    -------------------------- */
    const selectedCategoryCourses = await Course.find({
      category: categoryId,
      status: "Published",
    })
      .populate("instructor")
      .populate("ratingAndReviews");

    if (selectedCategoryCourses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this category",
      });
    }

    /* -------------------------
       3. Courses from a Different Category
    -------------------------- */
    const otherCategories = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategoryCourses = [];
    let differentCategory = null;

    if (otherCategories.length > 0) {
      differentCategory =
        otherCategories[getRandomInt(otherCategories.length)];

      differentCategoryCourses = await Course.find({
        category: differentCategory._id,
        status: "Published",
      }).populate("instructor");
    }

    /* -------------------------
       4. Top Selling Courses
    -------------------------- */
    const mostSellingCourses = await Course.find({
      status: "Published",
    })
      .sort({ sold: -1 })
      .limit(10)
      .populate("instructor");

    /* -------------------------
       RESPONSE
    -------------------------- */
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        selectedCategoryCourses,
        differentCategory,
        differentCategoryCourses,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
