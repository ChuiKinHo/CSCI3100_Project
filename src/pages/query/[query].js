/*
 * -----------------------------
 * File - [query].js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: To get the query result for the search bar
 * -----------------------------
 */
import { useRouter } from "next/router";
import Widget from "@/components/Widget";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "next/link";
import { userImg } from "../../_unsorted/imageRelated/cloudinary/utils";
import useStorage from "../../hooks/useStorage";

export default function userPage() {
  const router = useRouter();
  const { getItem } = useStorage();
  const [loginUsername, setLoginUsername] = useState(null);
  const query = router.query.query;
  const [queryReturn, setQueryReturn] = useState([]);
  const [queryReturnFollowed, setQueryReturnFollowed] = useState([]);
  const [parentFolAction, setParentFolAction] = useState(null);
  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
  };
  useEffect(() => {
    setLoginUsername(getItem("username", "session"));
  }, [getItem("username", "session")]);

  useEffect(() => {
    fetch("/api/users?q=" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.data !== undefined &&
          data.data !== null &&
          data.data.length != 0
        ) {
          setQueryReturn(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [query, childState]);

  useEffect(() => {
    if (queryReturn !== null && queryReturn.length !== 0) {
      setQueryReturnFollowed(
        queryReturn.map((user) =>
          user.follower
            .map((folUser) => folUser.username)
            .includes(loginUsername)
        )
      );
    }
  }, [queryReturn]);

  const handleFol = (index) => {
    fetch(
      "/api/follow?username=" +
        loginUsername +
        "&target=" +
        queryReturn[index].username,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data.success) {
          const update = queryReturnFollowed.map((followed, i) => {
            if (i === index) {
              return true;
            } else {
              return followed;
            }
          });
          setQueryReturnFollowed(update);
          setParentFolAction({
            username: queryReturn[index].username,
            followed: true,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  const handleUnfol = (index) => {
    fetch(
      "/api/follow?username=" +
        loginUsername +
        "&target=" +
        queryReturn[index].username,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data !== null && data.success) {
          const update = queryReturnFollowed.map((followed, i) => {
            if (i === index) {
              return false;
            } else {
              return followed;
            }
          });
          setQueryReturnFollowed(update);
          setParentFolAction({
            username: queryReturn[index].username,
            followed: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  };

  function goBack() {
    router.back();
  }
  function redirect(username) {
    router.push("/" + username);
  }

  if (queryReturn.length === 0) {
    return (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
          </div>

          <div className="flex p-3">No Result Found</div>
        </div>
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={() => {}}
          explore={false}
        />
      </>
    );
  } else {
    return (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
          </div>
          <div className="flex p-3">{queryReturn.length} User Found</div>
          {queryReturn.map((user, index) => (
            <div
              key={user.username}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
            >
              <button
                onClick={() => {
                  redirect(user.username);
                }}
              >
                {userImg(user)}
              </button>

              <div className="truncate ml-4 leading-5">
                <h4
                  className="font-bold hover:underline text-[14px] truncate"
                  onClick={() => {
                    redirect(user.username);
                  }}
                >
                  {user.name}
                </h4>
                <h5 className="text-[13px] text-gray-500 truncate">
                  @{user.username}
                </h5>
              </div>
              {user.username === loginUsername ? (
                ""
              ) : queryReturnFollowed[index] ? (
                <button
                  key={index}
                  className="ml-auto bg-white text-black border rounded-full text-sm px-3.5 py-1.5 font-bold hover:bg-red-300"
                  onClick={() => handleUnfol(index)}
                >
                  Following
                </button>
              ) : (
                <button
                  key={index}
                  className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold"
                  onClick={() => handleFol(index)}
                >
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={parentFolAction}
          explore={false}
        />
      </>
    );
  }
}
