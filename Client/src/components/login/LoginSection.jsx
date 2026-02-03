import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import frameImg from "../../assets/visuals/Images/frame.png";
import loginImg from "../../assets/visuals/Images/login.webp";
import FormInput from "..//common/FormInput";

export default function LoginSection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ ...formData });
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <main className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse gap-60 py-12 md:flex-row items-center justify-center">
        {/* Left */}
        <div className="w-full max-w-112.5">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Welcome Back
          </h1>

          <p className="mt-4 text-richblack-100">
            Build skills for today, tomorrow, and beyond.{" "}
            <span className="font-edu-sa font-bold italic text-blue-100">
              Education to future-proof your career.
            </span>
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            {/* Email */}
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
            />

            {/* Password */}
            <div className="relative">
              <FormInput
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter password"
              />

              <Link
                to="/forgot-password"
                className="mt-1 block text-xs text-blue-100"
              >
                Forgot Password
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 rounded-lg bg-yellow-50 py-2 font-medium text-richblack-900"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Right */}
        <div className="relative w-full max-w-112.5">
          <img src={frameImg} alt="" />
          <img
            src={loginImg}
            alt="Students learning"
            className="absolute -top-4 right-4"
          />
        </div>
      </div>
    </main>
  );
}
