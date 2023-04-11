/*
References:
Image and Video Upload to Cloudinary using NextJs Server-Side
https://dev.to/hackmamba/image-and-video-upload-to-cloudinary-using-nextjs-server-side-multer-and-xata-database-3l9f
https://github.com/Theodore-Kelechukwu-Onyejiaku/hackmamba-xata-cloudinary-project

Getting Started with CldImage
https://next-cloudinary.spacejelly.dev/components/cldimage/basic-usage
*/

"use client"; // If using the Next.js 13 app directory, you must add the 'use client'; directive at the top of your file.
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

export default function Testing() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div>
      <h1>Testing</h1>
      <ul>
        {users.map((user) => {
          return (
            <li>
              {user.username}
              <CldImage
                width="600"
                height="600"
                crop="fill"
                src={user.usrImg}
                alt={user.username}
              />
            </li>
          );
        })}
      </ul>
      Cool image
    </div>
  );
}
