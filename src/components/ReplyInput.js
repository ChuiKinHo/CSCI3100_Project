import useStorage from "../hooks/useStorage";
import { useEffect, useState } from "react";
import { userImg } from "../_unsorted/imageRelated/cloudinary/utils";
import { useRef } from "react";

export default function ReplyInput({}) {
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  useEffect(() => {
    if (username != null) {
      fetch("http://localhost:3000/api/users?q=@" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data.data);
          isMountedRef.current = true;

          return () => {
            isMountedRef.current = false;
          };
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  useEffect(() => {
    if (username != null) {
      fetch("http://localhost:3000/api/users?q=@" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data.data);
          isMountedRef.current = true;

          return () => {
            isMountedRef.current = false;
          };
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);
  if (isMountedRef && userInfo != null) {
    return (
      <div className="flex border-b border-gray-200 p-3 space-x-3">
        {userImg(userInfo)}
        <div className="w-full divide-gray-200">
          <div className="flex flex-row">
            <textarea
              className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 resize-none"
              rows="2"
              placeholder="Tweet your reply"
            ></textarea>
            <div>
              <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
