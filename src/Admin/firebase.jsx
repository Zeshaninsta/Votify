// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const app = initializeApp({
  apiKey: "AIzaSyBRg7IF0h18Ojv_Ed5O5Yz38rUlLGkB2KU",
  authDomain: "studentunionvotingapp-488bd.firebaseapp.com",
  projectId: "studentunionvotingapp-488bd",
  storageBucket: "studentunionvotingapp-488bd.appspot.com",
  messagingSenderId: "605205179267",
  appId: "1:605205179267:web:f4d8f957270df2842c64b6",
  measurementId: "G-R7GWKWY0VX",
});

// Initialize Firebase
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { db, storage, analytics, auth };
