/*
 * -----------------------------
 * File - Search.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: serach bar
 * -----------------------------
 */
// Importing required libraries and components
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";

// Defining a React functional component named "Search"
export default function Search() {
  // Initializing "router" and "query" state variable
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Function to handle form submission and search query updates
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/query/${query}`);
  };
  const handleChange = (e) => setQuery(e.target.value);

  // Rendering the search bar UI with search icon and input field
  return (
    <div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5">
      <form
        onSubmit={handleSubmit}
        className="flex items-center p-3 rounded-full relative"
      >
        <MagnifyingGlassIcon className="h-5 z-10 text-gray-500" />
        <input
          className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100 "
          type="text"
          placeholder="Search Twitter"
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
