import Input from "./Input";
import Post from "./Post";
import samplePosts from "../data/samplePosts.json";

export default function Feed() {
  const posts = samplePosts.filter((post) => ["1", "2", "6"].includes(post.id));

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
