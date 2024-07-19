import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../Admin/firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import DisplayWinner from "./DisplayWinner";
import Posts from "../pages/Posts";

const VotingList = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [remainingDays, setRemainingDays] = useState("");
  const history = useNavigate();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const usersCollection = collection(db, "userdb");
        const q = query(usersCollection, where("role", "==", "candidate"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const candidatesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            votes: doc.data().votes || 0,
          }));
          setCandidates(candidatesData);
        });
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchCandidates();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "userdb", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    if (userData && currentUser) {
      if (userData.role === "candidate") {
        setHasVoted(true);
      }
    }
  }, [userData, currentUser]);

  useEffect(() => {
    const calculateTimeRemaining = (votingEndDate) => {
      const oneSecond = 1000;
      const today = new Date();
      const end = votingEndDate.toDate();
      const difference = end - today;
      if (difference <= 0) {
        return "Voting ended";
      }
      const days = Math.floor(difference / (oneSecond * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (oneSecond * 60 * 60 * 24)) / (oneSecond * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (oneSecond * 60 * 60)) / (oneSecond * 60)
      );
      const seconds = Math.floor((difference % (oneSecond * 60)) / oneSecond);
      return `${days} days ${hours}:${minutes}:${seconds}`;
    };

    if (candidates.length > 0) {
      setStartDate(candidates[0]?.votingStartDate.toDate().toLocaleString());
      setEndDate(candidates[0]?.votingEndDate.toDate().toLocaleString());
      setRemainingDays(calculateTimeRemaining(candidates[0]?.votingEndDate));
    }

    const intervalId = setInterval(() => {
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) => ({
          ...candidate,
          timeRemaining: calculateTimeRemaining(candidate.votingEndDate),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [candidates]);

  useEffect(() => {
    if (currentUser) {
      const checkUserVoteStatus = async () => {
        try {
          const userRef = doc(db, "userdb", currentUser.uid);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.data();
          setHasVoted(userData?.voted || false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      checkUserVoteStatus();
    }
  }, [currentUser]);

  const handleCandidateSelection = (candidateId) => {
    setSelectedCandidateId(candidateId);
  };

  const handleVote = async () => {
    if (!selectedCandidateId) {
      alert("Please select a candidate to vote.");
      return;
    }

    if (hasVoted) {
      alert("You have already voted.");
      return;
    }

    try {
      const candidateRef = doc(db, "userdb", selectedCandidateId);
      await updateDoc(candidateRef, {
        votes: increment(1),
      });

      const userRef = doc(db, "userdb", currentUser.uid);
      await updateDoc(userRef, {
        voted: true,
        selectedCandidateId: selectedCandidateId,
      });

      console.log("Vote recorded successfully!");

      setHasVoted(true);
    } catch (error) {
      console.error("Error recording vote:", error);
    }
  };

  const isLoggedIn = !!currentUser;

  if (!isLoggedIn) {
    history("/login");
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-slate-900">
      <div className="w-full flex flex-col justify-center items-center text-white mb-10">
        <div className="p-6 w-[80%] m-auto bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg rounded-lg mb-10 mt-10">
          <div className="flex justify-between items-center p-5 gap-5">
            <div className="shadow-lg border border-blue-200 p-2 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-white">
                Start Date:
              </h3>
              <p className="text-sm mb-4 text-white">{startDate}</p>
            </div>
            <div>
              <h1 className="font-pro text-white text-8xl">TIME IS NOW</h1>
            </div>
            <div className="shadow-lg border border-blue-200 p-2 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-white">
                End Date:
              </h3>
              <p className="text-sm mb-4 text-white">{endDate}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-4 justify-center shadow-md h-[200px] w-[80%] m-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-8 text-white">
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold mb-2">Days Remaining:</span>
            <div className="text-7xl font-bold font-teko">{remainingDays}</div>
            <div className="text-lg mt-2 font-semibold ">until voting ends</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:w-[80%] gap-5 justify-center items-center w-full p-8 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="w-full flex flex-col items-center p-4 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md shadow-md mb-4"
            >
              <div>
                <img
                  src={candidate.profileImage}
                  alt={candidate.firstName}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white"
                />
                <div className="text-center">
                  <h2 className="text-lg font-bold">{candidate.firstName}</h2>
                  <p className="text-sm text-gray-400">
                    {candidate.department}
                  </p>
                  <p className="text-sm text-gray-400">
                    Votes: {candidate.votes || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-center items-center w-full lg:w-[80%] p-8 mt-8 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
          <h1 className="text-3xl font-bold mb-8">Choose Your Candidate</h1>
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="flex justify-between items-center w-full p-4 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md shadow-md mb-4"
            >
              <img
                src={candidate.profileImage}
                alt="candidate profile"
                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white"
              />
              <p className="text-lg">{candidate.firstName}</p>
              <input
                type="radio"
                onChange={() => handleCandidateSelection(candidate.id)}
                checked={selectedCandidateId === candidate.id}
                disabled={hasVoted || currentUser.role === "candidate"}
                className="w-6 h-6"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center w-full lg:w-[80%] p-8 mt-8 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
          <button
            onClick={handleVote}
            disabled={!selectedCandidateId || hasVoted}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>
          {currentUser && userData && userData.role === "candidate" && (
            <p className="text-red-500 mt-2">
              Since you are a candidate, you can't vote.
            </p>
          )}
        </div>
      </div>
      <div className="mt-10 mb-10">
        <DisplayWinner />
      </div>
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <Posts />
    </div>
  );
};

export default VotingList;
