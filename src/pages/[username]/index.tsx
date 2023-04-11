import { useRouter } from "next/router";
import Post from "@/components/Post";
import Widget from "@/components/Widget";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import postsJSON from "@/data/samplePosts.json";
import users from "@/data/sampleUsers.json";
import { userImgProfile } from "../../_unsorted/imageRelated/cloudinary/utils";

export default function userPage() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    name: "",
    userImg: "",
  });
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const username = router.query.username;
  useEffect(() => {
    fetch("http://localhost:3000/api/users?q=" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(router.query.username);
        if (
          data.data !== undefined &&
          data.data !== null &&
          data.data.length != 0
        ) {
          setUserInfo(data.data[0]);
          //console.log(data.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [username]);

  return (
    <>
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <ArrowLeftIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer ml-3">
            {userInfo.name}
          </h2>
        </div>

        <div>
          <div className="w-full bg-cover bg-no-repeat bg-center">
            {userImgProfile(userInfo)}
          </div>
          <div className="p-4">
            <div className="relative flex w-full">
              <div className="flex flex-1">
                <div style={{ marginTop: "-6rem" }}>
                  <div
                    style={{ height: "9rem", width: "9rem" }}
                    className="md rounded-full relative avatar"
                  >
                    <div className="absolute"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-right">
                <button className="flex justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring rounded max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 hover:border-blue-800 flex items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="space-y-1 justify-center w-full mt-3 ml-3">
              <div>
                <h2 className="text-xl leading-6 font-bold text-black">
                  {userInfo.name}
                </h2>
                <p className="text-sm leading-5 font-medium text-gray-600">
                  @{userInfo.username}
                </p>
              </div>
              <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                <div className="text-center pr-3 hover:underline">
                  <span className="font-bold text-black">520</span>
                  <span className="text-gray-600"> Following</span>
                </div>
                <div className="text-center px-3 hover:underline">
                  <span className="font-bold text-black">23,4m </span>
                  <span className="text-gray-600"> Followers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-3 border-b border-gray-200"></div>
        <div>
          <nav className="flex flex-row sm:justify-center space-x-4">
            {["Tweets", "Replies", "Likes"].map((menuItem, i) => (
              <button
                key={i}
                className="basis-1/3 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-300 hover:text-slate-900"
              >
                {menuItem}
              </button>
            ))}
          </nav>
          {/* {posts.map((post) => (
            <Post key={post.id} id={post.id} post={post} />
          ))} */}
        </div>
      </div>
      <Widget />
    </>
  );
}
