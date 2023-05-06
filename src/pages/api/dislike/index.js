/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description:
 * -----------------------------
 */
// Import necessary dependencies and modules
import dbConnect from "../../../_unsorted/database/dbConnect";
import { Post } from "../../../_unsorted/database/schemas";
import { pwd } from "../../../_unsorted/util/utils";
import { Tweet } from "../../../_unsorted/database/schemas";
import { User } from "../../../_unsorted/database/schemas";

// Define the API endpoint handler function
export default async function handler(req, res) {
  const { method } = req;

  // Connect to the database
  await dbConnect();

  // Handle PUT requests to toggle a dislike for a tweet by a user
  switch (method) {
    case "PUT":
      try {
        // Get the tweetid and username parameters from the request URL
        const tweetid = req.query.tweetid; // Get the tweetid parameter from the request URL
        const username = req.query.username;

        // Declare variables to store the tweet and dislike information
        let tweets;
        let dislike;

        // If both tweetid and username parameters are present
        if (tweetid && username) {
          // Find the tweet by its id and populate its userObjectId field with the user's username, name, and usrImg properties
          tweets = await Tweet.findOne({ id: tweetid }).populate(
            "userObjectId",
            "username name usrImg -_id"
          );

          // Get the MongoDB ObjectId of the tweet document
          const postId = tweets._id;

          // Check if the user has already disliked the tweet by searching for the tweet's id in the dislikes array of the user's document
          dislike = await User.findOne({
            username: username,
            dislikes: { $elemMatch: { $eq: postId } },
          });

          // If the user has already disliked the tweet
          if (dislike) {
            // Remove the tweet's id from the dislikes array of the user's document
            await User.updateOne(
              { username: username },
              { $pull: { dislikes: tweets._id } }
            );

            // Decrement the tweet's dislikeCount property by 1
            await Tweet.updateOne(
              { id: tweetid },
              { $inc: { dislikeCount: -1 } }
            );
          }
          // If the user has not disliked the tweet
          else {
            // Add the tweet's id to the dislikes array of the user's document
            await User.updateOne(
              { username: username },
              { $addToSet: { dislikes: tweets._id } }
            );

            // Increment the tweet's dislikeCount property by 1
            await Tweet.updateOne(
              { id: tweetid },
              { $inc: { dislikeCount: +1 } }
            );
          }
        }

        // Return a JSON response indicating that the operation was successful
        res.status(200).json({ success: true });
      } catch (error) {
        // If an error occurred, log it to the console and return a JSON response indicating that the operation was unsuccessful
        res.status(400).json({ success: false });
      }
      break;

    default:
      // If the request method is not PUT, return a JSON response indicating that the request is invalid
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
