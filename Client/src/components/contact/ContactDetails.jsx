import React from "react";
import contactDetails from "../../assets/data/contactDetails";
import ContactItem from "./ContactItem";

export default function ContactDetails() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
      {contactDetails.map((item, index) => (
        <ContactItem key={index} {...item} />
      ))}
    </div>
  );
}
