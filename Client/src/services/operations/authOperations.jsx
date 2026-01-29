import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../endpoints";
import {
  setAuthLoading,
  setUser,
  setAuthError,
} from "../../store/slices/authSlice";

/* =========================================================
   SEND OTP
========================================================= */
export const sendOtp = (email, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: authEndpoints.SEND_OTP,
      data: { email },
    });

    if (!res.data.success) throw new Error(res.data.message);

    toast.success("OTP sent successfully");
    navigate("/verify-email");
  } catch (err) {
    toast.error(err.message || "Failed to send OTP");
    dispatch(setAuthError(err.message));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/* =========================================================
   SIGNUP
========================================================= */
export const signup = (payload, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: authEndpoints.SIGNUP,
      data: payload,
    });

    if (!res.data.success) throw new Error(res.data.message);

    toast.success("Signup successful");
    navigate("/login");
  } catch (err) {
    toast.error(err.message || "Signup failed");
    dispatch(setAuthError(err.message));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/* =========================================================
   LOGIN
========================================================= */
export const login = (payload, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: authEndpoints.LOGIN,
      data: payload,
    });

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setUser(res.data.user));
    toast.success("Login successful");
    navigate("/dashboard/my-profile");
  } catch (err) {
    toast.error(err.message || "Login failed");
    dispatch(setAuthError(err.message));
  } finally {
    dispatch(setAuthLoading(false));
  }
};

/* =========================================================
   LOGOUT
========================================================= */
export const logout = (navigate) => (dispatch) => {
  dispatch(setUser(null));
  toast.success("Logged out");
  navigate("/");
};

