import { Link } from "react-router-dom";
import React from "react";
const Btn = ({ children, active = false, linkto }) => {
  return (
    <Link to={linkto}>
      <button
        className={`text-center text-[13px] sm:text-[16px] px-4 py-2 rounded-md font-bold
        shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
        ${
          active
            ? "bg-yellow-50 text-black"
            : "bg-richblack-800 text-richblack-100"
        }
        hover:shadow-none hover:scale-95 transition-all duration-200`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Btn;
