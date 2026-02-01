import ContactDetails from "../components/contact/ContactDetails";
import ContactForm from "../components/contact/ContactForm";
import React from "react";

export default function Contact() {
  return (
    <section className="mt-20 pb-20">
      <div className="mx-auto w-11/12 max-w-maxContent flex flex-col lg:flex-row gap-10">
        
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>

      </div>
    </section>
  );
}
