import Widget from "@/components/Widget.js";
import Post from "@/components/Post.js";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import useStorage from "@/hooks/useStorage";
import Link from "next/link.js";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { set } from "mongoose";
import { userImg } from "@/_unsorted/imageRelated/cloudinary/utils";
import { useRouter } from "next/router";

export default function Explore() {
  const router = useRouter();
  const username = router.query.username;
  const [message, setMessage] = useState("");
  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
    //console.log(childState);
  };
  function goBack() {
    router.back();
  }
  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <ArrowLeftIcon
          className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
          onClick={() => goBack()}
        />
        <Widget
          onStateChange={handleChildStateChange}
          checkFol={() => {}}
          explore={true}
        />
      </div>
    </div>
  );
}
