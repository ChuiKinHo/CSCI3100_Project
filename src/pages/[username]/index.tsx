import { useRouter } from "next/router";
import Post from "@/components/Post";
import Widget from "@/components/Widget";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import postsJSON from "@/data/samplePosts.json";
import users from "@/data/sampleUsers.json";

export default function userPage() {
  const [userInfo, setUserInfo] = useState({});
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const username = router.query.username;
  useEffect(() => {
    let user = users.find((user) => user.username === username);
    if (user != null) {
      if (user.userImg == "") {
        user.userImg =
          "https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png";
      }
      if (user.userBgImg == null) {
        user.userBgImg = "";
      }
      setUserInfo(user);
    }
  }, [username]);
  useEffect(() => {
    if (userInfo && userInfo.length !== 0) {
      setPosts(postsJSON.filter((post) => post.username === userInfo.username));
    }
  }, [userInfo]);
  // const userInfo = {
  //   username: router.query.username,
  //   name: "testName",
  //   intro: "introduction",
  //   userImg:
  //     "https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg",
  //   userBgImg:
  //     "https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200",
  // };

  // const posts = postsJSON.filter((post) => post.username === userInfo.username);

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
          <div
            className="w-full bg-cover bg-no-repeat bg-center"
            style={
              userInfo.userBgImg === ""
                ? { height: "200px", backgroundColor: "#cfd9de" }
                : {
                    height: "200px",
                    backgroundImage: "url(" + userInfo.userBgImg + ")",
                  }
            }
          >
            {/* <img
              className="opacity-0 w-full h-full"
              src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)"
              alt=""
            /> */}
          </div>
          <div className="p-4">
            <div className="relative flex w-full">
              <div className="flex flex-1">
                <div style={{ marginTop: "-6rem" }}>
                  <div
                    style={{ height: "9rem", width: "9rem" }}
                    className="md rounded-full relative avatar"
                  >
                    <img
                      style={{ height: "9rem", width: "9rem" }}
                      className="md rounded-full relative border-4 border-gray-900"
                      src={userInfo.userImg}
                      alt=""
                    />
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
              <div className="mt-3">
                <p className="text-black leading-tight mb-2">Description</p>
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
        {/* <div className="flex p-3 border-b border-gray-200">
          <img
            className="h-30 w-30 rounded-full mr-4"
            src={userImg}
            alt="user-img"
          />
        </div> */}
        {/* <div className="border-b border-gray-200">
          <div className="p-3">
            <h2 className="font-bold text-lg">{userInfo.name}</h2>
            <h3 className="text-gray-500 text-sm">{"@" + userInfo.id}</h3>
          </div>
          <p className="px-3 pb-3 text-sm">{userInfo.intro}</p>
          <div className="flex p-2">
            <a href="#" className="text-gray-500 px-2 text-sm hover:underline">
              <span className="font-bold text-black">0</span> following
            </a>
            <a href="#" className="text-gray-500 px-2 text-sm hover:underline">
              <span className="font-bold text-black">0</span> followers
            </a>
          </div>
        </div> */}
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
          {posts.map((post) => (
            <Post key={post.id} id={post.id} post={post} />
          ))}
        </div>
      </div>
      <Widget />
    </>
  );
}
