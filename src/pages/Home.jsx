import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Asset/images/votify.png";
import About from "./About";
import { FaVoteYea, FaCalendarAlt, FaBullhorn } from "react-icons/fa";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Bg from "../Asset/images/bg.jpg";
import HowItWorks from "./HowItWorks";
const Home = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div
        className="relative overflow-hidden w-full bg-[#191919]"
        style={{
          backgroundImage: `url(${Bg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Abstract Background */}

        {/* Hero Content */}
        <div className="relative flex flex-col justify-center items-center h-screen p-10 md:p-20 z-10">
          <img src={Logo} alt="Votify Logo" className="w-32 md:w-48 mb-8" />
          <h1 className="text-5xl md:text-7xl font-sedan text-white text-center mb-2">
            Welcome to Votify
          </h1>
          <p className="text-xl md:text-2xl text-center mb-8">
            Empowering voices, shaping futures.
          </p>
          <Link
            to="/vote"
            className="bg-white text-blue-800 py-3 px-8 rounded-full text-xl md:text-2xl font-semibold hover:bg-opacity-80 transition duration-300 flex items-center justify-center"
          >
            <FaVoteYea className="mr-2" />
            Start Voting
          </Link>
          <p className="mt-8 text-center text-lg">
            Explore our platform to discover the latest student elections,
            events, and opportunities to make a difference in your campus
            community.
          </p>
        </div>
      </div>
      {/* About Section */}
      <About />
      <HowItWorks />

      {/* Features Section */}
      <div className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 md:px-0">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black font-pro">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 ">
            <div className="flex flex-col items-center text-center text-black border border-[#3b82f6] p-2">
              <FaVoteYea className="text-6xl text-blue-500 mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Easy Voting Process
              </h3>
              <p className="text-lg md:text-xl">
                Participate in elections with just a few clicks. Our
                user-friendly interface ensures a seamless voting experience.
              </p>
            </div>
            <div className="flex flex-col items-center text-center text-black border border-[#22c55e] p-2">
              <FaCalendarAlt className="text-6xl text-green-500 mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Upcoming Events
              </h3>
              <p className="text-lg md:text-xl">
                Stay updated with the latest events happening on campus. Never
                miss out on exciting opportunities for engagement.
              </p>
            </div>
            <div className="flex flex-col items-center text-center text-black border border-[#a855f7] p-2">
              <FaBullhorn className="text-6xl text-purple-500 mb-6" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Announcements
              </h3>
              <p className="text-lg md:text-xl">
                Receive important announcements and notifications directly from
                the university administration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQ />

      <Contact />
    </div>
  );
};

export default Home;
