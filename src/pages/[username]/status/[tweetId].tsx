import { useRouter } from "next/router";
import TweetPost from "@/components/TweetPost";
import Post from "@/components/Post";
import ActionBar from "@/components/ActionBar";
import Comment from "@/components/Comment";
import ReplyInput from "@/components/ReplyInput";
import Widget from "@/components/Widget";
import postsJSON from "@/data/samplePosts.json";
import users from "@/data/sampleUsers.json";
import useStorage from "@/hooks/useStorage";
import { useEffect, useState } from "react";

export default function Tweet() {
  const { getItem } = useStorage();
  const [user, setUser] = useState();

  const router = useRouter();
  const tweetId = router.query.tweetId;
  const username = router.query.username;
  // const post = postsJSON.find(
  //   (post) => post.id === tweetId && post.username === username
  // );
  // const comments = postsJSON.filter((comment) =>
  //   post.commentId.includes(comment.id)
  // );
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let user = users.find(
      (user) => user.username === getItem("username", "session")
    );
    setUser(user);
    setPost(
      postsJSON.find(
        (post) => post.id === tweetId && post.username === username
      )
    );
    if (post != null)
      setComments(
        postsJSON.filter((comment) => post.commentId.includes(comment.id))
      );
  }, [tweetId, post]);

  return (
    <>
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
        </div>
        <div>
          {post != null ? (
            <>
              <TweetPost post={post} />
              <div className="border-b">
                <ActionBar post={post} />
              </div>
            </>
          ) : null}

          {user != null ? (
            <ReplyInput post={post} userImg={user.userImg} />
          ) : null}

          {comments != null && comments.length != 0
            ? comments.map((comment) => (
                <Post key={comment.id} id={comment.id} post={comment} />
              ))
            : null}
        </div>
      </div>
      <Widget />
    </>
  );
}
