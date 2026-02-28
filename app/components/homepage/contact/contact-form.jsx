"use client";
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 20;

function validate(field, value) {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required.";
      if (value.trim().length < MIN_NAME_LENGTH)
        return `Name must be at least ${MIN_NAME_LENGTH} characters.`;
      return "";
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!isValidEmail(value)) return "Please enter a valid email address.";
      return "";
    case "message":
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < MIN_MESSAGE_LENGTH)
        return `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
      return "";
    default:
      return "";
  }
}

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({ name: "", email: "", message: "", website: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const handleChange = (field, value) => {
    setUserInput((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(field, userInput[field]) }));
  };

  const inputClass = (field) => {
    const base =
      "bg-[#10172d] w-full border rounded-md ring-0 outline-0 transition-all duration-300 px-3 py-2";
    if (touched[field] && errors[field]) return `${base} border-red-500 focus:border-red-500`;
    if (touched[field] && !errors[field] && userInput[field]) return `${base} border-[#16f2b3]`;
    return `${base} border-[#353a52] focus:border-[#16f2b3]`;
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    const nameErr = validate("name", userInput.name);
    const emailErr = validate("email", userInput.email);
    const messageErr = validate("message", userInput.message);

    setErrors({ name: nameErr, email: emailErr, message: messageErr });
    setTouched({ name: true, email: true, message: true });

    if (nameErr || emailErr || messageErr) return;

    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/contact`, userInput);
      toast.success("Message sent successfully!");
      setUserInput({ name: "", email: "", message: "", website: "" });
      setErrors({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"Currently open to Senior SDET / Test Automation Engineer roles in the Hungary/EU. Reach out and let's talk."}
        </p>
        <div className="mt-6 flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="contact-name" className="text-base">Your Name:</label>
            <input
              id="contact-name"
              className={inputClass("name")}
              type="text"
              maxLength="100"
              required
              aria-required="true"
              aria-invalid={touched.name && !!errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={userInput.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {touched.name && errors.name && (
              <p id="name-error" role="alert" className="text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="contact-email" className="text-base">Your Email:</label>
            <input
              id="contact-email"
              className={inputClass("email")}
              type="email"
              maxLength="100"
              required
              aria-required="true"
              aria-invalid={touched.email && !!errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={userInput.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
            />
            {touched.email && errors.email && (
              <p id="email-error" role="alert" className="text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label htmlFor="contact-message" className="text-base">Your Message:</label>
              <span
                className={`text-xs ${
                  userInput.message.length > 0 && userInput.message.length < MIN_MESSAGE_LENGTH
                    ? "text-amber-400"
                    : "text-[#a0a8c0]"
                }`}
              >
                {userInput.message.length}/500
                {userInput.message.length > 0 && userInput.message.length < MIN_MESSAGE_LENGTH && (
                  <span className="ml-1">(min {MIN_MESSAGE_LENGTH})</span>
                )}
              </span>
            </div>
            <textarea
              id="contact-message"
              className={inputClass("message")}
              maxLength="500"
              name="message"
              required
              aria-required="true"
              aria-invalid={touched.message && !!errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "message-error" : undefined}
              rows="4"
              value={userInput.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
            />
            {touched.message && errors.message && (
              <p id="message-error" role="alert" className="text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {/* Honeypot — hidden from humans, bots will fill it */}
          <input
            type="text"
            name="website"
            value={userInput.website}
            onChange={(e) => setUserInput((prev) => ({ ...prev, website: e.target.value }))}
            style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
            aria-hidden="true"
            autoComplete="off"
          />

          <div className="flex flex-col items-center gap-3">
            <button
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
              onClick={handleSendMail}
              disabled={isLoading}
              aria-busy={isLoading}
              aria-label={isLoading ? "Sending message, please wait" : "Send message"}
            >
              {isLoading ? (
                <span>Sending Message...</span>
              ) : (
                <span className="flex items-center gap-1">
                  Send Message
                  <TbMailForward size={20} aria-hidden="true" />
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactForm;
