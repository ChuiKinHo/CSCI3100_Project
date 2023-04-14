import dbConnect from "../../../_unsorted/database/dbConnect";
import { User, ChatMessage } from "../../../_unsorted/database/schemas";
import { getUserId } from "../../../_unsorted/util/queryUtil";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  // const reqCheck = async (r) => {
  //   console.log("aaa")
  //   console.log(await r)
  //   console.log("aaa")
  //   const username = r.body.username
  //   const targetUsername = r.body.targetUsername
  //   if (!username || !targetUsername)
  //     return { success: false, data: { username, targetUsername, message: (!username ? "U" : "Targetu") + "ser cannot be empty!" } }

  //   const user = await getUserId(username)
  //   const targetUser = await getUserId(targetUsername)
  //   if (!user || !targetUser)
  //     return { success: false, data: { user, targetUser, message: (!username ? "U" : "Targetu") + "ser not found!" } }

  //   if (user == targetUser)
  //     return { success: false, data: { user, targetUser, message: "Cannot send message to yourself!" } }

  //   return { success: true, user, targetUser }

  //   // const username = req.body.username
  //   // const targetUsername = req.body.targetUsername
  //   // if (!username || !targetUsername)
  //   //   return res.status(400).json({ success: false, data: { username, targetUsername, message: (!username ? "U" : "Targetu") + "ser cannot be empty!" } })

  //   // const user = await getUserId(username)
  //   // const targetUser = await getUserId(targetUsername)
  //   // if (!user || !targetUser)
  //   //   return res.status(400).json({ success: false, data: { user, targetUser, message: (!username ? "U" : "Targetu") + "ser not found!" } })
  // }

  // api/users
  switch (method) {
    // const req = await reqCheck(req)
    // if (!req.success)
    //   return res.status(400).json(req)
    case "PUT":
      try {
        // req: { username, targetUsername }
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
        console.log("ewqe465q");
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
