/*
 * -----------------------------
 * File - getAllUsers.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
import dbConnect from "../../../_unsorted/database/dbConnect";
import { User } from "../../../_unsorted/database/schemas";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // Handle GET requests to retrieve a list of users
  //api/users
  switch (method) {
    case "GET":
      try {
        // Retrieve all users from the database and populate the follower, following, and mytweets fields for each user
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

        // Send the retrieved users as a JSON response
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        // Log and send an error response if an error occurs
        res.status(400).json({ success: false, data: error });
      }
      break;

    default:
      // Send an error response for invalid requests
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
