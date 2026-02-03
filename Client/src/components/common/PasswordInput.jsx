import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React from "react";

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  show,
  toggle,
  placeholder,
  error,
}) {
  return (
    <div className="relative flex flex-col gap-2 lg:w-[48%]">
      <label className="label-style  text-richblack-5 text-[14px]">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-style pr-10"
        required
      />

      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-9 text-richblack-200"
      >
        {show ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </button>

      {error && (
        <span className="-mt-1 text-[12px] text-yellow-100">
          {error}
        </span>
      )}
    </div>
  );
}
