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
        let target_Tweet;
        const tweetid = req.query.tweetid;
        if (tweetid) {
          let retweet_return = await Tweet.findOne({ id: tweetid });
          target_Tweet = await Tweet.findOne({
            id: retweet_return.targetTweetId,
          }).populate("userObjectId", "username name usrImg -_id");
        }
        res.status(200).json({ success: true, data: target_Tweet });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;

    // case "POST": // Create new Post
    //   try {
    //     let retweetTo = NULL;
    //     if (req.body["retweetTo"]) {
    //       retweetTo = await Tweet.findOne({
    //         id: Number(req.body["retweetTo"]),
    //       });
    //     }

    //     if (await Tweet.exists({ username: Number(req.body["id"]) })) {
    //       res.status(400).json({ success: false, data: "id already exist!" });
    //       break;
    //     }

    //     const author = await User.findOne({
    //       username: String(req.body["author"]),
    //     });
    //     if (!author) {
    //       res.status(400).json({ success: false, data: "author not found!" });
    //       break;
    //     }

    //     const tweet = await Tweet.create({
    //       id: Number(req.body["id"]),
    //       userObjectId: author._id,
    //       // author: author.username,
    //       postTime: Date(req.body["postTime"]),
    //       text: String(req.body["text"]),
    //       timelineId: Number(req.body["timelineId"]),
    //       likeCount: 0,
    //       dislikeCount: 0,
    //       like_by_me: false,
    //       dislike_by_me: false,

    //       //FIXME: change later
    //       retweetTo: retweetTo._id,
    //     });

    //     res.status(201).json({ success: true, data: tweet });
    //   } catch (error) {
    //     res.status(400).json({ success: false, data: { error: error } });
    //   }
    //   break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
