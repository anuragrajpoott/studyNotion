import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import React from "react";
function CatalogDropdown() {
  const location = useLocation();
  const { categories, loading } = useSelector((state) => state.category);

  const isActive = matchPath(
    { path: "/catalog/:catalogName" },
    location.pathname
  );

  return (
    <div
      className={`group relative flex cursor-pointer items-center gap-1 ${
        isActive ? "text-yellow-25" : "text-richblack-25"
      }`}
    >
      <span>Catalog</span>
      <BsChevronDown />

      <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-4 rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : categories?.length ? (
          categories
            .filter((cat) => cat.courseCount > 0)
            .map((cat) => (
              <Link
                key={cat._id}
                to={`/catalog/${cat.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="block rounded px-3 py-2 hover:bg-richblack-50"
              >
                {cat.name}
              </Link>
            ))
        ) : (
          <p className="text-center">No Categories</p>
        )}
      </div>
    </div>
  );
}

export default CatalogDropdown;
