import Search from "./Search.js";
import Post from "./Post.js";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import useStorage from "../hooks/useStorage";
import Link from "next/link.js";
import { useEffect, useState } from "react";

import { set } from "mongoose";
import { userImgProfile } from "../_unsorted/imageRelated/cloudinary/utils";

export default function MessageFrom({ loginUserInfo, text }) {
  if (loginUserInfo.username != "") {
    return (
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white">
                {text}
              </span>
            </div>
          </div>

          <div
            style={{ height: "50px", width: "50px" }}
            className="w-6 h-6 rounded-full order-2 "
          >
            {userImgProfile(loginUserInfo)}
          </div>
        </div>
      </div>
    );
  }
}