import ContactUsForm from "./ContactUsForm";
import React from "react";

export default function ContactForm() {
  return (
    <section className="border border-richblack-600 rounded-xl p-7 lg:p-14 flex flex-col gap-4 text-richblack-300">
      
      <h2 className="text-4xl font-semibold leading-tight text-richblack-5">
        Got an idea? We’ve got the skills. Let’s team up
      </h2>

      <p>
        Tell us more about yourself and what you’ve got in mind.
      </p>

      <div className="mt-6">
        <ContactUsForm />
      </div>

    </section>
  );
}
