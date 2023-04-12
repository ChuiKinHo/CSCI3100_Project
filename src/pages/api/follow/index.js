import dbConnect from "../../../_unsorted/database/dbConnect";
import { Post } from "../../../_unsorted/database/schemas";
import { pwd } from "../../../_unsorted/util/utils";
import { Tweet } from "../../../_unsorted/database/schemas";
import { User } from "../../../_unsorted/database/schemas";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // api/users
  switch (method) {
    case "GET":
      try {
        //get list of following
        let user;
        if (req.query.following) {
          const username = req.query.following;
          user = await User.findOne({ username: username }).populate({
            path: "following",
            populate: {
              path: "follower",
              model: "User",
              select: "username",
            },
          });
          user = user.following;
        } else if (req.query.follower) {
          const username = req.query.follower;
          user = await User.findOne({ username: username }).populate({
            path: "follower",
            populate: {
              path: "follower",
              model: "User",
              select: "username",
            },
          });
          user = user.follower;
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, data: { error: error.toString() } });
      }
      break;

    // user to follow target user
    case "PUT":
      try {
        const username = req.query.username;
        const targetUsername = req.query.target;
        let user, targetUser;
        if (username && targetUsername && username !== targetUsername) {
          user = await User.findOne({ username: username });
          if (user) {
            targetUser = await User.findOneAndUpdate(
              {
                username: targetUsername,
              },
              {
                $addToSet: { follower: user._id },
              },
              { upsert: true }
            );

            if (targetUser) {
              await User.updateOne(
                { username: username },
                {
                  $addToSet: {
                    following: targetUser._id,
                  },
                },
                { upsert: true }
              );
            }
          }
        }

        res.status(200).json({ success: true });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, data: { error: error.toString() } });
        //console.log("error: " + error);
      }
      break;

    case "DELETE":
      try {
        const username = req.query.username;
        const targetUsername = req.query.target;
        let user, targetUser;
        if (username && targetUsername && username !== targetUsername) {
          user = await User.findOne({ username: username });
          if (user) {
            targetUser = await User.findOneAndUpdate(
              {
                username: targetUsername,
              },
              {
                $pull: { follower: user._id },
              },
              { multi: false }
            );

            if (targetUser) {
              await User.updateOne(
                { username: username },
                {
                  $pull: {
                    following: targetUser._id,
                  },
                },
                { multi: false }
              );
            }
          }
        }

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
