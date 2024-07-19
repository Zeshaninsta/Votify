import React, { useState } from "react";
import { db } from "../Admin/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the useAuth hook
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage-related functions from Firebase Storage
import { uploadProfilePicture } from "../User/uploadProfilePicture";
import VerificationPage from "../User/verificationPage";

const SignUp = () => {
  const { currentUser } = useAuth(); // Get the currentUser from the AuthContext
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("user");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState(1);
  const Navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null); // State for profile picture

  const handleSignUp = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: firstName + " " + lastName,
      });

      // Add user information to Firestore database
      await setDoc(doc(db, "userdb", user.uid), {
        role: role,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        dateOfBirth: dateOfBirth,
        createdAt: new Date(),
        department: department,
      });

      // Upload profile picture if selected
      if (profilePicture) {
        await uploadProfilePicture(user, profilePicture); // Use the imported function
      }

      // Sign out the user after account creation
      await auth.signOut();
      Navigate("/login");

      // Clear form fields and errors
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setGender("");
      setRole("user");
      setDateOfBirth("");
      setDepartment("");
      setProfilePicture(null); // Reset profile picture state
      setError("");
      // Navigate(`/verify-email?email=${email}`); // Redirect to email verification page
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNext = () => {
    setActiveTab(2);
  };

  const handlePrevious = () => {
    setActiveTab(1);
  };

  // Prevent signup if a user is already logged in
  // if (currentUser) {
  //   return <div>You are already logged in.</div>;
  // }

  return (
    <div className="w-full bg-[#0b101b] min-h-screen p-2 flex justify-center items-center flex-col">
      <div className="lg:w-[70%] flex flex-col justify-center items-center">
        <h1 className="text-7xl font-sedan w-full text-white text-center mb-2">
          Welcome
        </h1>
        <p className="text-white font-sedan text-xl mb-2">
          Sign up now to harness the power of cutting-edge pneumonia detection
          from chest X-ray images
        </p>
        <div className="rounded-lg shadow-md flex justify-between items-center w-full border border-slate-700 p-5  relative">
          <div className="hidden lg:flex w-[50%] m-auto justify-center items-center flex-col">
            <h1 className="font-pro text-4xl font-bold mb-2 text-transparent bg-gradient-to-t from-gray-400 to-white bg-clip-text ">
              Votify
            </h1>
            <h1 className="font-bold font-pro text-2xl text-transparent bg-gradient-to-t from-gray-400 to-white bg-clip-text mb-2 z-20">
              Experience the Power of Real-Time Voting
            </h1>
            <p className="font-rob text-sm text-center text-gray-400 w-[75%] m-auto ">
              Join Votify and participate in the latest polls to make your voice
              heard.
            </p>
          </div>
          <div className="flex justify-center items-center w-full lg:w-[50%] m-auto bg-[#dfdfdf]  rounded-xl">
            <div className="bg-transparent backdrop-blur-md border border-slate-700 relative p-8 flex flex-col rounded-xl w-full justify-center items-center z-30 ">
              {/* <div className="w-[100px] h-[100px] bg-red-500 rounded-full absolute top-10 left-10 blur-2xl opacity-70 -z-10"></div>
              <div className="w-[100px] h-[100px] bg-blue-500 rounded-full absolute bottom-10 right-10 blur-2xl opacity-70 -z-10"></div> */}
              <h2 className="text-2xl font-bold mb-4 font-pro text-[#3b82f6]">
                Sign-Up
              </h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {activeTab === 1 && (
                <div className="w-full flex flex-col">
                  <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-semibold mb-1 text-[#3b82f6]"
                    >
                      First Name:
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-[#c7cfdd]  w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-semibold mb-1 text-[#3b82f6]"
                    >
                      Last Name:
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className=" bg-[#c7cfdd]  w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-1 text-[#3b82f6]"
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#c7cfdd] w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold mb-1 text-[#3b82f6]"
                    >
                      Password:
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-[#c7cfdd] w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
              {activeTab === 2 && (
                <div className="w-full">
                  <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                    <label
                      htmlFor="Department"
                      className="block text-sm font-semibold mb-1 text-[#3b82f6]"
                    >
                      Department:
                    </label>
                    <input
                      id="department"
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="bg-[#c7cfdd] w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-semibold mb-1 text-[#3b82f6]"
                    >
                      Gender:
                    </label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="bg-[#c7cfdd] w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="" className="text-[#3b82f6]">
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-semibold mb-1 text-[#3b82f6]"
                    >
                      Date of Birth:
                    </label>
                    <input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="bg-[#c7cfdd]  w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}
              <div className="mb-4 flex justify-center items-center w-full gap-2 flex-col">
                {activeTab === 1 && (
                  <button
                    onClick={handleNext}
                    className="bg-blue-400 w-full lg:w-[80%] m-auto text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Next
                  </button>
                )}
                {activeTab === 2 && (
                  <button
                    onClick={handleSignUp}
                    className="bg-blue-400 w-full lg:w-[80%] m-auto text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Sign Up
                  </button>
                )}
                {activeTab === 2 && (
                  <button
                    onClick={handlePrevious}
                    className="bg-gray-400 w-full lg:w-[80%] m-auto text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    Previous
                  </button>
                )}
                <div className="flex justify-center items-center gap-2">
                  <h3>Do you have an account?</h3>
                  <Link to="/login">
                    {" "}
                    <button className=" text-blue-700 border-b border-blue-700 animate-bounce font-pro duration-1000">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
