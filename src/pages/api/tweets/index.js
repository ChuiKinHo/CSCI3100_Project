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
        const tweetid = req.query.tweetid; // Get the tweetid parameter from the request URL
        const username = req.query.username;
        let tweets;
        let like;
        let dislike;
        //checking if the user liked specific tweet with tweetid
        if (tweetid && username) {
          tweets = await Tweet.findOne({ id: tweetid }).populate(
            "userObjectId",
            "username name usrImg -_id"
          );
          const postId = tweets._id;
          const plainTweet = tweets.toObject();

          like = await User.findOne({
            username: username,
            likes: { $elemMatch: { $eq: postId } },
          });
          if (like) {
            plainTweet.like_by_me = true;
            tweets = plainTweet;
          } else {
            plainTweet.like_by_me = false;
            tweets = plainTweet;
          }

          dislike = await User.findOne({
            username: username,
            dislikes: { $elemMatch: { $eq: postId } },
          });

          if (dislike) {
            tweets.dislike_by_me = true;
          } else {
            tweets.dislike_by_me = false;
          }
        } else {
          //finding with one specific tweet id and populate the entries
          if (tweetid) {
            tweets = await Tweet.findOne({ id: tweetid }).populate(
              "userObjectId",
              "username name usrImg -_id"
            );
          } else {
            //For timeline only and sorted with timestamp
            if (username) {
              tweets = await User.findOne({ username: "user0" })
                .populate({
                  path: "following",
                  select: "mytweets -_id",
                  populate: {
                    path: "mytweets",
                    model: "Tweet",
                    select: "-_id",
                  },
                })
                .select("-_id following");

              const emptyTweets = [];

              tweets.following.forEach((item) => {
                if (item.mytweets.length === 0) {
                } else {
                  item.mytweets.forEach((tweet) => {
                    emptyTweets.push(tweet);
                  });
                }
              });

              tweets = emptyTweets.sort(
                (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
              );
            } else {
              //Fetching all tweets
              tweets = await Tweet.find().populate(
                "userObjectId",
                "username name usrImg -_id"
              );
            }
          }
        }
        res.status(200).json({ success: true, data: tweets });
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
