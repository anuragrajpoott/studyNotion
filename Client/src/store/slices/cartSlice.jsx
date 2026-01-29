import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],        // courses in cart (from backend)
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartLoading(state, action) {
      state.loading = action.payload;
    },

    setCart(state, action) {
      state.items = action.payload;
      state.error = null;
    },

    addItem(state, action) {
      const course = action.payload;
      const exists = state.items.find(
        (item) => item._id === course._id
      );
      if (!exists) {
        state.items.push(course);
      }
    },

    removeItem(state, action) {
      const courseId = action.payload;
      state.items = state.items.filter(
        (item) => item._id !== courseId
      );
    },

    clearCart(state) {
      state.items = [];
      state.error = null;
    },

    setCartError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCartLoading,
  setCart,
  addItem,
  removeItem,
  clearCart,
  setCartError,
} = cartSlice.actions;

export default cartSlice.reducer;
