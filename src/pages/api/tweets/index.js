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
        const tweetid = req.query.q; // Get the tweetid parameter from the request URL
        let tweets;
        if (tweetid) {
          tweets = await Tweet.findOne({ id: tweetid }).populate(
            "userObjectId",
            "username name usrImg -_id"
          );
        } else {
          tweets = await Tweet.find().populate(
            "userObjectId",
            "username name usrImg -_id"
          );
        }
        res.status(200).json({ success: true, data: tweets });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
