/*
 * -----------------------------
 * File - ____index.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: tweets api
 * -----------------------------
 */
import dbConnect from "../../../_unsorted/database/dbConnect";
import { Tweet } from "../../../_unsorted/database/schemas";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // api/retweets
  switch (method) {
    case "POST": // Create new Post
      try {
        let retweetTo = NULL;
        if (req.body["retweetTo"]) {
          retweetTo = await Tweet.findOne({
            id: Number(req.body["retweetTo"]),
          });
        }

        if (await Tweet.exists({ username: Number(req.body["id"]) })) {
          res.status(400).json({ success: false, data: "id already exist!" });
          break;
        }

        const author = await User.findOne({
          username: String(req.body["author"]),
        });
        if (!author) {
          res.status(400).json({ success: false, data: "author not found!" });
          break;
        }

        const tweet = await Tweet.create({
          id: Number(req.body["id"]),
          author: author.username,
          postTime: Date(req.body["postTime"]),
          text: String(req.body["text"]),
          timelineId: Number(req.body["timelineId"]),
          likeCount: 0,
          dislikeCount: 0,
          retweetTo: retweetTo.id,
        });

        res.status(201).json({ success: true, data: tweet });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    case "DELETE": // Delete a post by id
      try {
        const tweet = await Tweet.deleteOne({ id: Number(req.body["id"]) });
        res.status(202).json({ success: true, data: tweet });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
