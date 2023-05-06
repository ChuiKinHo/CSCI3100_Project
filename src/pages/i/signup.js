/*
 * -----------------------------
 * File - signup.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Sign up page
 * -----------------------------
 */
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useStorage from "../../hooks/useStorage";
import Widget from "@/components/Widget";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
export default function Signup() {
  const { setItem } = useStorage();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imgid, setImgid] = useState("v1681392440/d6zzeny0jiyonexeoazo.png");
  const [warning, setWarning] = useState("");
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  // This function is called when the input value for the username field changes.
  // It takes an `event` object as its parameter and updates the `username` state with the new value of the input field.
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // This function is called when the input value for the password field changes.
  // It takes an `event` object as its parameter and updates the `password` state with the new value of the input field.
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // This function is called when the input value for the name field changes.
  // It takes an `event` object as its parameter and updates the `name` state with the new value of the input field.
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  // This function is called when the form is submitted.
  // It takes an `event` object as its parameter and prevents the default form submission behavior.
  // It then creates an object containing the current values of the `username`, `password`, `img`, and `name` states
  // and sends a POST request to a `/api/users` endpoint with the data in JSON format.
  // If the request is successful and the server responds with a JSON object that has a `success` property set to `true`,
  // an alert is displayed and the user is redirected to a login page.
  // Otherwise, an error message is displayed.
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = document.getElementById("my-form");
    if (form.checkValidity()) {
      const reqData = {
        username: username,
        password: password,
        img: imgid,
        name: name,
      };
      if (
        reqData.username !== "" &&
        reqData.password !== "" &&
        reqData.name !== "" &&
        reqData.img !== ""
      ) {
        fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data !== null && data.success) {
              window.alert("Success! Please log in.");
              router.push("/i/login");
            } else {
              setWarning(data.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      }
    } else {
      form.reportValidity();
    }
  };

  // This function is called when the child state changes.
  // It increments the value of the `childState` state by one.
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
  };

  // This function is called when a key is pressed down on the form.
  // It takes an `event` object as its parameter and checks if the key pressed was the "Enter" key.
  // If it was, it prevents the default behavior of submitting the form and clicks on the `inputRef` element instead.
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRef.current.click();
    }
  };

  return (
    <>
      {/* The main container */}
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        {/* Header */}
        <div className="flex py-2 px-3 sticky top-0  bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
            Sign up
          </h2>
        </div>

        {/* Form */}
        <div className="p-4">
          <form id="my-form">
            {/* Username input */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Username (in one consective word):
              </span>
              <input
                type="text"
                name="userId"
                className="mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="account"
                onChange={handleUsernameChange}
                required
                onKeyDown={handleKeyDown}
                pattern="^\S+$"
              />
            </label>

            {/* Name input */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Name:
              </span>
              <input
                type="name"
                name="name"
                className="mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="name"
                onChange={handleNameChange}
                required
              />
            </label>

            {/* Password input */}
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Password:
              </span>
              <input
                type="password"
                name="password"
                className="mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="password"
                onChange={handlePasswordChange}
                required
                onKeyDown={handleKeyDown}
              />
            </label>

            {/* User image input */}
            <label className="block">
              <span className=" after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                User Image:
              </span>
              <CldUploadButton
                onUpload={(result, widget, error) => {
                  if (result.event === "success") {
                    setImgid(result.info.secure_url.split("upload/")[1]);
                    widget.close();
                  }
                }}
                onClick={(e, widget) => {
                  e.preventDefault();
                }}
                uploadPreset="ml_unsigned"
              >
                <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
              </CldUploadButton>
            </label>

            {/* Submit button and warning message */}
            <button
              type="button"
              className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 m-1"
              onClick={handleSubmit}
              ref={inputRef}
            >
              Sign up
            </button>
            <p className="text-red-500">{warning}</p>
          </form>
        </div>
      </div>
      <Widget
        onStateChange={handleChildStateChange}
        checkFol={() => {}}
        explore={false}
      />
    </>
  );
}
