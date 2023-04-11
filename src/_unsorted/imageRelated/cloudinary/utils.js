import { CldImage } from "next-cloudinary";

export function userImg(user, width, height) {
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

export default function img(url, alt, width, height) {
  return (
    <CldImage
      width={width}
      height={height}
      crop="fill"
      src={url}
      alt={alt}
    />
  );
}

// export default { userImg, img }