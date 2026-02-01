import React from "react";

export default function ContactItem({ icon: Icon, heading, description, details }) {
  return (
    <div className="flex flex-col gap-1 p-3 text-sm text-richblack-200">
      <div className="flex items-center gap-3">
        <Icon size={24} />
        <h2 className="text-lg font-semibold text-richblack-5">
          {heading}
        </h2>
      </div>
      <p className="font-medium">{description}</p>
      <p className="font-semibold">{details}</p>
    </div>
  );
}
