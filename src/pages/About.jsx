import React from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { BiDollarCircle } from "react-icons/bi";
import { RiUserLine } from "react-icons/ri";
import Logo from "../Asset/images/votify.png";

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto py-20 px-6 md:px-0 w-[80%] m-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <div className="w-full flex justify-center items-center flex-col">
            <h2 className="text-4xl text-black md:text-5xl font-bold mb-8 font-pro">
              About Votify
            </h2>
            <p className="text-lg md:text-xl mb-8 text-black">
              Votify is the official voting platform for Madda Walabu University
              students. Our platform is designed to empower students to actively
              participate in the democratic process by electing their
              representatives for various positions within the student union.
            </p>
            <p className="text-lg md:text-xl mb-8 text-black">
              At Votify, we believe that every student's voice matters, and we
              are committed to providing a transparent and accessible platform
              for students to voice their opinions and shape the future of their
              university community.
            </p>
            <Link
              to="/vote"
              className="bg-blue-500 text-white py-3 px-8 rounded-full text-xl md:text-2xl font-semibold hover:bg-blue-600 transition duration-300"
            >
              Start Voting
            </Link>
          </div>
        </div>
        <div className="mt-20 text-black flex justify-evenly items-center gap-5 w-full flex-col lg:flow-row ">
          <div className="flex flex-col justify-center items-center border border-slate-300 p-5 text-center rounded-lg w-full">
            <FiCheckCircle className="text-6xl mb-6 text-blue-500" />
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h3>
            <p className="text-lg md:text-xl mb-6">
              Our mission at Votify is to foster a culture of civic engagement
              and responsibility among students at Madda Walabu University. We
              strive to create an inclusive and democratic environment where all
              voices are heard and respected.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center border border-slate-300 p-5 text-center rounded-lg w-full">
            <BiDollarCircle className="text-6xl mb-6 text-green-500" />
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h3>
            <p className="text-lg md:text-xl mb-6">
              Our vision is to become the primary platform for student
              participation and decision-making at Madda Walabu University. We
              aim to empower students to become active citizens and leaders who
              drive positive change within their university and beyond.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center border border-slate-300 p-5 text-center rounded-lg w-full">
            <RiUserLine className="text-6xl mb-6 text-purple-500" />
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose Votify?
            </h3>
            <p className="text-lg md:text-xl mb-6">
              Votify offers a user-friendly interface, secure voting process,
              and real-time results, ensuring a seamless and trustworthy voting
              experience for all students. With Votify, students can make
              informed decisions and contribute to the growth and development of
              their university community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
