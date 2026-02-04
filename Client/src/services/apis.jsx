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
  GET_PROFILE: `${BASE_URL}/profile/me`,
  UPDATE_PROFILE: `${BASE_URL}/profile/me`,
  UPDATE_DISPLAY_PICTURE: `${BASE_URL}/profile/profile-image`,
  DELETE_ACCOUNT: `${BASE_URL}/profile/me`,
};

// ===============================
// COURSE (PUBLIC + INSTRUCTOR)
// ===============================
export const courseEndpoints = {
  GET_COURSE_DETAILS: `${BASE_URL}/course/:courseId`,
  CREATE_COURSE: `${BASE_URL}/course`,
  EDIT_COURSE: `${BASE_URL}/course/:courseId`,
  DELETE_COURSE: `${BASE_URL}/course/:courseId`,
  GET_INSTRUCTOR_COURSES: `${BASE_URL}/course/instructor`,
};

// ===============================
// SECTION (INSTRUCTOR)
// ===============================
export const sectionEndpoints = {
  CREATE_SECTION: `${BASE_URL}/section/create-section`,
  UPDATE_SECTION: `${BASE_URL}/section/:sectionId`,
  DELETE_SECTION: `${BASE_URL}/section/:sectionId`,
};

// ===============================
// SUBSECTION (INSTRUCTOR)
// ===============================
export const subsectionEndpoints = {
  CREATE_SUBSECTION: `${BASE_URL}/section/`,
  UPDATE_SUBSECTION: `${BASE_URL}/section/:subsectionId`,
  DELETE_SUBSECTION: `${BASE_URL}/section/:subsectionId`,
};

// ===============================
// CATEGORY
// ===============================
export const categoryEndpoints = {
  GET_ALL_CATEGORIES: `${BASE_URL}/category`,
  GET_CATEGORY_PAGE_DETAILS: `${BASE_URL}/category/:categoryId`,
  CREATE_CATEGORY: `${BASE_URL}/category`, // admin
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
  CHECKOUT_CART: `${BASE_URL}/enrollments/enroll`,
  GET_MY_ENROLLED_COURSES: `${BASE_URL}/enrollments/my-courses`,
  GET_ENROLLED_COURSE_DETAILS: `${BASE_URL}/enrollments/:courseId`,
};
