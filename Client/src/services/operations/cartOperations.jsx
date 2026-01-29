import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { cartEndpoints } from "../endpoints";
import {
  setCartLoading,
  setCart,
  addItem,
  removeItem,
  clearCart,
  setCartError,
} from "../../store/slices/cartSlice";

/* =========================================================
   GET CART
========================================================= */
export const getCart = () => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const res = await apiConnector({
      method: "GET",
      url: cartEndpoints.GET_CART,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setCart(res.data.data));
  } catch (err) {
    dispatch(setCartError(err.message));
    toast.error("Failed to load cart");
  } finally {
    dispatch(setCartLoading(false));
  }
};

/* =========================================================
   ADD COURSE TO CART
========================================================= */
export const addToCart =
  (course) => async (dispatch) => {
    dispatch(setCartLoading(true));
    try {
      const res = await apiConnector({
        method: "POST",
        url: cartEndpoints.ADD_TO_CART,
        data: { courseId: course._id },
      });

      if (!res.data.success) throw new Error(res.data.message);

      dispatch(addItem(course));
      toast.success("Course added to cart");
    } catch (err) {
      dispatch(setCartError(err.message));
      toast.error("Failed to add course to cart");
    } finally {
      dispatch(setCartLoading(false));
    }
  };

/* =========================================================
   REMOVE COURSE FROM CART
========================================================= */
export const removeFromCart =
  (courseId) => async (dispatch) => {
    dispatch(setCartLoading(true));
    try {
      const res = await apiConnector({
        method: "POST",
        url: cartEndpoints.REMOVE_FROM_CART,
        data: { courseId },
      });

      if (!res.data.success) throw new Error(res.data.message);

      dispatch(removeItem(courseId));
      toast.success("Course removed from cart");
    } catch (err) {
      dispatch(setCartError(err.message));
      toast.error("Failed to remove course");
    } finally {
      dispatch(setCartLoading(false));
    }
  };

/* =========================================================
   CLEAR CART
========================================================= */
export const clearUserCart = () => async (dispatch) => {
  dispatch(setCartLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: cartEndpoints.CLEAR_CART,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(clearCart());
  } catch (err) {
    dispatch(setCartError(err.message));
    toast.error("Failed to clear cart");
  } finally {
    dispatch(setCartLoading(false));
  }
};
