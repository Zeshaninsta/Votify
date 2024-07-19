import React, { useState } from "react";
import emailjs from "emailjs-com";
import { FaEnvelope, FaUser } from "react-icons/fa";
import Logo from "../Asset/images/votify.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = document.createElement("form");
    form.setAttribute("id", "contactForm");

    // Create input fields for each form data
    Object.keys(formData).forEach((key) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", key);
      input.setAttribute("value", formData[key]);
      form.appendChild(input);
    });

    // Append the form to the body
    document.body.appendChild(form);

    // Send form
    emailjs
      .sendForm(
        "service_6w42b5v",
        "template_wvfgdjc",
        form,
        "lMTrIKJMI3b5Vp7jr"
      )
      .then((result) => {
        console.log(result.text);
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", message: "" }); // Clear the form inputs
      })
      .catch((error) => {
        console.log(error.text);
        setShowErrorModal(true);
      });

    // Remove the form from the body
    document.body.removeChild(form);
  };

  return (
    <div className="bg-gray-100 py-20 text-black w-full">
      <div className="container mx-auto px-6 md:px-0 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 font-pro">
          Contact Us
        </h2>
        <div className="max-w-lg mx-auto mb-8 w-full">
          <p className="text-lg md:text-xl text-center font-rob">
            Have questions or feedback? Feel free to reach out to us using the
            form below.
          </p>
        </div>
        <div className="flex bg-slate-900 rounded-xl justify-between items-center flex-col lg:flex-row gap-5  m-auto border border-slate-400 p-5">
          <div className="flex justify-center items-center flex-col p-5 h-full w-full">
            <div className="flex justify-center items-center flex-col h-full">
              <img
                src={Logo}
                alt="Logo"
                className="w-[200px] mb-4 mx-auto md:mx-0"
              />
              <h1 className="text-white font-pro text-6xl text-center">
                Votify
              </h1>
              <h3 className="text-white text-2xl font-bold text-center">
                Welcome to Votify
              </h3>
              <p className="text-xl md:text-2xl text-center mb-8 text-gray-200">
                Empowering voices, shaping futures.
              </p>
            </div>
          </div>
          <div className="w-full bg-slate-800 p-5">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-white text-lg font-semibold mb-2"
              >
                <FaUser className="inline-block mr-2 text-blue-500" />
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-white text-lg font-semibold mb-2"
              >
                <FaEnvelope className="inline-block mr-2 text-blue-500" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-white text-lg font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="resize-none w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-3 px-8 rounded-full text-xl md:text-2xl font-semibold hover:bg-blue-600 transition duration-300 w-full"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-2xl font-semibold mb-4">
              Message Sent Successfully!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-blue-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-2xl font-semibold mb-4">
              Failed to Send Message. Please try again later.
            </p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="bg-blue-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
