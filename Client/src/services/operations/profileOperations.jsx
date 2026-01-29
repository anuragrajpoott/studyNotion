import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../endpoints";
import {
  setProfile,
  setProfileLoading,
  setProfileError,
  clearProfile,
} from "../../store/slices/profileSlice";
import { logout } from "./auth.service";

/* =========================================================
   GET LOGGED IN USER PROFILE
========================================================= */
export const getProfile = () => async (dispatch) => {
  dispatch(setProfileLoading(true));
  try {
    const res = await apiConnector({
      method: "GET",
      url: profileEndpoints.GET_PROFILE,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setProfile(res.data.data));
  } catch (err) {
    dispatch(setProfileError(err.message));
    toast.error("Failed to fetch profile");
  } finally {
    dispatch(setProfileLoading(false));
  }
};

/* =========================================================
   UPDATE PROFILE DETAILS
========================================================= */
export const updateProfile = (data) => async (dispatch) => {
  dispatch(setProfileLoading(true));
  try {
    const res = await apiConnector({
      method: "PUT",
      url: profileEndpoints.UPDATE_PROFILE,
      data,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setProfile(res.data.data));
    toast.success("Profile updated successfully");
  } catch (err) {
    dispatch(setProfileError(err.message));
    toast.error("Profile update failed");
  } finally {
    dispatch(setProfileLoading(false));
  }
};

/* =========================================================
   UPDATE DISPLAY PICTURE
========================================================= */
export const updateDisplayPicture = (formData) => async (dispatch) => {
  dispatch(setProfileLoading(true));
  try {
    const res = await apiConnector({
      method: "PUT",
      url: profileEndpoints.UPDATE_DISPLAY_PICTURE,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setProfile(res.data.data));
    toast.success("Display picture updated");
  } catch (err) {
    dispatch(setProfileError(err.message));
    toast.error("Failed to update display picture");
  } finally {
    dispatch(setProfileLoading(false));
  }
};

/* =========================================================
   DELETE ACCOUNT
========================================================= */
export const deleteAccount = (navigate) => async (dispatch) => {
  dispatch(setProfileLoading(true));
  try {
    const res = await apiConnector({
      method: "DELETE",
      url: profileEndpoints.DELETE_ACCOUNT,
    });

    if (!res.data.success) throw new Error(res.data.message);

    toast.success("Account deleted successfully");
    dispatch(clearProfile());
    dispatch(logout(navigate));
  } catch (err) {
    toast.error("Failed to delete account");
  } finally {
    dispatch(setProfileLoading(false));
  }
};
