// TODO:: Client side API calls

// Not working, just placeholder
export default async function login(username, password) {
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const data = await response.json();
  return data;
}

export default async function getUsersByID(id){

}

export default async function getUsersByID(id){

}

export default async function getUsersByID(id){

}
