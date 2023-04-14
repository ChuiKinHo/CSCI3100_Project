import Search from "./Search.js";
import Post from "./Post.js";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import useStorage from "../hooks/useStorage";
import Link from "next/link.js";
import { useEffect, useState } from "react";

import { set } from "mongoose";
import { userImgProfile } from "../_unsorted/imageRelated/cloudinary/utils";

export default function MessageFrom({ loginUserInfo }) {
  if (loginUserInfo != null) {
    return (
      <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white">
                Are you using sudo?
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
