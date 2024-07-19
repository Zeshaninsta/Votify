import React, { useEffect, useState } from "react";
import { db } from "../Admin/firebase";
import {
  collection,
  onSnapshot,
  query,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "candidates"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const fetchedPosts = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedPosts.push({ id: doc.id, ...data });
          });
          setPosts(fetchedPosts);
        });
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No Posts Found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600">{post.description}</p>
                <p className="text-gray-500 mt-2">Posted by: {post.userName}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
