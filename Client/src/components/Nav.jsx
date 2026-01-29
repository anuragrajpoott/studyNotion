import React from "react";

import { AiOutlineMenu, AiOutlineShoppingCart, AiOutlineCaretDown } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/visuals/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../assets/data/navbar-links";
import { ACCOUNT_TYPE } from "../utils/constants";
import { logout } from "../services/operations/authOperations";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { items } = useSelector((state) => state.cart);
  const { categories, loading } = useSelector((state) => state.category);

  const matchRoute = (route) =>
    matchPath({ path: route }, location.pathname);

  return (
    <div
      className={`flex h-14 items-center justify-center border-b border-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      }`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="StudyNotion Logo"
            width={160}
            height={32}
            loading="lazy"
          />
        </Link>

        {/* ================= PUBLIC NAVIGATION ================= */}
        {!user && (
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link) => (
                <li key={link.title}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <span>Catalog</span>
                      <BsChevronDown />

                      {/* Dropdown */}
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
        )}

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Cart (Students only) */}
          {user && user.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {items.length > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
                  {items.length}
                </span>
              )}
            </Link>
          )}

          {/* Auth buttons */}
          {!user && (
            <>
              <Link to="/login">
                <button className="btn-secondary">Log in</button>
              </Link>
              <Link to="/signup">
                <button className="btn-secondary">Sign up</button>
              </Link>
            </>
          )}

          {/* ================= PROFILE DROPDOWN ================= */}
          {user && (
            <div className="group relative">
              <div className="flex cursor-pointer items-center gap-x-1">
                <img
                  src={user.image}
                  alt={`${user.firstName} profile`}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
              </div>

              <div className="invisible absolute right-0 top-full z-50 mt-2 w-40 rounded-md border border-richblack-700 bg-richblack-800 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                <Link
                  to="/dashboard/my-profile"
                  className="flex items-center gap-x-2 px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                >
                  <VscDashboard />
                  Dashboard
                </Link>
                <button
                  onClick={() => dispatch(logout(navigate))}
                  className="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                >
                  <VscSignOut />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ================= MOBILE ================= */}
        <button className="md:hidden">
          <AiOutlineMenu fontSize={24} className="text-richblack-100" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
