/*
 * -----------------------------
 * File - Feed.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import { useState, useEffect } from "react";
import Input from "./Input";
import Post from "./Post";
import useStorage from "../hooks/useStorage";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);
  const [post, setPost] = useState(null);

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  useEffect(() => {
    if (username) {
      fetch("/api/tweets?username=" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPosts(data.data);
          //console.log(data.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, [username]);

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0  bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
      </div>
      <Input />
      {posts.map((post) => (
        <Post key={post.id} id={post.id} />
      ))}
    </div>
  );
}
