import React from "react";
import { useSelector } from "react-redux";
import { AiOutlineMenu } from "react-icons/ai";


import Logo from "./Logo";
import PublicNav from "./PublicNav";
import AuthButtons from "./AuthButtons";
import CartIcon from "./CartIcon";
import ProfileDropdown from "./ProfileDropdown";

import { ACCOUNT_TYPE } from "../../utils/constants";

function Navbar() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="flex h-14 items-center justify-center border-b border-richblack-700 bg-richblack-800">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Logo />

        {!user && <PublicNav />}

        <div className="hidden items-center gap-4 md:flex">
          {user && user.accountType == ACCOUNT_TYPE.STUDENT && <CartIcon />}
          {!user && <AuthButtons />}
          {user && <ProfileDropdown />}
        </div>

        {/* Mobile (later) */}
        <button className="md:hidden">
          <AiOutlineMenu fontSize={24} className="text-richblack-100" />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
