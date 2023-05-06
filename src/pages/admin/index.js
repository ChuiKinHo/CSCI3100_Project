/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Admin page, only accessible by admin, can create and delete users, and view users' information.
 * -----------------------------
 */
import React, { useState } from "react";
import { userImg } from "../../_unsorted/imageRelated/cloudinary/utils";
import { CldUploadButton } from "next-cloudinary";
import { PhotoIcon } from "@heroicons/react/20/solid";

export default function adminPage() {
  const [mode, setMode] = useState(0);
  const [data, setData] = useState([]);
  const [dirty, setDirty] = useState(false);
  const [createUserData, setCreateUserData] = useState({
    username: "",
    password: "",
    img: "v1681392440/d6zzeny0jiyonexeoazo.png",
    name: "",
  });

  const deleteUser = async (user) => {
    const confirm = document.getElementById(user.username).value;
    if (confirm !== user.username) {
      alert("Please type the username correctly to confirm!")
      return
    }

    const response = await fetch("/api/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });

    const result = await response.json();
    if (result.data.deletedCount > 0) {
      alert(`Deleted user ${user.username}`);
      setDirty(true);
    } else
      throw new Error(
        `Failed to delete user ${user.username}, response: ${result}`
      );
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch("/api/admin/getAllUsers", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setData(await data.data);
      setDirty(false);
      return data.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleCreateSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    // Send the form data to our forms API on Vercel and get a response.
    if (
      !createUserData.username ||
      !createUserData.password ||
      !createUserData.img ||
      !createUserData.name
    )
      return;

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: createUserData.username,
        password: createUserData.password,
        img: createUserData.img,
        name: createUserData.name,
      }),
    });

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const res = await response.json();
    if (res.success) {
      alert("User created successfully!");
    } else if (res.data == "Username already exists!") {
      alert("Username already exists!");
    } else {
      alert("Error creating user!");
    }
  };

  // Tables:
  const createUserTable = () => {
    return (
      <>
        <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg">
          <form onSubmit={handleCreateSubmit}>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    <label htmlFor="username">Username</label>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    <label htmlFor="password">Name</label>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
                  >
                    <label htmlFor="password">Password</label>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      id="username"
                      type="text"
                      placeholder="username"
                      onChange={(event) =>
                        setCreateUserData((createUserData) => ({
                          ...createUserData,
                          username: event.target.value,
                        }))
                      }
                    ></input>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      id="username"
                      type="text"
                      placeholder="name"
                      onChange={(event) =>
                        setCreateUserData((createUserData) => ({
                          ...createUserData,
                          name: event.target.value,
                        }))
                      }
                    ></input>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      id="password"
                      type="text"
                      placeholder="password"
                      onChange={(event) =>
                        setCreateUserData((createUserData) => ({
                          ...createUserData,
                          password: event.target.value,
                        }))
                      }
                    ></input>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="block" htmlFor="profilePic">
                      <span className=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        User Image:
                      </span>
                      <CldUploadButton
                        id="profilePic"
                        onUpload={(result, widget, _) => {
                          if (result.event === "success") {
                            setCreateUserData((createUserData) => ({
                              ...createUserData,
                              img: result.info.secure_url.split("upload/")[1],
                            }));
                            widget.close();
                          }
                        }}
                        onClick={(e, _) => e.preventDefault()}
                        uploadPreset="ml_unsigned"
                      >
                        <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      </CldUploadButton>
                      Click To upload
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="submit"
                      className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-lg"
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </>
    );
  };

  const viewUserInfoTable = () => {
    dirty && fetchAllUsers();
    return (
      <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                UsrImg
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Following
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Follower
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Tweets
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Likes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Dislikes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data &&
              data.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userImg(user)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.following && user.following.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.follower && user.follower.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.mytweets && user.mytweets.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.likes && user.likes.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.dislikes && user.dislikes.length}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  const deleteUserTable = () => {
    dirty && fetchAllUsers();
    return (
      <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Username
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                User Image
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Type Username to Confirm
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data &&
              data.map((user) => {
                return (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {userImg(user)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="text" id={user.username} placeholder={user.username}></input>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button type="button" onClick={() => deleteUser(user)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };
  // Tables;

  return (
    <div className="xl:l-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[100px] flex-grow px-10 pt-10">
      <div className="mx-auto inline-flex" role="group">
        <button
          type="button"
          className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-l-lg"
          onClick={() => {
            setDirty(true) || setMode(1);
          }}
        >
          Create User
        </button>
        <button
          type="button"
          className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto"
          onClick={() => {
            setDirty(true) || setMode(2);
          }}
        >
          View Users' Information
        </button>
        <button
          type="button"
          className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-r-lg"
          onClick={() => {
            setDirty(true) || setMode(4);
          }}
        >
          Delete User
        </button>
      </div>

      {/* Table */}
      {!mode
        ? null
        : mode == 1
        ? createUserTable()
        : mode == 2
        ? viewUserInfoTable()
        : mode == 4
        ? deleteUserTable()
        : null}
    </div>
  );
}
