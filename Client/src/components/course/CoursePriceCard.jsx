import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import React from "react";

const CoursePriceCard = ({
  thumbnail,
  price,
  instructions = [],
  onShare,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-richblack-800 p-4 border border-richblack-700">
      <img
        src={thumbnail}
        alt="Course thumbnail"
        className="aspect-video w-full rounded-lg object-cover"
      />

      <p className="text-3xl font-semibold text-richblack-5">
        ₹ {price}
      </p>

      <p className="text-center text-sm text-richblack-300">
        30-Day Money-Back Guarantee
      </p>

      {instructions.length > 0 && (
        <div>
          <p className="mb-2 text-lg font-semibold">
            This course includes:
          </p>

          <div className="flex flex-col gap-2 text-sm text-caribbeangreen-100">
            {instructions.map((item, i) => (
              <div key={i} className="flex gap-2">
                <BsFillCaretRightFill />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onShare}
        className="mx-auto flex items-center gap-2 text-yellow-100"
      >
        <FaShareSquare size={14} />
        Share
      </button>
    </div>
  );
};

export default CoursePriceCard;
