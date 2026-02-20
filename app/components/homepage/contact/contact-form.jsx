"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput,
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
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
          {
            "Currently open to Senior SDET / Test Automation Engineer roles in the Hungary/EU. Reach out and let's talk."
          }
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-base">Your Name: </label>
            <input
              id="contact-name"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required={true}
              aria-required="true"
              aria-invalid={error.required && !userInput.name ? "true" : "false"}
              aria-describedby={error.required && !userInput.name ? "form-error" : undefined}
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-base">Your Email: </label>
            <input
              id="contact-email"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required={true}
              aria-required="true"
              aria-invalid={error.email || (error.required && !userInput.email) ? "true" : "false"}
              aria-describedby={error.email ? "email-error" : error.required && !userInput.email ? "form-error" : undefined}
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              onBlur={() => {
                checkRequired();
                setError({ ...error, email: !isValidEmail(userInput.email) });
              }}
            />
            {error.email && (
              <p id="email-error" role="alert" className="text-sm text-red-400">
                Please provide a valid email!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="text-base">Your Message: </label>
            <textarea
              id="contact-message"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required={true}
              aria-required="true"
              aria-invalid={error.required && !userInput.message ? "true" : "false"}
              aria-describedby={error.required && !userInput.message ? "form-error" : undefined}
              onChange={(e) =>
                setUserInput({ ...userInput, message: e.target.value })
              }
              onBlur={checkRequired}
              rows="4"
              value={userInput.message}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <div aria-live="polite" aria-atomic="true">
              {error.required && (
                <p id="form-error" className="text-sm text-red-400">All fields are required!</p>
              )}
            </div>
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
