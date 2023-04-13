import dbConnect from "../../../_unsorted/database/dbConnect";
import { User } from "../../../_unsorted/database/schemas";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // api/users
  switch (method) {
    case "GET":
      try {
        const users = await User.find()
        .populate({
          path: "follower",
          select: "username",
          populate: {
            path: "following",
            model: "User",
            select: "username",
          },
        })
        .populate({
          path: "following",
          select: "username",
          populate: {
            path: "follower",
            model: "User",
            select: "username",
          },
        })
          .populate({
            path: "mytweets",
            populate: {
              path: "userObjectId",
              model: "User",
            },
          });


        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
