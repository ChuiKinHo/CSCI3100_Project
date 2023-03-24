import { useRouter } from "next/router";
import Post from "@/components/Post";
import Widget from "@/components/Widget";

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
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
            {userInfo.name}
          </h2>
        </div>
        <div className="flex p-3 border-b border-gray-200">
          <img
            className="h-30 w-30 rounded-full mr-4"
            src={userImg}
            alt="user-img"
          />
        </div>
        <div className="border-b border-gray-200">
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
        </div>
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
