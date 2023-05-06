/*
 * -----------------------------
 * File - Comment.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Comment component for the comment section
 * -----------------------------
 */
import {
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalCircleIcon,
  ArrowPathRoundedSquareIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  HandThumbUpIcon as HandThumbUpIconSolid,
  HandThumbDownIcon as HandThumbDownIconSolid,
} from "@heroicons/react/24/solid";
import useStorage from "../hooks/useStorage";

export default function Comment({ commentId, id }) {
  const [post, setPost] = useState({});
  const { getItem, removeItem } = useStorage();
  const [username, setUsername] = useState(null);
  const [isAdmin, setIsAdmin] = useState(1);

  useEffect(() => {
    setUsername(getItem("username", "session"));
    setIsAdmin(getItem("admin", "session"));
  }, [getItem("username", "session"), getItem("admin", "session")]);

  useEffect(() => {
    if (username != null) {
      fetch("/api/tweets?tweetid=" + commentId + "&username=" + username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPost(data.data);
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  }, []);

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* Display user's profile picture */}
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={commentId.userImg}
        alt="user-img"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          {/* Display user's name, username, and the timestamp of the comment */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {commentId.name}
            </h4>
            <span className="text-sm sm:text-[15px]">
              @{commentId.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {/* Display the timestamp in a relative format, e.g. "2 days ago" */}
              {new Intl.RelativeTimeFormat("en", {
                numeric: "auto",
              }).format(
                -Math.floor(
                  (new Date() - new Date(commentId.timestamp)) /
                    (1000 * 60 * 60 * 24)
                ),
                "day"
              )}
            </span>
          </div>
          {/* Display a menu icon that opens a dropdown menu */}
          <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
        </div>
        {/* Display the comment text and image */}
        <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">
          {commentId.text}
        </p>
        <img className="rounded-2xl mr-2" src={commentId.image} alt="" />
        {/* Display buttons for liking, disliking, and replying to the comment */}
        <div className="flex justify-between text-gray-500 p-2">
          {/* Button to reply to the comment */}
          <Link href={"/" + commentId.username + "/status/" + commentId.id}>
            <button className="flex items-center select-none">
              <ChatBubbleBottomCenterTextIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </button>
          </Link>
          {/* Button to like the comment */}
          <button className="flex items-center group">
            {/* Show solid thumbs-up icon if the user has already liked the comment */}
            {commentId.like_by_me ? (
              <>
                <HandThumbUpIconSolid className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-green-600 group-hover:text-green-600 group-hover:bg-green-100" />
                <span className="text-green-600 text-sm select-none group-hover:text-green-600 px-1">
                  {commentId.like}
                </span>
              </>
            ) : (
              // Show hollow thumbs-up icon if the user has not yet liked the comment
              <HandThumbUpIcon className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-gray-600 group-hover:text-green-600" />
            )}
            {/* Show the number of likes if the user has not yet liked the comment */}
            {!commentId.like_by_me && commentId.like > 0 && (
              <span className="text-gray-600 text-sm select-none group-hover:text-green-600 px-1">
                {commentId.like}
              </span>
            )}
          </button>
          <button className="flex items-center group">
            {/* If the current user has disliked this comment, show a solid HandThumbDownIcon with red text and a red background */}
            {commentId.dislike_by_me ? (
              <>
                <HandThumbDownIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 group-hover:text-red-600 group-hover:bg-red-100" />
                {/* Show the number of dislikes in red text */}
                <span className="text-red-600 text-sm select-none group-hover:text-red-600 px-1">
                  {commentId.dislike}
                </span>
              </>
            ) : (
              /* If the current user has not disliked this comment, show an outlined HandThumbDownIcon with gray text and a red background */
              <HandThumbDownIcon className="h-9 w-9 hoverEffect p-2 text-gray-600 group-hover:text-red-600 group-hover:bg-red-100" />
            )}
            {/* If the current user has not disliked this comment and there are any dislikes, show the number of dislikes in gray text */}
            {!commentId.dislike_by_me && commentId.dislike > 0 && (
              <span className="text-gray-600 text-sm select-none group-hover:text-red-600 px-1">
                {commentId.dislike}
              </span>
            )}
          </button>

          <button className="flex items-center">
            {/* Show an ArrowPathRoundedSquareIcon with blue text and a blue background on hover */}
            <ArrowPathRoundedSquareIcon className="h-9 w-9 hoverEffect p-2 hover:text-blue-600 hover:bg-blue-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
