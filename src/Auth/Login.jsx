import React, { useState } from "react";
import { db } from "../Admin/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import ShowIcon from "../Asset/images/show.png";
import HideIcon from "../Asset/images/hide.png";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const Navigation = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const preFilledEmail = queryParams.get("email");
  const [email, setEmail] = useState(preFilledEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user data from Firestore to get the role
      const userDoc = await getDoc(doc(db, "userdb", user.uid));
      const userData = userDoc.data();

      if (userData) {
        // Redirect based on user role
        if (userData.role === "admin") {
          // Redirect to Admin Dashboard
          Navigation("/admin");
        }
        if (userData.role === "candidate") {
          // Redirect to Admin Dashboard
          Navigation("/createpost");
        } else {
          // Redirect to Home page for users
          Navigation("/");
        }
      } else {
        // Handle case where user data is not found
        setError("User data not found");
        setSuccessMessage("");
      }

      // Clear form fields and errors
      setEmail("");
      setPassword("");
      setError("");
      setSuccessMessage("Login successful!");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent. Check your inbox!");
      setError("");
    } catch (error) {
      setError(error.message);
      setSuccessMessage("");
    }
  };
  return (
    <div className="w-full bg-[#0b101b] min-h-screen p-2 flex justify-center items-center flex-col">
      <div className="w-full lg:w-[70%] flex-col m-auto p-2 lg:p-8 flex relative justify-between items-center">
        <h1 className="text-7xl font-sedan w-full text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-white font-sedan mb-2 text-xl">
          Securely enter your credentials to unlock a world of possibilities
        </p>
        <div className="rounded-lg flex justify-between items-center w-full border border-slate-700 p-8 relative">
          {/*Left side */}
          <div className="hidden lg:flex w-[50%] m-auto justify-center items-center flex-col h-full">
            <div className="rounded-lg flex justify-between items-center w-full p-5  relative">
              <div className="hidden lg:flex w-[50%] m-auto justify-center items-center flex-col">
                <h1 className="font-pro text-4xl font-bold mb-2 text-transparent bg-gradient-to-t from-gray-400 to-white bg-clip-text ">
                  Votify
                </h1>
                <h1 className="font-bold font-pro text-2xl text-transparent bg-gradient-to-t text-center from-gray-400 to-white bg-clip-text mb-2 z-20">
                  Experience the Power of Real-Time Voting
                </h1>
                <p className="font-rob text-sm text-center text-gray-400 w-[75%] m-auto ">
                  Join Votify and participate in the latest polls to make your
                  voice heard.
                </p>
              </div>
            </div>
          </div>
          {/* Login */}
          <div className="bg-[#dfdfdf] flex justify-center items-center w-full lg:w-[50%] m-auto rounded-xl ">
            <div className="bg-transparent backdrop-blur-md border border-slate-700 relative p-8 flex flex-col rounded-xl w-full justify-center items-center z-30 ">
              {/* <div className="w-[100px] h-[100px] bg-red-500 rounded-full absolute top-10 left-10 blur-2xl opacity-70 -z-10"></div>
              <div className="w-[100px] h-[100px] bg-blue-500 rounded-full absolute bottom-10 right-10 blur-2xl opacity-70 -z-10"></div> */}
              <h2 className="text-2xl text-[#3b82f6] font-pro mb-4">Login</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              {successMessage && (
                <p className="text-green-500 mb-4">{successMessage}</p>
              )}
              <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                <label className="block text-[#3b82f6] mb-1">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#c7cfdd] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4 w-full lg:w-[80%] m-auto p2">
                <label className="block text-[#3b82f6] mb-1">Password:</label>
                <div className="flex justify-center items-center m-auto relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" w-full bg-[#c7cfdd] px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 relative"
                  />
                  <img
                    src={showPassword ? ShowIcon : HideIcon}
                    alt={showPassword ? "Hide Password" : "Show Password"}
                    className="w-[20px] lg:w-[30px] absolute right-3 top-3 lg:top-2 cursor-pointer "
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <div className="mb-4 flex flex-col justify-center items-center w-full gap-2">
                <button
                  onClick={handleLogin}
                  className="bg-blue-400 w-full lg:w-[80%] m-auto text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={handleForgotPassword}
                  className="bg-gray-500 w-full lg:w-[80%] m-auto text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                >
                  Forgot Password
                </button>
              </div>
              <div className="flex justify-center items-center gap-2">
                <h3>Don't have an account?</h3>
                <Link to="/signup">
                  {" "}
                  <button className=" text-blue-700 border-b border-blue-700 animate-bounce font-pro duration-1000">
                    {" "}
                    Signup
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
