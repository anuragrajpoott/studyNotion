
import frameImg from "../../assets/visuals/Images/frame.png";
import signupImg from "../../assets/visuals/Images/signup.webp";
import VerifyEmail from './VerifyEmail';
import { useSelector } from "react-redux";

import React from "react";
import SignupForm from "./SignupForm";

export default function SignupSection() {
 
  const { loading } = useSelector((state) => state.auth);

  const { verifyEmail } = useSelector((state) => state.auth);

  

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center">
        <div className="spinner" />
      </div>
    );
  }

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

          {verifyEmail ? <VerifyEmail /> : <SignupForm />}
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




