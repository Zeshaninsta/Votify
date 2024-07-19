import React, { useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Asset/images/votify.png";
import Profile from "../User/profile";
import { useAuth } from "../contexts/AuthContext";
import { FaBell } from "react-icons/fa";
import Notification from "../User/Notification";
import { db } from "../Admin/firebase";
import { toast } from "react-toastify";
import Button from "../components/NavButton";
import ShowVoting from "../Admin/showVoting";
import CreateEventPage from "../Admin/CreateEventPage";

const Nav = () => {
  const { currentUser } = useAuth() || {};
  const [userData, setUserData] = useState(null);
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [redNotification, setRedNotification] = useState(true);
  const [notificationSeen, setNotificationSeen] = useState(false);
  const userRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
    setRedNotification(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          userRef.current = doc(db, "userdb", currentUser.uid);
          const userSnap = await getDoc(userRef.current);
          if (userSnap.exists()) {
            const userDataFromFirestore = userSnap.data();
            setUserData(userDataFromFirestore);
          } else {
            toast.error("User Document not found");
          }
        } catch (error) {
          toast.error("Error fetching user data:", error.message);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div
      className={`w-full font-rob z-50 relative bg-[#111827] shadow-sm border-b border-gray-900 ${
        scrolling ? "shadow-md" : ""
      }`}
    >
      <div className="px-5 py-4 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2">
          <img src={Logo} alt="Logo" className="w-[30px] lg:w-[50px]" />
          <h1 className="font-pro text-md lg:text-2xl p-2 rounded-md cursor-pointer">
            Votify
          </h1>
        </div>
        {/* Hamburger Menu (Mobile) */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-200 hover:border-blue-200"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {/* Links (Desktop and Large Screens) */}
        <div className="hidden lg:flex justify-center items-center gap-5 border border-slate-500 px-4 py-2 rounded-full">
          <Link
            to="/home"
            className={`${
              location.pathname === "/home" ? "border-b border-green-400" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/vote"
            className={`${
              location.pathname === "/vote" ? "border-b border-green-400" : ""
            }`}
          >
            Vote
          </Link>
          <Link
            to="/events"
            className={`${
              location.pathname === "/events" ? "border-b border-green-400" : ""
            }`}
          >
            Event
          </Link>
          {currentUser && userData && userData.role === "candidate" && (
            <Link
              to="/createpost"
              className={`${
                location.pathname === "/createpost"
                  ? "border-b border-green-400"
                  : ""
              }`}
            >
              Create Post
            </Link>
          )}
          {currentUser && userData && userData.role === "admin" && (
            <Link
              to="/admin"
              className={`${
                location.pathname === "/showblog"
                  ? "border-b border-green-400"
                  : ""
              }`}
            >
              Admin Dashboard
            </Link>
          )}
        </div>
        {/* Mobile Menu */}
        {showMenu && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-gradient-to-r from-[#14183b] via-[#101131] to-[#14183b] text-white p-2">
            <div className="flex justify-center items-center gap-2 mb-10">
              {!currentUser && (
                <>
                  <Link to="/login">
                    <button className="border border-slate-700 rounded-full p-2 text-white font-semibold w-[100px]">
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <Button text="Signup" />
                  </Link>
                </>
              )}
            </div>
            {currentUser && (
              <div className="flex justify-center items-center mb-5 flex-col">
                <button
                  onClick={toggleProfile}
                  className="border rounded-full w-[50px] h-[50px] text-sm flex justify-center items-center border-slate-500  "
                >
                  <img
                    src={userData && userData.profileImage}
                    alt="userprofile"
                    className="w-full rounded-full object-cover"
                  />
                </button>
                <h1 className="mt-2">{userData && userData.firstName}</h1>
              </div>
            )}
            <div className="border border-slate-500 px-4 py-2 ">
              <Link to="/home" className="block border-b border-slate-500">
                Home
              </Link>
              <Link to="/vote" className="block border-b border-slate-500">
                vote
              </Link>
              <Link to="/events" className="block border-b border-slate-500">
                Event
              </Link>
              {currentUser && userData && userData.role === "candidate" && (
                <Link
                  to="/createpost"
                  className="block border-b border-slate-500"
                >
                  Create A Post
                </Link>
              )}
              {currentUser && userData && userData.role === "admin" && (
                <Link to="/admin" className="block border-b border-slate-500">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
        )}
        {/* Buttons */}
        <div className="hidden lg:flex justify-around items-center gap-5 z-10">
          {!currentUser && (
            <>
              <Link to="/login">
                <button className="border border-slate-700 rounded-full p-2 text-white font-semibold w-[100px]">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <Button text="Signup" />
              </Link>
            </>
          )}
          {currentUser && (
            <>
              <div className="relative">
                <FaBell
                  onClick={toggleNotification}
                  className="text-2xl cursor-pointer"
                />
                {!notificationSeen && (
                  <div className="w-[10px] h-[10px] bg-red-500 absolute top-0 right-0 rounded-full"></div>
                )}
              </div>
              <button
                onClick={toggleProfile}
                className="border rounded-full w-[50px] h-[50px] text-sm flex justify-center items-center border-slate-500 "
              >
                <img
                  src={userData && userData.profileImage}
                  alt="userprofile"
                  className="w-full rounded-full"
                />
              </button>
            </>
          )}
        </div>
      </div>
      {showProfile && <Profile onClose={toggleProfile} />}
      {showNotification && <Notification onClose={toggleNotification} />}
    </div>
  );
};

export default Nav;
