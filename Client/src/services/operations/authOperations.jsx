import { toast } from "react-hot-toast";
import { apiConnector } from "../../utils/apiConnector";
import { authEndpoints } from "../apis";
import {
  setAuthLoading,
  setUser,
  setAuthError,
  setVerifyEmail,
  setToken,
} from "../../store/slices/authSlice";
import { setIsAuthenticated } from "../../store/slices/authSlice";

/* =========================================================
   SEND OTP
========================================================= */
export const sendOtp = ({email}) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: authEndpoints.SEND_OTP,
      data: { email }, // ✅ backend expects this
    });

    console.log("response from sendOtp:", res); // For debugging

    if (!res.data.success) throw new Error(res.data.message);

    dispatch(setVerifyEmail(true));
    toast.success("OTP sent successfully");
  } catch (err) {
    dispatch(setVerifyEmail(false));
    toast.error(err.message || "Failed to send OTP");
    dispatch(setAuthError(err.message));
    console.log(err)
  } finally {
    dispatch(setAuthLoading(false));
  }
};



/* =========================================================
   SIGNUP
========================================================= */
export const signup = ({firstName, lastName, email, password, confirmPassword, otp}, navigate) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  try {
    const res = await apiConnector({
      method: "POST",
      url: authEndpoints.SIGNUP,
      data: {firstName, lastName, email, password, confirmPassword, otp}
    });

    if (!res.data.success) throw new Error(res.data.message);

    toast.success("Signup successful");
    navigate("/dashboard");
    dispatch(setIsAuthenticated(true));
    dispatch(setUser(res.data.user));
    dispatch(setToken(res.data.token))
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

    console.log("Login response:", res); // For debugging purposes

    dispatch(setUser(res.data.user));
    dispatch(setIsAuthenticated(true));
    dispatch(setToken(res.data.token))
    toast.success("Login successful");
    navigate("/dashboard");
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
  dispatch(setIsAuthenticated(false));
  toast.success("Logged out");
  navigate("/");
};

