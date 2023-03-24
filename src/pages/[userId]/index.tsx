import { useRouter } from "next/router";
import Post from "@/components/Post";
import Widget from "@/components/Widget";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function userPage() {
  const router = useRouter();
  const userInfo = {
    id: router.query.userId,
    name: "testUsername",
    intro: "introduction",
  };
  // test post
  const posts = [
    {
      id: "1",
      name: "hello",
      username: "hello",
      userImg:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "hello",
      timestamp: "1ms ago",
    },
  ];
  // test image
  const userImg =
    "https://store-images.s-microsoft.com/image/apps.36792.9007199266244427.c75d2ced-a383-40dc-babd-1ad2ceb13c86.f594cb3e-881b-486c-83e4-4c72d39ee3f1?w=120";

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
            style={{
              height: "200px",
              backgroundImage:
                "url(https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200)",
            }}
          >
            <img
              className="opacity-0 w-full h-full"
              src="https://pbs.twimg.com/profile_banners/2161323234/1585151401/600x200"
              alt=""
            />
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
                      src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
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
                  @{userInfo.id}
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
            {["Tweets", "Replies", "Likes"].map((menuItem) => (
              <button className="basis-1/3 rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-300 hover:text-slate-900">
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