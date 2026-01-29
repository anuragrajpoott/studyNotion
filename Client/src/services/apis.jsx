// ===============================
// BASE URL
// ===============================
const BASE_URL = "http://localhost:4000/api/v1";
    

// ===============================
// AUTH
// ===============================
export const authEndpoints = {
  SEND_OTP: `${BASE_URL}/auth/send-otp`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
  CHANGE_PASSWORD: `${BASE_URL}/auth/change-password`,
};

// ===============================
// PROFILE
// ===============================
export const profileEndpoints = {
  GET_PROFILE: `${BASE_URL}/profile/get-user-details`,
  UPDATE_PROFILE: `${BASE_URL}/profile/update-profile`,
  UPDATE_DISPLAY_PICTURE: `${BASE_URL}/profile/update-display-picture`,
  DELETE_ACCOUNT: `${BASE_URL}/profile/delete-account`,
};

// ===============================
// COURSE (PUBLIC + INSTRUCTOR)
// ===============================
export const courseEndpoints = {
  GET_ALL_COURSES: `${BASE_URL}/course/all`,
  GET_COURSE_DETAILS: `${BASE_URL}/course/details`,
  CREATE_COURSE: `${BASE_URL}/course/create`,
  EDIT_COURSE: `${BASE_URL}/course/edit`,
  DELETE_COURSE: `${BASE_URL}/course/delete`,
  GET_INSTRUCTOR_COURSES: `${BASE_URL}/course/instructor-courses`,
};

// ===============================
// SECTION (INSTRUCTOR)
// ===============================
export const sectionEndpoints = {
  CREATE_SECTION: `${BASE_URL}/section/create-section`,
  UPDATE_SECTION: `${BASE_URL}/section/update-section`,
  DELETE_SECTION: `${BASE_URL}/section/delete-section`,
};

// ===============================
// SUBSECTION (INSTRUCTOR)
// ===============================
export const subsectionEndpoints = {
  CREATE_SUBSECTION: `${BASE_URL}/section/create-subsection`,
  UPDATE_SUBSECTION: `${BASE_URL}/section/update-subsection`,
  DELETE_SUBSECTION: `${BASE_URL}/section/delete-subsection`,
};

// ===============================
// CATEGORY
// ===============================
export const categoryEndpoints = {
  GET_ALL_CATEGORIES: `${BASE_URL}/category/all`,
  GET_CATEGORY_PAGE_DETAILS: `${BASE_URL}/category/page-details`,
  CREATE_CATEGORY: `${BASE_URL}/category/create`, // admin
};

// ===============================
// CART
// ===============================
export const cartEndpoints = {
  GET_CART: `${BASE_URL}/cart`,
  ADD_TO_CART: `${BASE_URL}/cart/add`,
  REMOVE_FROM_CART: `${BASE_URL}/cart/remove`,
  CLEAR_CART: `${BASE_URL}/cart/clear`,
};

// ===============================
// ENROLLMENT
// ===============================
export const enrollmentEndpoints = {
  CHECKOUT_CART: `${BASE_URL}/enrollments/checkout`,
  GET_MY_ENROLLED_COURSES: `${BASE_URL}/enrollments/my-courses`,
  GET_ENROLLED_COURSE_DETAILS: `${BASE_URL}/enrollments/course-details`,
};
