export default function ReplyInput({ post }) {
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src="https://pbs.twimg.com/profile_images/1254779846615420930/7I4kP65u_400x400.jpg"
        alt="user-img"
        className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
      />

      <div className="w-full divide-gray-200">
        <div className="flex flex-row">
          <textarea
            className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 resize-none"
            rows="2"
            placeholder="Tweet your reply"
          ></textarea>
          <div>
            <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
