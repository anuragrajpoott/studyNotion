
import React from "react";
import HighlightText from "../common/HighlightText";

export default function QuoteSection() {
  return (
    <section className="border-b border-richblack-700">
      <div className="mx-auto w-11/12 max-w-maxContent py-24 text-richblack-500">
        <div className="mx-auto max-w-4xl py-5 pb-20 text-center text-xl md:text-4xl font-semibold text-white">
              We are passionate about revolutionizing the way we learn. Our innovative
              platform <HighlightText text="combines technology" />, expertise, and
              community to create an{" "}
              <span className="bg-linear-to-b from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent font-bold">
                unparalleled educational experience
              </span>.
            </div>
      </div>
    </section>
  );
}
