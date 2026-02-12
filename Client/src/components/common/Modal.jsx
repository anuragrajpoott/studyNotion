import { useEffect } from "react";
import Button from "./Button";
import React from "react";

export default function Modal({ modalData }) {
  if (!modalData) return null;

  const {
    text1,
    text2,
    btn1Text,
    btn2Text,
    btn1Handler,
    btn2Handler,
  } = modalData;

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        btn2Handler?.();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [btn2Handler]);

  return (
    <div
      className="fixed inset-0 z-1000 grid place-items-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-11/12 max-w-90 rounded-lg border border-richblack-400 bg-richblack-800 p-6 shadow-xl">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-richblack-5">
          {text1}
        </h2>

        {/* Description */}
        <p className="mt-3 text-richblack-200 leading-6">
          {text2}
        </p>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Button
            variant="danger"
            onClick={btn1Handler}
          >
            {btn1Text}
          </Button>

          <Button
            outline
            onClick={btn2Handler}
          >
            {btn2Text}
          </Button>
        </div>

      </div>
    </div>
  );
}
