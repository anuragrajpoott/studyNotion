import { toast } from "react-hot-toast";
import { apiConnector } from "../../utils/apiConnector";
import { categoryEndpoints } from "../apis";
import {
  setCategoryLoading,
  setCategories,
  setCategoryCourses,
  setCategoryError,
} from "../../store/slices/categorySlice";

/* =========================================================
   GET ALL CATEGORIES (PUBLIC)
========================================================= */
export const getAllCategories = () => async (dispatch) => {
  dispatch(setCategoryLoading(true));
  try {
    const res = await apiConnector({
      method: "GET",
      url: categoryEndpoints.GET_ALL_CATEGORIES,
    });

    if (!res.data.success) throw new Error(res.data.message);

    console.log("Categories fetched:", res.data.data); // For debugging

    dispatch(setCategories(res.data.data));
  } catch (err) {
    dispatch(setCategoryError(err.message));
    toast.error("Failed to load categories");
  } finally {
    dispatch(setCategoryLoading(false));
  }
};

/* =========================================================
   GET CATEGORY PAGE DETAILS (PUBLIC)
========================================================= */
export const getCategoryPageDetails =
  (categoryId) => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
      const res = await apiConnector({
        method: "POST",
        url: categoryEndpoints.GET_CATEGORY_PAGE_DETAILS,
        data: { categoryId },
      });

      if (!res.data.success) throw new Error(res.data.message);

      // backend usually returns courses + metadata
      dispatch(setCategoryCourses(res.data.data.courses));
    } catch (err) {
      dispatch(setCategoryError(err.message));
      toast.error("Failed to load category details");
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };

/* =========================================================
   CREATE CATEGORY (ADMIN)
========================================================= */
export const createCategory =
  (payload, navigate) => async (dispatch) => {
    dispatch(setCategoryLoading(true));
    try {
      const res = await apiConnector({
        method: "POST",
        url: categoryEndpoints.CREATE_CATEGORY,
        data: payload,
      });

      if (!res.data.success) throw new Error(res.data.message);

      toast.success("Category created successfully");
      navigate("/dashboard/categories");
    } catch (err) {
      dispatch(setCategoryError(err.message));
      toast.error("Failed to create category");
    } finally {
      dispatch(setCategoryLoading(false));
    }
  };
