/*
 * -----------------------------
 * File - MessageTo.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import Search from "./Search.js";
import Post from "./Post.js";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import useStorage from "../hooks/useStorage";
import Link from "next/link.js";
import { useEffect, useState } from "react";

import { set } from "mongoose";
import { userImgProfile } from "../_unsorted/imageRelated/cloudinary/utils";

export default function MessageTo({ userInfo, text }) {
  if (userInfo.username != "") {
    return (
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                {text}
              </span>
            </div>
          </div>
          <div
            style={{ height: "50px", width: "50px" }}
            className="w-6 h-6 rounded-full order-1 "
          >
            {userImgProfile(userInfo)}
          </div>
        </div>
      </div>
    );
  }
}
