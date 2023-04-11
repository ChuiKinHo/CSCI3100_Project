import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// TODO:: Remove sample data
import posts from "@/data/samplePosts.json";

export default function TweetPost({ post }) {
  // TODO:: Remove sample data
  const targetPost = posts.find((tweet) => tweet.id === post.targetTweetId);
  // TODO:: More polishing is needed
  return (
    <>
      {post.targetTweetId === null ? null : <TweetPost post={targetPost} />}
      <div className="p-3 cursor-pointer border-b border-gray-200">
        <div className="flex">
          <Link href={"/" + post.userObjectId.username}>
            <img
              className="h-11 w-11 rounded-full mr-4"
              src={post.userObjectId.usrImg}
              alt="user-img"
            />
          </Link>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="items-center space-x-1 whitespace-nowrap">
                <Link href={"/" + post.userObjectId.username}>
                  <h4 className="leading-none font-bold text-[15px] sm:text-[16px] hover:underline">
                    {post.userObjectId.name}
                  </h4>
                </Link>
                <span className="text-sm sm:text-[15px]">
                  @{post.userObjectId.username}
                </span>
              </div>

              {/*TODO:: Turn this into button */}
              <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
            </div>

            <img className="rounded-2xl mr-2" src={post.image} alt="" />
          </div>
        </div>
        <div>
          <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
            {post.text}
          </p>
        </div>
      </div>
    </>
  );
}
