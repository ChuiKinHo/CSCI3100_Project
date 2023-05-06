/*
 * -----------------------------
 * File - MessageTo.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: messageTo component for rendering messages to the user
 * -----------------------------
 */

// Import the userImgProfile function from the specified module
import { userImgProfile } from "../_unsorted/imageRelated/cloudinary/utils";

// Define a React component that displays a chat message and the sender's profile image
export default function MessageTo({ userInfo, text }) {
  // Check if the sender's username is not an empty string
  if (userInfo.username != "") {
    return (
      // Render a div with the chat message and profile image
      <div className="chat-message">
        <div className="flex items-end">
          {/* Render the chat message */}
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                {text}
              </span>
            </div>
          </div>
          {/* Render the sender's profile image */}
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
