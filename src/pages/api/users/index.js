import dbConnect from "../../../_unsorted/database/dbConnect";
import { User } from "../../../_unsorted/database/schemas";
import { pwd } from "../../../_unsorted/util/utils";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // api/users
  switch (method) {
    case "GET":
      try {
        const keyword = req.query.q;

        let searchResults = [];

        if (keyword && keyword.startsWith("@")) {
          // Remove the '@' character from the beginning of the query
          const usernameQuery = keyword.slice(1);
          const regex = new RegExp(usernameQuery, "i");

          searchResults = await User.findOne({
            username: { $regex: regex },
          }).populate({
            path: "mytweets",
            populate: {
              path: "userObjectId",
              model: "User",
            },
          });
        } else if (keyword) {
          // Search for users whose usernames or names match the query
          searchResults = await User.find({
            $or: [
              { username: { $regex: `.*${keyword}.*`, $options: "i" } },
              { name: { $regex: `.*${keyword}.*`, $options: "i" } },
            ],
          }).populate({
            path: "mytweets",
            populate: {
              path: "userObjectId",
              model: "User",
            },
          });
        } else {
          // Return all users if no query is provided
          searchResults = await User.find()
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
              path: "mytweets",
              populate: {
                path: "userObjectId",
                model: "User",
              },
            });
        }

        res.status(200).json({ success: true, data: searchResults });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    case "POST": // Create new User by input
      try {
        if (await User.exists({ username: String(req.body["username"]) })) {
          res
            .status(400)
            .json({ success: false, data: "Username already exist!" });
          break;
        }

        const user = await User.create({
          username: req.body["username"],
          name: req.body["name"],
          password: pwd(req.body["pw"]),
          userImg: req.body["userImg"],
          following: req.body["following"],
          follower: req.body["follower"],
        });

        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    case "PUT": // Update Password by username
      try {
        const username = req.body["username"];
        const password = pwd(req.body["password"]);

        // Find user
        let user = await User.exists({ username: username });
        if (!user) {
          res.status(400).json({ success: false, data: "User not found." });
          break;
        }

        // Update password
        user = await User.updateOne(
          { username: username },
          { $set: { password: password } }
        );
        if (user["modifiedCount"] == 0) {
          res
            .status(400)
            .json({ success: false, data: "Password is the same, no change." });
          break;
        }

        res.status(202).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    case "DELETE": // Delete User by username
      try {
        const user = await User.deleteOne({
          username: String(req.body["username"]),
        });
        res.status(202).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
