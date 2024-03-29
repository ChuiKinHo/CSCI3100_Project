/*
 * -----------------------------
 * File - index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Like a tweet
 * -----------------------------
 */
import dbConnect from "../../../_unsorted/database/dbConnect";
import { Post } from "../../../_unsorted/database/schemas";
import { pwd } from "../../../_unsorted/util/utils";
import { Tweet } from "../../../_unsorted/database/schemas";
import { User } from "../../../_unsorted/database/schemas";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // api/users
  switch (method) {
    case "PUT":
      try {
        const tweetid = req.query.tweetid; // Get the tweetid parameter from the request URL
        const username = req.query.username;
        let tweets;
        let like;
        if (tweetid && username) {
          tweets = await Tweet.findOne({ id: tweetid }).populate(
            "userObjectId",
            "username name usrImg -_id"
          );
          const postId = tweets._id;

          like = await User.findOne({
            username: username,
            likes: { $elemMatch: { $eq: postId } },
          });
          if (like) {
            await User.updateOne(
              { username: username },
              { $pull: { likes: tweets._id } }
            );
            await Tweet.updateOne({ id: tweetid }, { $inc: { likeCount: -1 } });
          } else {
            await User.updateOne(
              { username: username },
              { $addToSet: { likes: tweets._id } }
            );
            await Tweet.updateOne({ id: tweetid }, { $inc: { likeCount: +1 } });
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
