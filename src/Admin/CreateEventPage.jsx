import React, { useState } from "react";
import { db } from "../Admin/firebase"; // Import Firebase database
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import Firebase storage related functions
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventPage = () => {
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPicture, setEventPicture] = useState(null); // Store the file object
  const [eventPlace, setEventPlace] = useState("");

  const handleEventCreation = async () => {
    try {
      // Initialize Firebase storage
      const storage = getStorage();

      // Check if eventPicture is not null
      if (eventPicture) {
        // Create a storage reference with a unique name
        const storageRef = ref(storage, `event_images/${eventPicture.name}`);

        // Upload the file to the storage reference
        await uploadBytes(storageRef, eventPicture);

        // Get the download URL of the uploaded image
        const eventPictureURL = await getDownloadURL(storageRef);

        // Add event to Firestore collection
        await addDoc(collection(db, "events"), {
          eventName,
          eventDate,
          eventDescription,
          eventPicture: eventPictureURL,
          eventPlace,
        });

        // Clear input fields after adding event
        setEventName("");
        setEventDate("");
        setEventDescription("");
        setEventPicture(null);
        setEventPlace("");

        toast.success("Event created successfully!");
      } else {
        // Handle case where no event picture is selected
        toast.error("Please select an event picture.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-5">
      <div className="max-w-lg w-full p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create Event</h1>
        <div className="space-y-4 flex justify-center items-center gap-5 flex-col">
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="input-field w-full p-2"
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="input-field w-full p-2"
          />
          <input
            type="text"
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="input-field w-full p-2"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEventPicture(e.target.files[0])}
              className="hidden"
              id="eventPictureInput"
            />
            <label
              htmlFor="eventPictureInput"
              className="cursor-pointer block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload Event Picture
            </label>
            {eventPicture && (
              <p className="text-sm mt-2">Selected File: {eventPicture.name}</p>
            )}
          </div>
          <input
            type="text"
            placeholder="Event Place"
            value={eventPlace}
            onChange={(e) => setEventPlace(e.target.value)}
            className="input-field w-full p-2"
          />
          <button
            onClick={handleEventCreation}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Event
          </button>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default EventPage;
