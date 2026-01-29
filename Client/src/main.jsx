import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";
import rootReducer from "./store/reducer";

// ===============================
// REDUX STORE
// ===============================
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

// ===============================
// APP BOOTSTRAP
// ===============================
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>

      {/* Global Toasts */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#f9fafb",
          },
        }}
      />
    </Provider>
  </React.StrictMode>
);
