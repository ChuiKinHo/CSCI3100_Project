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

  // TODO:: More polishing is needed
  console.log(post);
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={commentId.userImg}
        alt="user-img"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {commentId.name}
            </h4>

            <span className="text-sm sm:text-[15px]">
              @{commentId.username} -{" "}
            </span>
            <span className="text-sm sm:text-[15px] hover:underline">
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

          {/*TODO:: Turn this into button */}
          <EllipsisHorizontalCircleIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2 " />
        </div>

        <p className="text-gray-800 text-[15px sm:text-[16px] mb-2">
          {commentId.text}
        </p>

        <img className="rounded-2xl mr-2" src={commentId.image} alt="" />

        <div className="flex justify-between text-gray-500 p-2">
          <Link href={"/" + commentId.username + "/status/" + commentId.id}>
            <button className="flex items-center select-none">
              <ChatBubbleBottomCenterTextIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            </button>
          </Link>

          <button className="flex items-center group">
            {commentId.like_by_me ? (
              <>
                <HandThumbUpIconSolid className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-green-600 group-hover:text-green-600 group-hover:bg-green-100" />
                <span className="text-green-600 text-sm select-none group-hover:text-green-600 px-1">
                  {commentId.like}
                </span>
              </>
            ) : (
              <HandThumbUpIcon className="h-9 w-9 hoverEffect p-2 hover:text-green-600 hover:bg-green-100 text-gray-600 group-hover:text-green-600" />
            )}
            {!commentId.like_by_me && commentId.like > 0 && (
              <span className="text-gray-600 text-sm select-none group-hover:text-green-600 px-1">
                {commentId.like}
              </span>
            )}
          </button>
          <button className="flex items-center group">
            {commentId.dislike_by_me ? (
              <>
                <HandThumbDownIconSolid className="h-9 w-9 hoverEffect p-2 text-red-600 group-hover:text-red-600 group-hover:bg-red-100" />
                <span className="text-red-600 text-sm select-none group-hover:text-red-600 px-1">
                  {commentId.dislike}
                </span>
              </>
            ) : (
              <HandThumbDownIcon className="h-9 w-9 hoverEffect p-2 text-gray-600 group-hover:text-red-600 group-hover:bg-red-100" />
            )}
            {!commentId.dislike_by_me && commentId.dislike > 0 && (
              <span className="text-gray-600 text-sm select-none group-hover:text-red-600 px-1">
                {commentId.dislike}
              </span>
            )}
          </button>

          <button className="flex items-center">
            <ArrowPathRoundedSquareIcon className="h-9 w-9 hoverEffect p-2 hover:text-blue-600 hover:bg-blue-100" />
          </button>
        </div>
      </div>
    </div>
  );
}
