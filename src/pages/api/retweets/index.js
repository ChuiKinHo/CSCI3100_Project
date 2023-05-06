/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: retweet api
 * -----------------------------
 */
import dbConnect from "../../../_unsorted/database/dbConnect";
import { Post } from "../../../_unsorted/database/schemas";
import { pwd } from "../../../_unsorted/util/utils";
import { Tweet } from "../../../_unsorted/database/schemas";
import { User } from "../../../_unsorted/database/schemas";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // Handle GET requests to retrieve a single tweet
  switch (method) {
    case "GET":
      try {
        let target_Tweet;
        const tweetid = req.query.tweetid;
        if (tweetid) {
          // Find the tweet with the specified ID
          let retweet_return = await Tweet.findOne({ id: tweetid });

          // Retrieve the original tweet and the user who posted it
          target_Tweet = await Tweet.findOne({
            id: retweet_return.targetTweetId,
          }).populate("userObjectId", "username name usrImg -_id");
        }

        // Send the retrieved tweet as a JSON response
        res.status(200).json({ success: true, data: target_Tweet });
      } catch (error) {
        // Log and send an error response if an error occurs
        res.status(400).json({ success: false });
      }
      break;

    default:
      // Send an error response for invalid requests
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
