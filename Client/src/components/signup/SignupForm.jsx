import React from 'react'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { toast } from "react-hot-toast";
import FormInput from "../common/FormInput";
import { sendOtp } from '../../services/operations/authOperations';
import { setSignupData } from '../../store/slices/authSlice';

 const SignupForm = () => {

    const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);


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

  console.log(formData.email)

  // ✅ ONLY email
  dispatch(sendOtp(formData.email));



  // ✅ full data saved for later signup
  dispatch(setSignupData({ ...formData, accountType }));

  setFormData({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
}



  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ];
  return (
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
   
              <div className="flex gap-4">
                <FormInput
                 label="Password"
                 name="password"
                 type="password"
                 value={password}
                 onChange={handleChange}
                 placeholder="Enter password"
               />
   
               <FormInput
                 label="Confirm Password"
                 name="confirmPassword"
                 type="password"
                 value={confirmPassword}
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
  )
}

export default SignupForm
