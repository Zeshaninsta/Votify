import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../Admin/firebase"; // Import your Firebase Firestore instance
import { collection, doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import defaultUserIcon from "../Asset/images/user.png";
import { uploadProfilePicture } from "../User/uploadProfilePicture";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("user");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [profilePicture, setProfilePicture] = useState(defaultUserIcon); // State for profile picture
  const [error, setError] = useState("");

  // Initialize Firebase Storage
  const storage = getStorage();

  const handleSubmit = async () => {
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
      });

      // Upload profile picture if selected
      if (profilePicture !== defaultUserIcon) {
        // Only upload if not default icon
        await uploadProfilePicture(user, profilePicture); // Use the imported function
      }
      await auth.signOut();
      // Clear form fields and errors
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setGender("");
      setRole("user");
      setDateOfBirth("");
      setProfilePicture(defaultUserIcon); // Reset profile picture state
      setError("");
      toast.success("User added successfully!");
    } catch (error) {
      setError(error.message);
      console.error("Error adding user:", error);
      if (error.code === "auth/email-already-in-use") {
        toast.error(
          "Email is already registered. Please use a different email."
        );
      } else {
        toast.error("Error adding user. Please try again later.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Add User</h1>
      <div className="space-y-4">
        <div className="flex space-x-4 items-center">
          <div className="flex-1 object-cover">
            <label htmlFor="profileImage" className="block mb-1">
              Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="profileImage"
              className="cursor-pointer object-cover"
            >
              <img
                src={profilePicture}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            </label>
          </div>
          <div className="flex-1">
            <label htmlFor="firstName" className="block mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="border border-gray-300 rounded px-3 py-1 w-full"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="role" className="block mb-1">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-1 w-full"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddUser;
