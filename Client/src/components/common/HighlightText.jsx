import React from "react";

export default function HighlightText({ text, className = "" }) {
  return (
    <span
      className={`bg-linear-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] bg-clip-text text-transparent font-bold ${className}`}
    >
      {text}
    </span>
  );
}
