import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

import CoursePriceCard from "./CoursePriceCard";
import CourseAction from "./CourseAction";
import ConfirmationModal from "../common/Modal";

import { checkoutCart } from "../../services/operations/enrollmentOperations";
import { addToCart } from "../../services/operations/cartOperations";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { addItem } from "../../store/slices/cartSlice";

const CourseSidebar = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { user } = useSelector((state) => state.auth);
  const { enrollmentLoading } = useSelector((state) => state.enrollment);

  const [confirmationModal, setConfirmationModal] = useState(null);

  // -------------------------------
  // Common Login Check
  // -------------------------------
  const requireAuth = (message) => {
    if (!user) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: message,
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return false;
    }

    if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot purchase courses.");
      return false;
    }

    return true;
  };

  // -------------------------------
  // Buy Now
  // -------------------------------
  const handleBuy = () => {
    if (!requireAuth("Please login to purchase this course.")) return;

    dispatch(checkoutCart(navigate, courseId));
  };

  // -------------------------------
  // Add to Cart
  // -------------------------------
  const handleAddToCart = () => {
    if (!requireAuth("Please login to add this course to cart.")) return;

    dispatch(addToCart(courseId));
    dispatch(addItem(course))
    toast.success("Added to cart");
  };

  // -------------------------------
  // Share Course
  // -------------------------------
  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  return (
    <>
      <div className="sticky top-24">
        <CoursePriceCard
          thumbnail={course?.thumbnail}
          price={course?.price}
          instructions={course?.instructions}
          onShare={handleShare}
        />

        <CourseAction
          loading={enrollmentLoading}
          onBuy={handleBuy}
          onAddToCart={handleAddToCart}
        />
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
};

export default CourseSidebar;
