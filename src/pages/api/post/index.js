import dbConnect from "../../../_unsorted/database/dbConnect";
import { Post } from "../../../_unsorted/database/schemas";
import { pwd } from "../../../_unsorted/util/utils";
import { Tweet } from "../../../_unsorted/database/schemas";
import { User } from "../../../_unsorted/database/schemas";
const crypto = require("crypto");

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const data = req.body;
        //console.log(data);
        let newId = "";
        let exists = true;

        // Loop until a unique string is generated
        const user = await User.findOne({ username: data.username });
        if (user) {
          while (exists) {
            // Generate a random string of 8 characters
            newId = crypto.randomBytes(4).toString("hex");

            // Check if the generated string already exists in the database
            const existingUser = await Tweet.findOne({ id: newId });
            if (!existingUser) {
              exists = false;
            }
          }
          const newTweet = {
            id: newId,
            img: data.img === null ? "" : data.img,
            text: data.input,
            likeCount: 0,
            dislikeCount: 0,
            retweet: data.retweet === null ? false : data.retweet,
            commentId: [],
            targetTweetId:
              data.targetTweetId === null || data.targetTweetId.length === 0
                ? null
                : data.targetTweetId.toString(),
            userObjectId: user._id,
          };
          //console.log(newTweet);
          let createdTweet;
          await Tweet.create(newTweet)
            .then((result) => {
              createdTweet = result;
              //console.log(createdTweet);
            })
            .catch((err) => {
              console.error(err);
            });

          await User.updateOne(
            { _id: user._id },
            {
              $addToSet: { mytweets: createdTweet._id },
            },
            { upsert: true }
          );
          if (
            createdTweet.targetTweetId !== null &&
            createdTweet.retweet === false
          ) {
            await Tweet.updateOne(
              { id: createdTweet.targetTweetId },
              {
                $addToSet: { commentId: createdTweet.id },
              },
              { upsert: true }
            );
          }
          res.status(200).json({ success: true, data: createdTweet });
        }
      } catch (error) {
        res
          .status(400)
          .json({ success: false, data: { error: error.toString() } });
        console.log(error.toString());
      }
      break;
  }
}
