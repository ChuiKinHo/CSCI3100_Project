import { HomeIcon } from "@heroicons/react/20/solid";

export default function Search() {
  return (
    <div className="px-3">
      <form>
        <label className="relative block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fill-rule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <input
            type="text"
            className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Search"
          />
        </label>
      </form>
    </div>
  );
}
