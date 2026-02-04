import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../utils/constants";

function CartIcon() {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  if (!user || user.accountType === ACCOUNT_TYPE.INSTRUCTOR) return null;

  return (
    <Link to="/cart" className="relative">
      <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
      {items?.length > 0 && (
        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center rounded-full bg-richblack-600 text-xs font-bold text-yellow-100">
          {items.length}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;
