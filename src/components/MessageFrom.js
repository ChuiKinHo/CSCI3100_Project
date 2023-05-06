/*
 * -----------------------------
 * File - MessageFrom.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: MessageFrom component for rendering messages from the user
 * -----------------------------
 */
import { userImgProfile } from "../_unsorted/imageRelated/cloudinary/utils"; // import userImgProfile utility function from Cloudinary

export default function MessageFrom({ loginUserInfo, text }) {
  // define MessageFrom component with loginUserInfo and text props
  if (loginUserInfo.username != "") {
    // if username is not empty string
    return (
      // return the following JSX
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white">
                {text} {/* render the text prop inside a blue rounded span */}
              </span>
            </div>
          </div>

          <div
            style={{ height: "50px", width: "50px" }}
            className="w-6 h-6 rounded-full order-2 "
          >
            {userImgProfile(loginUserInfo)} {/* render userImgProfile with */}
            {/* loginUserInfo prop */}
          </div>
        </div>
      </div>
    );
  }
}
