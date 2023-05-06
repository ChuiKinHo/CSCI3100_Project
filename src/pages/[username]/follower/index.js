/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: display the follower page
 * -----------------------------
 */
// Import dependencies
import { useRouter } from "next/router";
import Widget from "@/components/Widget";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { userImg } from "@/_unsorted/imageRelated/cloudinary/utils";
import useStorage from "@/hooks/useStorage";

// Define the functional component
export default function followerPage() {
  // Get the current router object
  const router = useRouter();

  // Get the getItem function from useStorage
  const { getItem } = useStorage();

  // Define and initialize the component states
  const [loginUsername, setLoginUsername] = useState(null);
  const username = router.query.username;
  const [queryReturn, setQueryReturn] = useState([]);
  const [queryReturnFollowed, setQueryReturnFollowed] = useState([]);
  const [parentFolAction, setParentFolAction] = useState(null);
  const [childState, setChildState] = useState(0);

  // Define a function to handle child state changes
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
  };

  // Use an effect hook to update the login username state when getItem is updated
  useEffect(() => {
    setLoginUsername(getItem("username", "session"));
  }, [getItem("username", "session")]);

  // Use an effect hook to fetch data from the API endpoint when the username or childState states are updated
  useEffect(() => {
    if (username != null) {
      fetch("/api/follow?follower=" + username, {
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
    }
  }, [username, childState]);

  // Use an effect hook to update the queryReturnFollowed state when the queryReturn and loginUsername states are updated
  useEffect(() => {
    if (
      queryReturn !== null &&
      queryReturn.length !== 0 &&
      loginUsername !== null
    ) {
      setQueryReturnFollowed(
        queryReturn.map((user) =>
          user.follower
            .map((folUser) => folUser.username)
            .includes(loginUsername)
        )
      );
    }
  }, [queryReturn, loginUsername]);

  // Define a function to handle the follow action
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

  // action to handle unfollow
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
  //when the returned query isn't empty, render the page
  if (queryReturn.length === 0) {
    return (
      <>
        {/* The following div element contains a message that the user has no followers */}
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          {/* The following div element contains the back button */}
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
          </div>
          {/* The following div element shows a message that the user has no followers */}
          <div className="flex p-3">The user has no follower</div>
        </div>
        {/* The following Widget component is shown below the message */}
        <Widget onStateChange={handleChildStateChange} explore={false} />
      </>
    );
  } else {
    return (
      <>
        {/* The following div element contains the list of users */}
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          {/* The following div element contains the back button */}
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
          </div>
          {/* The following div element shows the number of followers */}
          <div className="flex p-3">{queryReturn.length} Follower</div>
          {/* The following code maps through the queryReturn array to show a list of users */}
          {queryReturn.map((user, index) => (
            <div
              key={user.username}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
            >
              {/* The following button redirects the user to the selected user's profile */}
              <button
                onClick={() => {
                  redirect(user.username);
                }}
              >
                {userImg(user)}
              </button>
              {/* The following div element shows the selected user's name and username */}
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
              {/* The following code shows a follow/unfollow button depending on whether the current user follows the selected user */}
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
        {/* The following Widget component is shown below the user list */}
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={parentFolAction}
          explore={false}
        />
      </>
    );
  }
}
