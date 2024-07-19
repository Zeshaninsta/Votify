import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Admin/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  RiUserFill,
  RiSettingsFill,
  RiLogoutBoxFill,
  RiDashboardFill,
} from "react-icons/ri"; // Import icons

const Notification = ({ onClose }) => {
  const history = useNavigate();
  const NotificationRef = useRef();
  const { currentUser, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isNewUser, setIsNewUser] = useState(null); // State to track whether the user is new or returning

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, "userdb", currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userDataFromFirestore = userSnap.data();
            setUserData(userDataFromFirestore);
            // Check if the user has already logged in before
            setIsNewUser(userDataFromFirestore ? false : true);
          } else {
            setError("User document not found");
          }
        } catch (error) {
          setError("Error fetching user data: " + error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      Navigate("/login");
    } catch (error) {
      setError("Failed to log out: " + error.message);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        NotificationRef.current &&
        !NotificationRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="relative w-full">
      <div
        ref={NotificationRef}
        className="absolute top-0 right-5 flex items-center justify-center bg-gray-200"
      >
        <div className=" rounded-xl lg:h-[400px] lg:w-[300px] flex items-center flex-col">
          <div className="flex justify-between p-2 w-full  ">
            <div className="flex flex-col justify-start items-start">
              {userData && (
                <>
                  <h3 className="text-lg font-semibold">
                    {userData.firstName}
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
            <li className="flex items-center justify-center text-center w-full">
              <p className="text-xl text-center text-black flex justify-center items-center w-full m-auto">
                {currentUser &&
                  isNewUser !== null &&
                  (isNewUser
                    ? `Welcome ${userData && userData.firstName}`
                    : `Welcome back, ${userData && userData.firstName}`)}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
