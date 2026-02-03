import React from 'react'
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";


export default function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {  signupData } = useSelector((state) => state.auth);


  // Protect route
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  function handleVerify(e) {
    e.preventDefault();
    

    console.log("Verifying OTP:", otp);

    navigate("/login");
  }

  function handleResendOtp() {
    if (!signupData?.email) return;
   console.log("Resend OTP to:", signupData.email);
  }



  return (
    <main className="grid min-h-[calc(50vh-3.5rem)] place-items-center">
      <div className="w-full max-w-125 p-4 lg:p-8">

        <h1 className="text-3xl font-semibold text-richblack-5">
          Verify Email
        </h1>

        <p className="my-4 text-lg text-richblack-100">
          A verification code has been sent to your email. Enter the code below.
        </p>

        <form onSubmit={handleVerify} className="space-y-6">

          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{ justifyContent: "space-between", gap: "6px" }}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                className="aspect-square w-12 rounded-lg bg-richblack-800 text-center text-richblack-5 outline-none focus:outline-2 focus:outline-yellow-50 lg:w-15"
                style={{
                  boxShadow:
                    "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
              />
            )}
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-50 py-3 font-medium text-richblack-900"
          >
            Verify Email
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between">
          <Link to="/signup" className="flex items-center gap-2 text-richblack-5">
            <BiArrowBack /> Back to Signup
          </Link>

          <button
            onClick={handleResendOtp}
            className="flex items-center gap-2 text-blue-100"
          >
            <RxCountdownTimer />
            Resend OTP
          </button>
        </div>

      </div>
    </main>
  );
}

