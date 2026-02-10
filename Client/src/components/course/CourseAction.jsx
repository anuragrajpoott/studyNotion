import React from "react";

const CourseAction = ({
  isEnrolled,
  loading,
  onBuy,
  onAddToCart,
  onContinue,
}) => {
  return (
    <div className="mt-4 flex flex-col gap-3">
      {isEnrolled ? (
        <button onClick={onContinue} className="yellowButton">
          Go To Course
        </button>
      ) : (
        <>
          <button
            onClick={onBuy}
            disabled={loading}
            className="yellowButton"
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>

          <button onClick={onAddToCart} className="blackButton">
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CourseAction;
