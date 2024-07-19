import React, { useState, useEffect } from "react";
import { db } from "../Admin/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const DisplayWinner = () => {
  const [candidates, setCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const usersCollection = collection(db, "userdb");
        const q = query(
          usersCollection,
          where("role", "==", "candidate"),
          orderBy("votes", "desc"),
          limit(3)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const candidatesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setCandidates(candidatesData);
          setIsLoading(false);
        });
        return () => unsubscribe(); // Ensure to call unsubscribe when component unmounts
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setIsLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  // Function to calculate the total votes count
  const getTotalVotes = () => {
    return candidates.reduce((total, candidate) => total + candidate.votes, 0);
  };

  return (
    <div className="w-full bg-slate-900">
      <div className="w-full flex flex-col justify-center items-center text-white">
        <h1 className="text-3xl font-bold mb-8">Election Process</h1>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col lg:w-[80%] gap-5 justify-center items-center w-full p-8 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
            {candidates.map((candidate, index) => (
              <div key={candidate.id} className="w-full mb-4">
                <p className="text-lg">{`${index + 1} - ${
                  candidate.firstName
                }: ${candidate.votes} votes`}</p>
                {/* Progress bar to visualize the vote count */}
                <div className="w-full bg-gray-600 rounded-md mt-2 flex justify-center items-center">
                  <div
                    className="bg-green-500 h-[40px] text-xs leading-none flex justify-center items-center py-1 text-center text-white rounded-md"
                    style={{
                      width: `${(candidate.votes / getTotalVotes()) * 100}%`,
                    }}
                  >
                    {candidate.votes} Votes
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayWinner;
