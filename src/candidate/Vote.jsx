import React, { useState, useEffect } from "react";
import { db } from "../Admin/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import ConfirmationModal from "./ConfirmationModal";
import { useAuth } from "../contexts/AuthContext";

// Your imports...

const Vote = () => {
  const { currentUser } = useAuth();
  const [votings, setVotings] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  // Define the calculateTimeRemaining function
  const calculateTimeRemaining = (endDate) => {
    // Your implementation here
  };

  useEffect(() => {
    const fetchVotings = async () => {
      try {
        const votingsCollection = collection(db, "votings");
        const votingsSnapshot = await getDocs(votingsCollection);
        const votingsData = await Promise.all(
          votingsSnapshot.docs.map(async (votingDoc) => {
            const votingData = votingDoc.data();
            const candidatesData = await Promise.all(
              votingData.candidates.map(async (candidateId) => {
                const candidateDoc = await getDoc(
                  doc(db, "userdb", candidateId)
                );
                const candidateData = candidateDoc.data();
                return { id: candidateId, ...candidateData };
              })
            );
            return {
              id: votingDoc.id,
              ...votingData,
              candidates: candidatesData,
              timeRemaining: calculateTimeRemaining(votingData.endDate),
            };
          })
        );
        setVotings(votingsData);
      } catch (error) {
        console.error("Error fetching votings:", error);
      }
    };
    fetchVotings();
  }, []);

  const handleCandidateSelection = (candidateId) => {
    if (hasVoted || !currentUser || !currentUser.uid) return;

    const isUserCandidate = votings.some((voting) =>
      voting.candidates.some((candidate) => candidate.id === currentUser.uid)
    );

    if (isUserCandidate) {
      alert("You cannot vote for yourself!");
      return;
    }

    setSelectedCandidate(candidateId);
    setIsConfirmationModalOpen(true);
  };

  const handleSubmitVote = async () => {
    if (selectedCandidate) {
      try {
        // Get the voting document based on selectedCandidate
        const votingRef = doc(db, "votings", selectedCandidate);
        const votingSnapshot = await getDoc(votingRef);

        if (votingSnapshot.exists()) {
          const votingData = votingSnapshot.data();

          // Check if the selectedCandidate is a valid index in the candidates array
          if (selectedCandidate < votingData.candidates.length) {
            // Increase the votes count for the selected candidate
            const updatedVotesArray = [...votingData.votes];
            updatedVotesArray[selectedCandidate] += 1;

            // Update the voting document with the new votes count array
            await updateDoc(votingRef, { votes: updatedVotesArray });

            // Update the current user's document to mark that they have voted
            await updateDoc(doc(db, "votings", currentUser.uid), {
              selectedCandidate,
            });

            // Notify the user that their vote has been recorded
            alert("Your vote has been recorded successfully!");
            setHasVoted(true);
          } else {
            console.error("Invalid selectedCandidate index");
            alert(
              "An error occurred while recording your vote. Please try again later."
            );
          }
        } else {
          console.error("Voting document does not exist");
          alert(
            "The selected candidate does not exist. Please choose another candidate."
          );
        }
      } catch (error) {
        console.error("Error updating vote: ", error);
        alert(
          "An error occurred while recording your vote. Please try again later."
        );
      }
    }
    setIsConfirmationModalOpen(false);
  };

  const handleCancel = () => {
    setSelectedCandidate(null);
    setIsConfirmationModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen bg-slate-900 text-black ">
      {/* Voting list */}
      <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:w-[80%] p-8 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
        {votings.map((voting) => (
          <div
            key={voting.id}
            className="bg-red-500 flex justify- items-center gap-5 w-full"
          >
            {voting.candidates.map((candidate) => (
              <div
                key={candidate.id} // Ensure unique key for each candidate
                className="flex justify-between flex-col items-center w-full p-4 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md shadow-md mb-4"
              >
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
                    Votes: {voting.votes || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Candidate selection */}
      <div className="flex flex-col justify-center items-center w-full lg:w-[80%] p-8 mt-8 rounded-lg shadow-xl bg-white bg-opacity-10 backdrop-filter backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-8">Choose Your Candidate</h1>
        {votings.map((voting) => (
          <div className="w-full" key={voting.id}>
            {voting.candidates.map((candidate) => (
              <div
                key={candidate.id} // Ensure unique key for each candidate
                className="flex justify-between items-center w-full p-4 rounded-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-md shadow-md mb-4"
              >
                <img
                  src={candidate.profileImage}
                  alt="candidate profile"
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white"
                />
                <p className="text-lg">{candidate.firstName}</p>
                <input
                  type="checkbox"
                  onChange={() => handleCandidateSelection(candidate.id)}
                  disabled={hasVoted}
                  className="w-6 h-6"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Submit button */}
      <button
        onClick={handleSubmitVote}
        disabled={!selectedCandidate || hasVoted}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Submit
      </button>
      {/* Confirmation modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        message="Are you sure you want to elect this person? This action will be undone once selected."
        onConfirm={handleSubmitVote} // Handle confirmation when submitting
        onCancel={handleCancel}
      />
    </div>
  );
};

export default Vote;
