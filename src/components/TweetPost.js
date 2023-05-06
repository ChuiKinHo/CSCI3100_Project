/*
 * -----------------------------
 * File - TweetPost.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: recusive tweet post component for recursive comment or recursive post
 * -----------------------------
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Post from "./Post";
import useStorage from "../hooks/useStorage";

// A functional component that renders a tweet post
export default function TweetPost({ post }) {
  const router = useRouter();
  const [targetPost, setTargetPost] = useState(null);
  const { getItem } = useStorage();
  const [loginUsername, setLoginUsername] = useState(null);

  // useEffect hook that sets the loginUsername state variable based on session storage
  useEffect(() => {
    setLoginUsername(getItem("username", "session"));
  }, [getItem("username", "session")]);

  // useEffect hook that fetches the target tweet and sets the targetPost state variable
  useEffect(() => {
    if (post.targetTweetId !== null && loginUsername !== null) {
      fetch(
        "/api/tweets?tweetid=" +
          post.targetTweetId +
          "&username=" +
          loginUsername,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.data !== null) {
            setTargetPost(data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [loginUsername]);

  // The component returns a fragment containing a Post component and a TweetPost component (if applicable)
  if (post !== null)
    return (
      <>
        {/* If the target post is not yet loaded, show nothing */}
        {targetPost === null || post.retweet ? (
          ""
        ) : (
          /* Otherwise, recursively render the target post using a TweetPost component */
          <TweetPost
            key={targetPost.id}
            post={targetPost}
            loginUsername={loginUsername}
          />
        )}
        {/* Render the current post using a Post component */}
        <Post id={post.id} />
      </>
    );
}
