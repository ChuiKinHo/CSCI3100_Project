/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import dbConnect from "../../../_unsorted/database/dbConnect";
import { User } from "../../../_unsorted/database/schemas";
import { pwd } from "../../../_unsorted/util/utils";
import { uploadImage } from "../../../_unsorted/imageRelated/cloudinary/cloudinary";
import fs from "fs";

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

          searchResults = await User.findOne({
            username: usernameQuery,
          })
            .populate({
              path: "mytweets",
              populate: {
                path: "userObjectId",
                model: "User",
              },
              options: {
                sort: { timestamp: -1 }, // Sort tweets in descending order
              },
            })
            .populate({
              path: "follower",
              select: "username",
              populate: {
                path: "following",
                model: "User",
                select: "username",
              },
            });
        } else if (keyword) {
          // Search for users whose usernames or names match the query
          searchResults = await User.find({
            $or: [
              { username: { $regex: `.*${keyword}.*`, $options: "i" } },
              { name: { $regex: `.*${keyword}.*`, $options: "i" } },
            ],
          })
            .populate({
              path: "mytweets",
              populate: {
                path: "userObjectId",
                model: "User",
              },
            })
            .populate({
              path: "follower",
              select: "username",
              populate: {
                path: "following",
                model: "User",
                select: "username",
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
            .status(200)
            .json({ success: false, data: "Username already exist!" });
          break;
        } else {
          const tweet = await User.create({
            username: String(req.body["username"]),
            name: String(req.body["name"]),
            password: pwd(String(req.body["password"])),
            usrImg: String(req.body["img"]),
            following: [],
            follower: [],
            mytweets: [],
            likes: [],
            dislikes: [],
          });
          res.status(200).json({ success: true });
        }
      } catch (error) {
        res.status(403).json({ success: false, data: { error: error } });
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
