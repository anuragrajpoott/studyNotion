import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { toast } from "react-hot-toast";

import CoursePriceCard from "./CoursePriceCard";
import CourseAction from "./CourseAction";
import ConfirmationModal from "../common/Modal";

import { addItem } from "../../store/slices/cartSlice";
import { checkoutCart } from "../../services/operations/enrollmentOperations";
import { ACCOUNT_TYPE } from "../../utils/constants";

import React from "react";
import { addToCart } from "../../services/operations/cartOperations";

const CourseSidebar = ({ course }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {courseId} = useParams();
  

  const { user } = useSelector((state) => state.auth);

  const { enrollmentLoading } = useSelector((state) => state.enrollment);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const isEnrolled = course?.studentsEnrolled?.includes(user?._id);

const handleBuy = () => {
  if (!user) {
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase this course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
    return;
  }

  if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
    toast.error("Instructors cannot purchase courses.");
    return;
  }

  dispatch(checkoutCart(navigate, courseId));
};


  const handleaddItem = () => {
    if (!user) {
      setConfirmationModal({
        text1: "You are not logged in!",
        text2: "Please login to add this course to cart.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
      return;
    }

    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot buy courses.");
      return;
    }

    // dispatch(addToCart(courseId))

    dispatch(addItem(course));
    toast.success("Added to cart");
  };

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
          isEnrolled={isEnrolled}
          loading={enrollmentLoading}
          onBuy={handleBuy}
          onaddItem={handleaddItem}
          onContinue={() =>
            navigate("/dashboard/enrolled-courses")
          }
        />
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  );
};

export default CourseSidebar;
