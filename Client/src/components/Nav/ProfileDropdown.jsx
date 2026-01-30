import { AiOutlineCaretDown } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Icons from "react-icons/vsc";
import React from "react";

import { sidebarLinks } from "../../assets/data/dashboard-links";
import { logout } from "../../services/operations/authOperations";

function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="group relative">
      <div className="flex cursor-pointer items-center gap-x-1 select-none">
        <img
          src={user.image}
          alt={user.firstName}
          className="h-8 w-8 rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      <div className="invisible absolute right-0 top-full z-50 mt-2 w-48 rounded-md border border-richblack-700 bg-richblack-800 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        {sidebarLinks
          .filter(
            (link) =>
              !link.type || link.type === user.accountType
          )
          .map((link) => {
            const Icon = Icons[link.icon];
            return (
              <Link
                key={link.id}
                to={link.path}
                className="flex items-center gap-x-2 px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
              >
                {Icon && <Icon />}
                {link.name}
              </Link>
            );
          })}

        <button
          onClick={() => dispatch(logout(navigate))}
          className="flex w-full items-center gap-x-2 px-4 py-2 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
        >
          <Icons.VscSignOut />
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileDropdown;
