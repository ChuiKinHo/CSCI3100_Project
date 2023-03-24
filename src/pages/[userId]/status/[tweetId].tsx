import { useRouter } from "next/router";
import TweetPost from "@/components/TweetPost";
import Comment from "@/components/Comment";
import ReplyInput from "@/components/ReplyInput";
import Widget from "@/components/Widget";

export default function Tweet() {
  const router = useRouter();
  const tweetId = router.query.tweetId;
  // test post
  const post = {
    id: "1",
    tweetId: tweetId,
    name: "hello",
    username: "hello",
    userImg:
      "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
    img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
    text: "hello",
    timestamp: "1ms ago",
  };
  const comments = [
    {
      id: "2",
      name: "bye",
      username: "bye",
      userImg:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "bye",
      timestamp: "1ms ago",
    },
    {
      id: "3",
      name: "test",
      username: "test",
      userImg:
        "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      img: "https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png",
      text: "test",
      timestamp: "1ms ago",
    },
  ];

  return (
    <>
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
        </div>
        <div>
          <TweetPost post={post} />
          <ReplyInput />
          {comments.map((comment) => (
            <Comment key={comment.id} id={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <Widget />
    </>
  );
}
