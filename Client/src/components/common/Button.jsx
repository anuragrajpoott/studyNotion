import { Link } from "react-router-dom";
import React from "react";

export default function Button({
  children,
  to,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  outline = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200";

  const variants = {
    primary: "bg-yellow-50 text-black",
    secondary: "bg-richblack-800 text-richblack-100",
    danger: "bg-pink-600 text-white",
  };

  const style = outline
    ? "bg-transparent border border-yellow-50 text-yellow-50"
    : variants[variant];

  const styles = `${base} px-5 py-2 hover:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${style} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={styles}
    >
      {children}
    </button>
  );
}
