import { BsFillCaretRightFill } from "react-icons/bs";
import { FaShareSquare } from "react-icons/fa";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { MdAllInclusive } from "react-icons/md";
import { MdPhoneAndroid } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";



const courseIncludes = [
  {
    icon: <FaRegClock />,
    text: "8 hours on-demand video",
  },
  {
    icon: <MdAllInclusive />,
    text: "Full Lifetime access",
  },
  {
    icon: <MdPhoneAndroid />,
    text: "Access on Mobile and TV",
  },
  {
    icon: <FaRegFileAlt />,
    text: "Certificate of Completion",
  },
];


const CoursePriceCard = ({
  thumbnail,
  price,
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

     


      {courseIncludes.length > 0 && (
  <div>
    <p className="mb-4 text-lg font-semibold">
      This course includes:
    </p>

    <div className="flex flex-col gap-4 text-cyan-400">
      {courseIncludes.map((item, i) => (
        <div key={i} className="flex items-center gap-3 text-sm">
          <span className="text-xl">{item.icon}</span>
          <span>{item.text}</span>
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
