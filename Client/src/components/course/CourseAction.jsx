import React from "react";

const CourseAction = ({ loading, onBuy, onAddToCart }) => {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <button
        onClick={onBuy}
        disabled={loading}
        className="yellowButton"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>

      <button
        onClick={onAddToCart}
        disabled={loading}
        className="blackButton"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CourseAction;
