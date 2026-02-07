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
        method: "GET",
        url: categoryEndpoints.GET_CATEGORY_PAGE_DETAILS(categoryId),
      });

      if (!res.data.success) throw new Error(res.data.message);


      // Assuming backend returns courses + metadata, adjust if structure is different  

      // backend usually returns courses + metadata

  ; // Debug log
      dispatch(setCategoryCourses(res.data.data));
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
