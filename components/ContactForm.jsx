import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Swal from "sweetalert2";

function ContactForm() {
  const [state, handleSubmit] = useForm("mdkalzgz");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  useEffect(() => {
    if (state.succeeded) {
      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Message Sent",
        text: "Thank you for reaching out! I will get back to you soon.",
      });

      // Reset the form fields
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [state.succeeded]);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-full flex flex-col justify-center bg-gray-800 p-2 md:p-6 rounded-lg shadow-lg w-full md:mx-auto"
    >
      {state.submitting && (
        <div className="flex justify-center mb-4">
          <div className="loader"></div>
        </div>
      )}
      {/* Name Input */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 bg-gray-900 text-white rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-2 bg-gray-900 text-white rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      {/* Message Input */}
      <div className="mb-4">
        <label className="block text-gray-400 mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={handleMessageChange}
          className="w-full p-2 bg-gray-900 text-white rounded border border-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          rows="4"
          required
        ></textarea>
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-2 bg-gray-700 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {state.submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
