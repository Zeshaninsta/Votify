import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Admin/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  RiUserFill,
  RiSettingsFill,
  RiLogoutBoxFill,
  RiDashboardFill,
} from "react-icons/ri"; // Import icons
import Userprofile from "./userProfile";

const Profile = ({ onClose }) => {
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const profileRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "userdb", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userDataFromFirestore = userSnap.data();
            setUserData(userDataFromFirestore);
          } else {
            setError("User document not found");
            navigate("/login"); // Redirect to login page if user document not found
          }
        } catch (error) {
          setError("Error fetching user data: " + error.message);
        } finally {
          setLoading(false);
        }
      } else {
        // If currentUser is null, redirect to login page
        navigate("/login");
      }
    };

    fetchUserData();
  }, [currentUser, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      onClose();
    } catch (error) {
      setError("Failed to log out: " + error.message);
    }
  };

  return (
    <div className="relative w-full">
      {currentUser && ( // Check if currentUser is not null
        <div className="absolute top-0 right-5">
          <div
            ref={profileRef}
            className="bg-gray-900 bg-opacity-50 rounded-xl lg:h-[300px] lg:w-[200px] flex items-center flex-col"
          >
            <div className="flex justify-between p-2 w-full bg-gray-300 ">
              <div className="flex flex-col justify-start items-start overflow-hidden truncate">
                {userData && (
                  <>
                    <h3 className="text-lg font-semibold">
                      {userData.firstName} {userData.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 cursor-pointer">
                      {userData.email}
                    </p>
                  </>
                )}
              </div>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="w-full p-2 h-full flex justify-start items-start flex-col text-md gap-5">
              <li className="flex items-center">
                <RiUserFill className="h-6 w-6 mr-2 text-gray-400" />
                <Link
                  to="/userProfile"
                  className="text-gray-600 hover:underline"
                >
                  Profile
                </Link>
              </li>
              <li className="flex items-center">
                <RiSettingsFill className="h-6 w-6 mr-2 text-gray-400" />
                <Link
                  to="/userProfile"
                  className="text-gray-600 hover:underline"
                >
                  Account
                </Link>
              </li>
              <li className="flex items-center">
                <RiDashboardFill className="h-6 w-6 mr-2 text-gray-400" />
                <Link
                  to="/userProfile"
                  className="text-gray-600 hover:underline"
                >
                  Dashboard
                </Link>
              </li>
              <span className="w-full h-[1px] bg-gray-300"></span>
              <li className="flex items-center">
                <RiLogoutBoxFill className="h-6 w-6 mr-2 text-gray-400 cursor-pointer" />
                <span
                  className="text-gray-600 hover:underline cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
