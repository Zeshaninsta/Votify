import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Auth/Signup";
import Login from "./Auth/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RedirectBasedOnRole from "./Auth/RedirectBasedOnRole";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Vote from "./Admin/showVoting";
import AdminDashboard from "./Admin/AdminDashboard";
import Userprofile from "./User/userProfile";
import Footer from "./pages/Footer";
import EventPage from "./pages/ShowEventPage";
import CreateAPost from "./User/CreateAPost";
import VerificationPage from "./User/verificationPage";

function App() {
  return (
    <div className="flex flex-col bg-white min-h-screen bg-white to-blue-900">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/vote" element={<Vote />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
        <Route exact path="/userprofile" element={<Userprofile />} />
        <Route exact path="/events" element={<EventPage />} />
        <Route exact path="/createpost" element={<CreateAPost />} />
        <Route exact path="/verificationpage" element={<VerificationPage />} />


      </Routes>
      <Footer />
    </div>
  );
}

export default App;
