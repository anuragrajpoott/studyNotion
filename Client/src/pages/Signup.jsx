import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../components/common/PasswordInput";
import FormInput from "../components/common/FormInput";
import frameImg from "../assets/visuals/Images/frame.png";
import signupImg from "../assets/visuals/Images/signup.webp";

import { ACCOUNT_TYPE } from "../utils/constants";

import React from "react";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log({ ...formData, accountType });
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner" />
      </div>
    );
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ];

  return (
    <main className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse gap-60 py-12 md:flex-row justify-center items-center">
        {/* Left */}
        <div className="w-full max-w-112.5">
          <h1 className="text-3xl font-semibold text-richblack-5">
            Join the millions learning to code for free
          </h1>

          <p className="mt-4 text-richblack-100">
            Build skills for today, tomorrow, and beyond.{" "}
            <span className="font-edu-sa font-bold italic text-blue-900">
              Education to future-proof your career.
            </span>
          </p>

          {/* tabs */}

          <div>
            <div
              role="tablist"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="my-6 flex max-w-max gap-x-1 rounded-full bg-richblack-800 p-1"
            >
              {tabData.map((tab) => {
                const isActive = accountType === tab.type;

                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setAccountType(tab.type)}
                    className={`rounded-full px-5 py-2 transition-all duration-200 ${
                      isActive
                        ? "bg-richblack-900 text-richblack-5"
                        : "bg-transparent text-richblack-200"
                    }`}
                  >
                    {tab.tabName}
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
            {/* First & Last Name */}
            <div className="flex gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
                placeholder="Enter first name"
              />

              <FormInput
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>

            {/* Email */}
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email address"
            />

            {/* Passwords */}
            <div className="flex gap-4">
              <PasswordInput
                label="Create Password"
                name="password"
                value={password}
                show={showPassword}
                toggle={() => setShowPassword((p) => !p)}
                onChange={handleChange}
                placeholder="Enter password"
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                show={showConfirmPassword}
                toggle={() => setShowConfirmPassword((p) => !p)}
                onChange={handleChange}
                placeholder="Confirm password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 rounded-lg bg-yellow-50 py-2 font-medium text-richblack-900"
            >
              Create Account
            </button>
          </form>
        </div>

        {/* Right */}
        <div className="relative w-full max-w-112.5">
          <img src={frameImg} alt="" />
          <img
            src={signupImg}
            alt="Students learning"
            className="absolute -top-4 right-4"
          />
        </div>
      </div>
    </main>
  );
}




