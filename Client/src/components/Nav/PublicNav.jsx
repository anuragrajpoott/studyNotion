import { NavbarLinks } from "../../assets/data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import CatalogDropdown from "./CatalogDropdown";
import React from "react";

function PublicNav() {
  const location = useLocation();

  const matchRoute = (route) =>
    matchPath({ path: route }, location.pathname);

  return (
    <nav className="hidden md:block">
      <ul className="flex gap-x-6 text-richblack-25">
        {NavbarLinks.map((link) => (
          <li key={link.title}>
            {link.title === "Catalog" ? (
              <CatalogDropdown />
            ) : (
              <Link
                to={link.path}
                className={
                  matchRoute(link.path)
                    ? "text-yellow-25"
                    : "text-richblack-25"
                }
              >
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PublicNav;
