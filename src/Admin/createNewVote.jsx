import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../Admin/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  doc,
  where,
  updateDoc,
} from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewVoting = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2); // Add 2 days to the current date
    return date;
  });
  const [candidates, setCandidates] = useState([]);
  const [dateDifferenceValid, setDateDifferenceValid] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const usersCollection = collection(db, "userdb");
        const q = query(usersCollection, where("role", "==", "candidate"));
        const usersSnapshot = await getDocs(q);
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().firstName, // Assuming firstName is the field you want to use for the user's name
        }));
        setCandidates(usersData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        toast.error("Failed to fetch candidates. Please try again later.");
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    // Calculate the difference between start date and end date
    const difference = endDate.getTime() - startDate.getTime();
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000; // 2 days in milliseconds
    setDateDifferenceValid(difference >= twoDaysInMillis);
  }, [startDate, endDate]);

  const handleCreateVoting = async () => {
    // Check if all necessary fields are filled
    if (!dateDifferenceValid || candidates.length === 0) {
      toast.error("Please fill in all necessary fields.");
      return;
    }

    try {
      // Update each candidate's vote count and voting dates in the 'userdb' collection
      await Promise.all(
        candidates.map(async (candidate) => {
          const userDocRef = doc(db, "userdb", candidate.id);
          await updateDoc(userDocRef, {
            votes: 0,
            votingStartDate: startDate,
            votingEndDate: endDate,
          });
        })
      );

      toast.success("Voting created successfully!");

      // Reset form fields
      setStartDate(new Date());
      setEndDate(new Date());
      setCandidates([]);
    } catch (error) {
      console.error("Error creating voting:", error);
      toast.error("Failed to create voting. Please try again later.");
    }
  };

  return (
    <div className="container mx-auto py-10 w-full">
      <h2 className="text-2xl font-bold mb-4">Create New Voting</h2>
      <div className="w-full flex justify-center items-center flex-col">
        <div className="w-full flex justify-start items-start flex-col">
          <label className="block text-gray-700 font-bold">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="border border-gray-300 px-3 py-2 rounded-md mt-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full flex justify-start items-start flex-col">
          <label className="block text-gray-700 font-bold w-full">
            End Date:
          </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            showTimeSelect
            dateFormat="MMMM d, yyyy h:mm aa"
            className="w-full border border-gray-300 px-3 py-2 rounded-md mt-2 focus:outline-none focus:border-blue-500"
            disabled={!dateDifferenceValid}
          />
          {!dateDifferenceValid && (
            <p className="text-red-500">
              You can't create a voting for less than 2 days.
            </p>
          )}
        </div>

        <label className="block text-gray-700 font-bold">Candidates:</label>
        <div className="text-black w-full flex flex-col justify-start items-start gap-5">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="w-full border border-slate-300 p-5 gap-5 flex flex-col bg-gray-400 text-gray-900"
            >
              <span>{candidate.name}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleCreateVoting}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          disabled={!dateDifferenceValid}
        >
          Create Voting
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateNewVoting;
