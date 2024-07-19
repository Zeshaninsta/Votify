import React from "react";
import { FaSignInAlt, FaVoteYea, FaCheck, FaCalendarAlt } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-20 text-black">
      <div className="container mx-auto px-6 md:px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-pro">
          How It Works
        </h2>
        <p className="text-xl text-center mb-10">
          Follow these steps to make your voice heard:
        </p>
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="flex justify-evenly flex-col items-center gap-10 lg:flex-row ">
            {/* Step 1: Login */}
            <div className="flex flex-col items-center justify-center border border-blue-600 p-2 lg:w-[500px] lg:h-[200px] cursor-pointer">
              <FaSignInAlt className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">1. Login</h3>
              <p className="text-lg text-gray-700 text-center">
                Log in to your account using your credentials.
              </p>
            </div>
            {/* Step 2: Access Voting Page */}
            <div className="flex flex-col items-center justify-center border border-blue-600 p-2 lg:w-[500px] lg:h-[200px] cursor-default">
              <FaVoteYea className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                2. Access Voting Page
              </h3>
              <p className="text-lg text-gray-700 text-center">
                Navigate to the voting page where you can see the list of
                candidates.
              </p>
            </div>
          </div>
          {/* Step 3: Vote */}
          <div className="flex justify-evenly items-center gap-10 flex-col lg:flex-row">
            {/* Step 3: Select Candidates */}
            <div className="flex flex-col items-center justify-center border border-blue-600 p-2 lg:w-[500px] lg:h-[200px] cursor-pointer">
              <FaCheck className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                3. Select Candidates
              </h3>
              <p className="text-lg text-gray-700 text-center">
                Check the box next to your chosen candidate's name.
              </p>
            </div>
            {/* Step 4: Check Election Dates */}
            <div className="flex flex-col items-center justify-center border border-blue-600 p-2 lg:w-[500px] lg:h-[200px] cursor-pointer">
              <FaCalendarAlt className="text-4xl text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                4. Check Election Dates
              </h3>
              <p className="text-lg text-gray-700 text-center">
                Make sure to check the start and end dates of the election.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
