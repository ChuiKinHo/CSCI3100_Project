import React from "react";
import Post from "./Post";
import { XMarkIcon } from "@heroicons/react/24/outline";
const Retweet = ({ onClose, post, id }) => {
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
        className="bg-white rounded-lg shadow-lg p-8 flex flex-col w-1240 justify-between"
        onClick={handlePopUpClick}
      >
        <div className="flex justify-start ">
          <XMarkIcon
            className="h-6 w-6 float-right text-sky-500"
            onClick={handleCloseClick}
          />
        </div>

        <div className="flex p-3 cursor-pointer border-b border-gray-200">
          <img
            className="h-11 w-11 rounded-full mr-4"
            src={post.userImg}
            alt="user-img"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between"></div>
            <div className="flex-1 ">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 resize-none"
                rows="2"
                placeholder="Add a comment..."
              ></textarea>
            </div>

            <div className="flex p-3 cursor-pointer border rounded-lg border-gray-300 ">
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post.userImg}
                alt="user-img"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 whitespace-nowrap">
                    <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                      {post.username}
                    </h4>
                    <span className="text-sm sm:text-[15px]">
                      @{post.userId} -{" "}
                    </span>
                    <span className="text-sm sm:text-[15px] hover:underline">
                      {post.timestamp}
                    </span>
                  </div>
                </div>
                <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
                  {post.text}
                </p>
                <img className="rounded-2xl mr-2" src={post.image} alt="" />
              </div>
            </div>
            <img className="rounded-2xl mr-2" src={post.image} alt="" />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <div className="bg-blue-400 hover:brightness-95 text-white font-bold py-2 px-4  rounded-full">
            Retweet
          </div>
        </div>
      </div>
    </div>
  );
};

export default Retweet;
