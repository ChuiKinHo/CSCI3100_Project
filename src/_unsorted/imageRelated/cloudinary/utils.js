import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";

// import {setResource}
export function UploadButton() {
  return (
    <>
      <CldUploadButton
        onUpload={(result, error, widget) => {
          if (result.event === "success") {
            console.log(
              "Done! Here is the image info: ",
              result.info.secure_url.split("upload/")[1]
            );
          }
        }}
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        uploadPreset="ml_unsigned"
      >
        <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
      </CldUploadButton>
    </>
  );
}

export function userImg(user) {
  return (
    <CldImage
      className="h-11 w-11 rounded-full mr-4"
      width="75"
      height="75"
      crop="fill"
      src={user.usrImg}
      alt={user.username}
    />
  );
}

export function sidebarImg(user) {
  return (
    <CldImage
      className="h-11 w-11 rounded-full"
      width="75"
      height="75"
      crop="fill"
      src={user.usrImg}
      alt={user.username}
    />
  );
}

export function userImgProfile(user) {
  return (
    <CldImage
      className="md rounded-full relative border-4 border-gray-900"
      width="1000"
      height="1000"
      crop="fill"
      src={user.usrImg}
      alt={user.username}
    />
  );
}

export default function img(url, alt, width, height) {
  return (
    <CldImage width={width} height={height} crop="fill" src={url} alt={alt} />
  );
}

// export default { userImg, img }
