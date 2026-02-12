const express = require("express");
const router = express.Router();

const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const { auth, isStudent } = require("../middleware/auth");

// student only
router.get("/", auth, isStudent, getCart);
router.post("/add/:courseId", auth, isStudent, addToCart);
router.post("/remove", auth, isStudent, removeFromCart);
router.post("/clear", auth, isStudent, clearCart);

module.exports = router;
