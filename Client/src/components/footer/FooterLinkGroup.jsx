import { Link } from "react-router-dom";
import React from "react";

export default function FooterLinkGroup({ title, links }) {
  return (
    <div className="w-[48%] lg:w-[30%] mb-7">
      <h1 className="text-richblack-50 font-semibold text-[16px]">
        {title}
      </h1>

      <div className="flex flex-col gap-2 mt-2">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.to}
            className="text-[14px] hover:text-richblack-50 transition-all duration-200"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
