import Input from "./Input";
import Post from "./Post";
import postsJSON from "../data/samplePosts.json";

export default function Feed() {
  const index = ["1", "2", "5"];
  const posts = postsJSON.filter((post) => index.includes(post.id));

  // const posts = all
  //   // Placeholder I guess, will be replaced by the data from the database
  //   {
  //     id: "1",
  //     name: "hello",
  //     username: "helloId",
  //     userImg:
  //       "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
  //     img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
  //     text: "hello",
  //     timestamp: "1ms ago",
  //     like: 500,
  //     dislike: 100,
  //     like_by_me: true,
  //     dislike_by_me: false,
  //     retweet: true,
  //   },
  //   {
  //     id: "2",
  //     name: "byebye",
  //     username: "byebyeId",
  //     userImg:
  //       "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
  //     img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
  //     text: "hello",
  //     timestamp: "just now",
  //     like: 0,
  //     dislike: 1,
  //     like_by_me: false,
  //     dislike_by_me: true,
  //     retweet: false,
  //   },
  // ];

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0  bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} id={post.id} post={post} />
      ))}
    </div>
  );
}
