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
        let dislike;
        if (tweetid && username) {
          tweets = await Tweet.findOne({ id: tweetid }).populate(
            "userObjectId",
            "username name usrImg -_id"
          );
          const postId = tweets._id;

          dislike = await User.findOne({
            username: username,
            dislikes: { $elemMatch: { $eq: postId } },
          });
          if (dislike) {
            await User.updateOne(
              { username: username },
              { $pull: { dislikes: tweets._id } }
            );
            await Tweet.updateOne(
              { id: tweetid },
              { $inc: { dislikeCount: -1 } }
            );
            // console.log(-1);
          } else {
            await User.updateOne(
              { username: username },
              { $addToSet: { dislikes: tweets._id } }
            );
            await Tweet.updateOne(
              { id: tweetid },
              { $inc: { dislikeCount: +1 } }
            );
            // console.log(+1);
          }
        }
        res.status(200).json({ success: true });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
