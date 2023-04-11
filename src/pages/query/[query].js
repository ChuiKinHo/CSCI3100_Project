import { useRouter } from "next/router";
import Widget from "@/components/Widget";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link } from "next/link";
import { userImg } from "../../_unsorted/imageRelated/cloudinary/utils";

export default function userPage() {
  const router = useRouter();
  const query = router.query.query;
  const [queryReturn, setQueryReturn] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/users?q=" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (
          data.data !== undefined &&
          data.data !== null &&
          data.data.length != 0
        ) {
          setQueryReturn(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [query]);

  function goBack() {
    router.back();
  }
  function redirect(username) {
    router.push("/" + username);
  }

  if (queryReturn.length === 0) {
    return (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
          </div>

          <div className="flex p-3">No Result Found</div>
        </div>
        <Widget />
      </>
    );
  } else {
    return (
      <>
        <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            <ArrowLeftIcon
              className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              onClick={() => goBack()}
            />
          </div>
          <div className="flex p-3">{queryReturn.length} User Found</div>
          {queryReturn.map((user) => (
            <div
              key={user.username}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out"
            >
              <button
                onClick={() => {
                  redirect(user.username);
                }}
              >
                {userImg(user)}
              </button>

              <div className="truncate ml-4 leading-5">
                <h4
                  className="font-bold hover:underline text-[14px] truncate"
                  onClick={() => {
                    redirect(user.username);
                  }}
                >
                  {user.name}
                </h4>
                <h5 className="text-[13px] text-gray-500 truncate">
                  @{user.username}
                </h5>
              </div>
              <button className="ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold">
                Follow
              </button>
            </div>
          ))}
        </div>
        <Widget />
      </>
    );
  }
}
