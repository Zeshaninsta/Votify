import React, { useState, useEffect } from "react";
import { FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BiMessageAdd } from "react-icons/bi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { IoIosPaper } from "react-icons/io";
import { IoIosListBox } from "react-icons/io";
import AddUser from "./AddUser";
import ManageUser from "./ManageUser";
import { db } from "../Admin/firebase";
import { getDoc, doc } from "firebase/firestore";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import UserInfo from "./userInfo";
import CreateNewVoting from "./createNewVote";
import ShowVoting from "./showVoting";
import CreateEvent from "./CreateEventPage";
import CreateAPost from "../User/CreateAPost";
import Posts from "../pages/Posts";

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  const Navigation = useNavigate();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [clickedComponent, setClickedComponent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "userdb", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            Navigation("/");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        Navigation("/");
      }
    };

    fetchUserData();
  }, [currentUser, Navigation]);

  useEffect(() => {
    if (userData && currentUser) {
      if (userData.role === "admin") {
        Navigation("/admin");
      } else {
        Navigation("/");
      }
    }
  }, [userData, currentUser, Navigation]);

  const handleComponentClick = (component) => {
    setClickedComponent(component);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      setError("Failed to log out: " + error.message);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-[350px] bg-[#0b101b] p-4 flex flex-col justify-between items-center">
        <div>
          <h2 className="text-3xl font-rob font-bold mb-4 text-white">
            Admin Dashboard
          </h2>
          <img
            className="w-20 h-20 bg-gray-200 rounded-full m-auto object-cover"
            src={userData ? userData.profileImage : "placeholder_image_url"}
            alt="Profile"
          />
          <h1 className="text-white text-center mb-10 mt-2">
            {userData ? userData.firstName : ""}
          </h1>
          <ul className="flex flex-col justify-start w-full items-start gap-2">
            <li className="text-white bg-slate-700 p-2 w-full rounded-lg">
              <button
                className="flex justify-center items-center gap-1 hover:underline"
                onClick={() => handleComponentClick("userinfo")}
              >
                <FaUsers className="mr-2" /> Home
              </button>
            </li>
            <li className="text-white bg-slate-700 p-2 w-full rounded-lg">
              <button
                className="flex justify-center items-center gap-1 hover:underline"
                onClick={() => handleComponentClick("adduser")}
              >
                <AiOutlinePlus className="mr-2" /> Add User
              </button>
            </li>
            <li className="text-white bg-slate-700 p-2 w-full rounded-lg">
              <button
                className="flex justify-center items-center gap-1 hover:underline"
                onClick={() => handleComponentClick("manageuser")}
              >
                <FaUsers className="mr-2" /> Manage User
              </button>
            </li>
            <li className="text-white bg-slate-700 p-2 w-full rounded-lg">
              <button
                className="flex justify-center items-center gap-1 hover:underline"
                onClick={() => handleComponentClick("newvote")}
              >
                <BiMessageAdd className="mr-2" /> Create Voting
              </button>
            </li>
            <li className="text-white bg-slate-700 p-2 w-full rounded-lg">
              <button
                className="flex justify-center items-center gap-1 hover:underline"
                onClick={() => handleComponentClick("showvoting")}
              >
                <HiOutlineDocumentText className="mr-2" /> Show Voting
              </button>
            </li>
            <li className="text-white bg-slate-700 p-2 w-full rounded-lg">
              <button
                className="flex justify-center items-center gap-1 hover:underline"
                onClick={() => handleComponentClick("createevent")}
              >
                <IoIosPaper className="mr-2" /> Create Event
              </button>
            </li>
            <li className="text-white bg-slate-700 p-2 w-full rounded-lg">
              <button
                className="flex justify-center items-center gap-1 hover:underline"
                onClick={() => handleComponentClick("posts")}
              >
                <IoIosListBox className="mr-2" /> Post
              </button>
            </li>
            {/* Other list items */}
          </ul>
        </div>
        <button
          className="text-red-500 hover:underline flex justify-center items-center gap-1 "
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
      <div className="w-3/4 p-4">
        {!clickedComponent ? (
          <div>{currentUser && <UserInfo />}</div>
        ) : (
          <div>
            {" "}
            {clickedComponent === "userinfo" && <UserInfo />}
            {clickedComponent === "adduser" && <AddUser />}
            {clickedComponent === "manageuser" && <ManageUser />}
            {clickedComponent === "newvote" && <CreateNewVoting />}
            {clickedComponent === "showvoting" && <ShowVoting />}
            {clickedComponent === "createevent" && <CreateEvent />}
            {clickedComponent === "createpost" && <CreateAPost />}
            {clickedComponent === "posts" && <Posts />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
