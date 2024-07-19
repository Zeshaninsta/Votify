import React from "react";

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-5 rounded shadow-md">
        <p>{message}</p>
        <div className="mt-4 flex justify-center">
          <button
            className="bg-green-500 text-white px-4 py-2 mr-4 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
