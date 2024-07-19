import React from "react";

const EventModal = ({ event, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-gray-800 opacity-75"
        onClick={closeModal}
      ></div>
      <div className="bg-white rounded-lg overflow-hidden z-50">
        <div className="p-6">
          <h2 className="text-3xl font-semibold mb-4 text-gray-900">
            {event.eventName}
          </h2>
          <p className="text-gray-700 mb-2">{event.eventDescription}</p>
          <div className="flex items-center text-gray-700 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20zm0-9a1 1 0 011-1h3a1 1 0 110 2h-3a1 1 0 01-1-1zm2-4a1 1 0 00-2 0v3a1 1 0 102 0v-3z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-semibold">{event.eventDate}</p>
          </div>
          <div className="flex items-center text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 6a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V6zm1-2a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm8 2a2 2 0 00-2 2v6a2 2 0 104 0V8a2 2 0 00-2-2zm-1 7a1 1 0 112 0v1a1 1 0 11-2 0v-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-semibold">{event.eventPlace}</p>
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b-lg w-full"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EventModal;
