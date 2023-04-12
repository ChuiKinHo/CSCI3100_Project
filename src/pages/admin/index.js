import React, { useState } from "react";

const handleSubmit = async (event, method = 'POST', JSONdata = '', endpoint = '/admin/test2') => {
  // Stop the form from submitting and refreshing the page.
  event.preventDefault()

  // Send the data to the server in JSON format.
  // const JSONdata = JSON.stringify({
  //   username: event.target.username.value,
  //   password: event.target.password.value,
  // })

  // Form the request for sending data to the server.
  // const options = { method: method, headers: { "Content-Type": "application/json" }, body: JSONdata }
  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, { 
    method: method, 
    headers: { "Content-Type": "application/json" }, 
    body: JSONdata 
  })

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json()
  alert(`Is this your full name: ${result.data}`)
  return result.data
}

const createUserJSON = event => ({
  username: event.target.username.value,
  password: event.target.password.value,
})
const handleCreateUserSubmit = async (event) => handleSubmit(event, 'POST', createUserJSON(event), '/api/users')

function createUserTable() {

  return (
    <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg">
      <form onSubmit={handleSubmit}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"><label htmlFor="username">Username</label></th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase"><label htmlFor="password">Password</label></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input id="username" type="text" placeholder="username"></input>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input id="password" type="text" placeholder="password"></input>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input name="file" type="file" />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <button type="submit" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-lg">
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

function deleteUserTable() {
  return (
    <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Username</th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Type Username to Confirm</th>
            <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Delete</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap">user001</td>
            <td className="px-6 py-4 whitespace-nowrap">
              <input type="text" placeholder="user001"></input>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button type="button" placeholder="password">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </td>
          </tr>

          <tr><td className="px-6 py-4 whitespace-nowrap">user002</td><td className="px-6 py-4 whitespace-nowrap"><input type="text" placeholder="user002"></input></td><td className="px-6 py-4 whitespace-nowrap"><button type="button" placeholder="password"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button></td></tr>
          <tr><td className="px-6 py-4 whitespace-nowrap">user003</td><td className="px-6 py-4 whitespace-nowrap"><input type="text" placeholder="user003"></input></td><td className="px-6 py-4 whitespace-nowrap"><button type="button" placeholder="password"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button></td></tr>
          <tr><td className="px-6 py-4 whitespace-nowrap">user004</td><td className="px-6 py-4 whitespace-nowrap"><input type="text" placeholder="user004"></input></td><td className="px-6 py-4 whitespace-nowrap"><button type="button" placeholder="password"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button></td></tr>
          <tr><td className="px-6 py-4 whitespace-nowrap">user005</td><td className="px-6 py-4 whitespace-nowrap"><input type="text" placeholder="user005"></input></td><td className="px-6 py-4 whitespace-nowrap"><button type="button" placeholder="password"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg></button></td></tr>
        </tbody>
      </table>
    </div>
  );
}

function viewUserInfoTable() {
  return (
    <>
      <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg mb-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Username</th>
              {/* <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Search</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" placeholder="username"></input>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button type="button" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-lg">
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Following</th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Followers</th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Tweets</th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Comments</th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Likes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">user002</td>
              <td className="px-6 py-4 whitespace-nowrap">user002</td>
              <td className="px-6 py-4 whitespace-nowrap">hello. This is my first tweet.</td>
              <td className="px-6 py-4 whitespace-nowrap">I like your post</td>
              <td className="px-6 py-4 whitespace-nowrap">User002's daily routine</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">helloId</td>
              <td className="px-6 py-4 whitespace-nowrap">helloId</td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">Kono Dio da!</td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">byebyeId</td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
              <td className="px-6 py-4 whitespace-nowrap">WRRRYYYY</td>
              <td className="px-6 py-4 whitespace-nowrap"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function updateUserInfoTable() {
  return (
    <>
      <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg mb-5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Username</th>
              {/* <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Search</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <input type="text" placeholder="username"></input>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button type="button" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-lg">
                  Search
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-col overflow-x-auto p-1.5 w-full inline-block align-middle overflow-hidden border rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Password</th>
              <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase">Reset</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">{"<REDACTED>"}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button type="button" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-lg">
                  Reset
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function adminPage() {

  const [mode, setMode] = useState(0);

  return (
    <div className="xl:l-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[100px] flex-grow px-10 pt-10">

      <div className="mx-auto inline-flex" role="group">
        <button type="button" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-l-lg"
          onClick={() => setMode(1)}>
          Create User
        </button>
        <button type="button" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto"
          onClick={() => setMode(2)}>
          Delete User
        </button>
        <button type="button" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto"
          onClick={() => setMode(3)}>
          View User Information
        </button>
        <button type="button" className="px-4 py-2 text-gray-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 hover:border-slate-400 mx-auto rounded-r-lg"
          onClick={() => setMode(4)}>
          Update User Information
        </button>
      </div>

      {/* Table */}
      {
        !mode ? null :
          mode == 1 ? createUserTable() :
            mode == 2 ? deleteUserTable() :
              mode == 3 ? viewUserInfoTable() :
                mode == 4 ? updateUserInfoTable() : null
      }
    </div>
  );
}