/*
 * -----------------------------
 * File - login.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import { useState, useEffect, useRef } from "react";
import useStorage from "../../hooks/useStorage";
import { useRouter } from "next/router";
import Widget from "@/components/Widget";

export default function Login() {
  const router = useRouter();
  const { setItem } = useStorage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const inputRef = useRef(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setWarning("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setWarning("");
  };

  const handleSubmit = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (res.status != 201) {
          setWarning("Username or password is not correct");
          return null;
        }
        return res.json();
      })
      .then((json) => {
        if (!json) return;

        if (json.data.admin) {
          setItem("admin", "1", "session");
          router.replace("/admin");
        } else if (
          json.data.username &&
          json.data.accessToken &&
          json.data.refreshToken
        ) {
          setItem("username", json.data.username, "session");
          setItem("accessToken", json.data.accessToken, "session");
          setItem("refreshToken", json.data.refreshToken, "session");
          router.replace("/");
        } else {
        }
      });
  };
  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRef.current.click();
    }
  };
  return (
    <>
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0  bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Login</h2>
        </div>
        <div className="p-4">
          <form>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Username:
              </span>
              <input
                type="text"
                name="userId"
                className="mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="account"
                onChange={handleUsernameChange}
                required
                onKeyDown={handleKeyDown}
              />
            </label>
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
            <input
              type="button"
              className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 m-1"
              value="Login"
              onClick={handleSubmit}
              ref={inputRef}
            />
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
