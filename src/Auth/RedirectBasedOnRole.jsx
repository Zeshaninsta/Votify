import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RedirectBasedOnRole = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === "admin") {
        // Redirect to Admin Dashboard
        navigate("/admin");
      } else {
        // Redirect to Home page for users
        navigate("/home");
      }
    }
  }, [currentUser, navigate]);

  return null;
};

export default RedirectBasedOnRole;
