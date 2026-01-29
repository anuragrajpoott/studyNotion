import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import courseReducer from "../slices/courseSlice";
import sectionReducer from "../slices/sectionSlice";
import subsectionReducer from "../slices/subsectionSlice";
import enrollmentReducer from "../slices/enrollmentSlice";
import categoryReducer from "../slices/categorySlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  course: courseReducer,
  section: sectionReducer,
  subsection: subsectionReducer,
  enrollment: enrollmentReducer,
  category: categoryReducer,
});

export default rootReducer;
