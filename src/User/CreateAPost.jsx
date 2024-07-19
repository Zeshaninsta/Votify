import React, { useState, useRef, useEffect } from "react";
import { db, storage } from "../Admin/firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FaImage } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const CreateAPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const { currentUser } = useAuth();
  const Navigate = useNavigate();
  const userRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
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

  if (currentUser && userData && userData.role !== "candidate") {
    // Redirect to Admin Dashboard
    Navigate("/");
    return null;
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const storageRef = ref(storage, `candidate_posts/${image.name}`);

      await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(storageRef);

      // Check if currentUser is defined
      if (currentUser) {
        const postRef = await addDoc(collection(db, "candidates"), {
          title,
          description,
          imageUrl: downloadURL,
          userId: currentUser.uid, // Associate the post with the current user's ID
          userName: currentUser.displayName, // Associate the post with the current user's name
          userProfileImage: currentUser.photoURL, // Associate the post with the current user's profile image URL
        });

        console.log("Post added with ID: ", postRef.id);

        setTitle("");
        setDescription("");
        setImage(null);

        setLoading(false);
        alert("Post added successfully!");
      } else {
        console.error("Error adding post: currentUser is undefined");
        setLoading(false);
        alert("Failed to add post. User data is missing. Please try again.");
      }
    } catch (error) {
      console.error("Error adding post: ", error);
      setLoading(false);
      alert("Failed to add post. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="container mx-auto flex justify-center items-center flex-col lg:h-screen px-4 py-8 bg-white rounded-lg w-[80%] m-auto border border-slate-300">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create a Post
        </h1>
        <div className="max-w-md mx-auto">
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="imageInput"
            />
            <label
              htmlFor="imageInput"
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer inline-flex items-center"
            >
              <FaImage className="mr-2" /> Upload Image
            </label>
            {image && (
              <p className="text-sm mt-2">Selected Image: {image.name}</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field w-full mb-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none input-field w-full mb-4 h-32 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          ></textarea>
          <button
            onClick={handleSubmit}
            className={`${
              loading ? "opacity-50 cursor-not-allowed" : ""
            } bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded`}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAPost;
