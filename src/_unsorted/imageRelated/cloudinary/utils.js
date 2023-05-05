/*
 * -----------------------------
 * File - utils.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import { CldImage, CldUploadButton, CldVideoPlayer } from "next-cloudinary";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";

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
      className="md rounded-full relative"
      width="1000"
      height="1000"
      crop="fill"
      src={user.usrImg}
      alt={user.username}
    />
  );
}

export function imageVideoDisplay(url, width, height) {
  const fileExtension = url.split(".").pop();
  const urlWithoutExtension = url.slice(0, url.lastIndexOf("."));
  if (
    ["mp4", "mov", "avi", "wmv", "flv", "mkv", "webm"].includes(fileExtension)
  ) {
    return (
      <CldVideoPlayer width={width} height={height} src={urlWithoutExtension} />
    );
  } else {
    return (
      <CldImage width={width} height={height} crop="fill" src={url} alt={url} />
    );
  }
}

// export default { userImg, img }
