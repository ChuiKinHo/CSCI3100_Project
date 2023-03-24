import React from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
const Retweet = ({ onClose }) => {
  const handlePopUpClick = (e) => {
    // Prevent the click event from propagating to the parent element
    e.stopPropagation();
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div
      className="fixed z-50 inset-0 overflow-y-auto bg-gray-800 bg-opacity-50 flex items-center justify-center"
      onClick={handleCloseClick}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col w-96"
        onClick={handlePopUpClick}
      >
        <button
          className="self-end mb-2 focus:outline-none hover:text-gray-500"
          onClick={handleCloseClick}
        >
          <XCircleIcon className="h-6 w-6" />
        </button>
        <h2 className="text-lg font-bold mb-4">Retweet</h2>
        <p className="text-gray-700">Are you sure you want to retweet this?</p>
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleCloseClick}
          >
            Cancel
          </button>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Retweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Retweet;
