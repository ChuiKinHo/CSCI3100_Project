/*
 * -----------------------------
 * File - utils.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
// Import necessary components and hooks
import { CldImage, CldUploadButton, CldVideoPlayer } from "next-cloudinary";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";

// Function to display a user's profile image
export function userImg(user) {
  return (
    <CldImage
      className="h-11 w-11 rounded-full mr-4" // CSS classes for the image
      width="75" // Width of the image
      height="75" // Height of the image
      crop="fill" // Crop setting for the image
      src={user.usrImg} // Source URL for the image
      alt={user.username} // Alt text for the image
    />
  );
}

// Function to display a user's profile image in the sidebar
export function sidebarImg(user) {
  return (
    <CldImage
      className="h-11 w-11 rounded-full" // CSS classes for the image
      width="75" // Width of the image
      height="75" // Height of the image
      crop="fill" // Crop setting for the image
      src={user.usrImg} // Source URL for the image
      alt={user.username} // Alt text for the image
    />
  );
}

// Function to display a user's profile image on their profile page
export function userImgProfile(user) {
  return (
    <CldImage
      className="md rounded-full relative" // CSS classes for the image
      width="1000" // Width of the image
      height="1000" // Height of the image
      crop="fill" // Crop setting for the image
      src={user.usrImg} // Source URL for the image
      alt={user.username} // Alt text for the image
    />
  );
}

// Function to display an image or video based on its file extension
export function imageVideoDisplay(url, width, height) {
  const fileExtension = url.split(".").pop(); // Get the file extension from the URL
  const urlWithoutExtension = url.slice(0, url.lastIndexOf(".")); // Get the URL without the file extension
  if (
    ["mp4", "mov", "avi", "wmv", "flv", "mkv", "webm"].includes(fileExtension) // Check if the file extension is a video format
  ) {
    return (
      <CldVideoPlayer width={width} height={height} src={urlWithoutExtension} /> // Display a video player
    );
  } else {
    return (
      <CldImage width={width} height={height} crop="fill" src={url} alt={url} /> // Display an image
    );
  }
}

// Export the functions as an object (not a default export)
// This allows them to be imported and used in other modules
// The object contains four functions: userImg, sidebarImg, userImgProfile, and imageVideoDisplay
export default { userImg, sidebarImg, userImgProfile, imageVideoDisplay };
