/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: explore page
 * -----------------------------
 */
/*
  This is the Explore page component, which displays user and post suggestions to the user.
  It imports the Widget component from "@/components/Widget.js", as well as ArrowLeftIcon and useRouter from Next.js.
  The component uses Next.js' useRouter hook to get the current username from the URL query parameter.
  It also defines message and childState states using useState hooks.
  The component has a handleChildStateChange function that updates the childState state whenever it is called.
  The goBack function uses useRouter to navigate back to the previous page when the back arrow is clicked.
  The return statement renders a header section with a back arrow and the Widget component.
*/

import Widget from "@/components/Widget.js";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Explore() {
  const router = useRouter();
  const username = router.query.username;
  const [message, setMessage] = useState("");
  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
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
