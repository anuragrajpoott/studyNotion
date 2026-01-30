import { Link } from "react-router-dom";
import logo from "../../assets/visuals/Logo/Logo-Full-Light.png";
import React from "react";

function Logo() {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="StudyNotion Logo"
        width={160}
        height={32}
        loading="lazy"
      />
    </Link>
  );
}

export default Logo;
