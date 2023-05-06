/*
 * -----------------------------
 * File - privateChat.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: privateChat api
 * -----------------------------
 */
import dbConnect from "../../../_unsorted/database/dbConnect";
import { User, ChatMessage } from "../../../_unsorted/database/schemas";
import { getUserId } from "../../../_unsorted/util/queryUtil";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // api/users
  switch (method) {
    case "PUT":
      try {
        const username = req.body.username;
        const targetUsername = req.body.targetUsername;
        if (!username || !targetUsername)
          return res.status(400).json({
            success: false,
            data: {
              username,
              targetUsername,
              message: (!username ? "U" : "Targetu") + "ser cannot be empty!",
            },
          });

        const user = await User.findOne({ username: username });
        const targetUser = await User.findOne({ username: targetUsername });
        if (!user || !targetUser)
          return res.status(400).json({
            success: false,
            data: {
              user,
              targetUser,
              message: (!user ? "U" : "Targetu") + "ser not found!",
            },
          });
        if (user == targetUser)
          return res.status(400).json({
            success: false,
            data: {
              user,
              targetUser,
              message: "Cannot send message to yourself!",
            },
          });

        const messages = await ChatMessage.find({
          $or: [
            { user: user._id, targetUser: targetUser._id },
            { user: targetUser._id, targetUser: user._id },
          ],
        }).sort({ timestamp: 1 });
        if (!messages)
          return res.status(200).json({
            success: true,
            data: {
              user,
              targetUser,
              message: "Be the first one who go first!",
            },
          });

        res
          .status(200)
          .json({ success: true, data: { user, targetUser, messages } });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    case "POST": // Create new User by input
      try {
        // req: { username, targetUsername, message }
        const username = req.body.username;
        const targetUsername = req.body.targetUsername;
        if (!username || !targetUsername)
          return res.status(400).json({
            success: false,
            data: {
              username,
              targetUsername,
              message: (!username ? "U" : "Targetu") + "ser cannot be empty!",
            },
          });

        const user = await User.findOne({ username: username });
        const targetUser = await User.findOne({ username: targetUsername });
        if (!user || !targetUser)
          return res.status(400).json({
            success: false,
            data: {
              user,
              targetUser,
              message: (!user ? "U" : "Targetu") + "ser not found!",
            },
          });
        if (user == targetUser)
          return res.status(400).json({
            success: false,
            data: {
              user,
              targetUser,
              message: "Cannot send message to yourself!",
            },
          });

        const query = await ChatMessage.create({
          user: user._id,
          targetUser: targetUser._id,
          message: req.body.message,
        });
        if (!query)
          return res.status(400).json({
            success: false,
            data: {
              user,
              targetUser,
              message: "Failed to create new message!",
            },
          });

        res
          .status(200)
          .json({ success: true, data: { user, targetUser, query } });
      } catch (error) {
        res.status(403).json({ success: false, data: { error: error } });
      }
      break;

    // case "PUT":
    //   try {
    //   } catch (error) {
    //     res.status(400).json({ success: false, data: { error: error } });
    //   }
    //   break;

    // case "DELETE":
    //   try {
    //   } catch (error) {
    //     res.status(400).json({ success: false, data: { error: error } });
    //   }
    //   break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
