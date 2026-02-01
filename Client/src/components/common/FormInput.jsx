
import React from "react";



export default function FormInput({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2 lg:w-[48%]">
      <label className="label-style">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-style"
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

export function ErrorText({ children }) {
  return (
    <span className="-mt-1 text-[12px] text-yellow-100">
      {children}
    </span>
  );
}
