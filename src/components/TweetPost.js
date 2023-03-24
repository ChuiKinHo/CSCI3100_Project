import {
  ChartBarIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalCircleIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";

export default function TweetPost({ post }) {
  // TODO:: More polishing is needed
  return (
    <>
      <div className="p-3 cursor-pointer border-b border-gray-200">
        <div className="flex">
          <img
            className="h-11 w-11 rounded-full mr-4"
            src={post.userImg}
            alt="user-img"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="items-center space-x-1 whitespace-nowrap">
                <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                  {post.username}
                </h4>
                <span className="text-sm sm:text-[15px]">@{post.userId}</span>
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
      <div className="flex justify-between border-b text-gray-500 p-2">
        <div className="flex items-center select-none">
          {/*TODO:: Turn this into button */}
          <ChatBubbleBottomCenterTextIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>

        {/*TODO:: Turn this into button */}
        {
          /*TODO:: If the user is the poster */ 1 && (
            <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          )
        }

        <div className="flex items-center">
          {/*TODO:: Turn this into button */}
          <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
        </div>

        {/*TODO:: Turn this into button */}
        <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        {/*TODO:: Turn this into button */}
        <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        {/* Missing retweet button */}
      </div>
    </>
  );
}
