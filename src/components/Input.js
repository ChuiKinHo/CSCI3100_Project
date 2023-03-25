import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/20/solid";

export default function Input() {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />

      <div className="w-full divide-y divide-gray-200">
        <div className="flex-1">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 resize-none"
            rows="2"
            placeholder="What's happening?"
          ></textarea>
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex">
            <div className="">
              <label htmlFor="image-upload">
                <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
              </label>
              <input id="image-upload" type="file" hidden />
            </div>
            <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
          </div>

          <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
