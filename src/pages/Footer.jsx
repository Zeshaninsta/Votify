import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../Asset/images/votify.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-0 flex flex-col md:flex-row justify-between items-center">
        <div className="md:w-1/3 mb-6 md:mb-0 flex flex-col justify-center items-center">
          <img src={Logo} alt="Logo" className="w-20 h-20 mb-4" />
          <h1 className="text-2xl text-white font-pro">Votify</h1>
          <p className="text-lg text-center">
            Connect with us on social media to stay updated on the latest news
            and announcements.
          </p>
          <div className="flex mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
        <div className="md:w-1/3 text-center mb-6 md:mb-0 flex flex-col justify-start items-center">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a
                href="/"
                className="hover:text-blue-500 transition duration-300"
              >
                Home
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/about"
                className="hover:text-blue-500 transition duration-300"
              >
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/vote"
                className="hover:text-blue-500 transition duration-300"
              >
                Vote Now
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-blue-500 transition duration-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
        <div className="md:w-1/3 text-center">
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <p className="mb-2">Robe Bale Ethiopia</p>
          <p className="mb-2">Madda Walabu University</p>
          <p className="mb-2">Phone: (123) 456-7890</p>
          <p>Email: info@studentvotingapp.com</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <p>&copy; {new Date().getFullYear()} Votify. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
