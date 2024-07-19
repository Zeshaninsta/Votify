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
import EventModal from "./EventModal";

const ShowEvent = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, "events");
        const q = query(eventsCollectionRef);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const eventList = [];
          querySnapshot.forEach((doc) => {
            eventList.push({ id: doc.id, ...doc.data() });
          });
          setEvents(eventList);
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">
          Upcoming Events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[80%] m-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl cursor-pointer relative z-10"
              onClick={() => openModal(event)}
            >
              <img
                src={event.eventPicture}
                alt={event.eventName}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900">
                  {event.eventName}
                </h2>
                <p className="text-gray-700">{event.eventDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedEvent && (
        <EventModal event={selectedEvent} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ShowEvent;
