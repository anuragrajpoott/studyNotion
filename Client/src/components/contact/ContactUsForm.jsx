import { useState } from "react";
import CountryCode from "../../assets/data/countrycode.json";
import Button from "../common/Button";
import FormInput from "../common/FormInput";
import ErrorText from "../common/FormInput";
import React from "react";

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNo: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Phone number is required";
    } else if (
      formData.phoneNo.length < 10 ||
      formData.phoneNo.length > 12
    ) {
      newErrors.phoneNo = "Invalid phone number";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitContactForm = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      console.log("Contact form data:", formData);

      // API call goes here
    } catch (error) {
      console.error("Contact form error:", error);
    } finally {
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        countryCode: "",
        phoneNo: "",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={submitContactForm} className="flex flex-col gap-7" noValidate>
      {/* Name */}
      <div className="flex flex-col gap-5 lg:flex-row">
        <FormInput
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
          placeholder="Enter first name"
        />

        <FormInput
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter last name"
        />
      </div>

      {/* Email */}
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter email address"
      />

      {/* Phone */}
      <div className="flex flex-col gap-2">
        <label className="lable-style">Phone Number</label>

        <div className="flex gap-4">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="form-style w-22.5"
          >
            <option value="">Code</option>
            {CountryCode.map((c, i) => (
              <option key={i} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>

          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            placeholder="12345 67890"
            className="form-style flex-1"
          />
        </div>

        {errors.phoneNo && <ErrorText>{errors.phoneNo}</ErrorText>}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="lable-style">Message</label>
        <textarea
          rows="7"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message here"
          className="form-style"
        />
        {errors.message && <ErrorText>{errors.message}</ErrorText>}
      </div>

      {/* Submit */}
      <Button type="submit" disabled={loading} className="w-fit">
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

/* ---------- Helpers ---------- */

