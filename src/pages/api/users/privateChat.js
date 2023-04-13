import dbConnect from "../../../_unsorted/database/dbConnect";
import { User, ChatMessage } from "../../../_unsorted/database/schemas";
import { getUserId } from "../../../_unsorted/util/queryUtil";

export default async function handler(req, res) {
  // Wait for database to connect before continuing
  const { method } = req;

  await dbConnect();

  const reqCheck = async req => {
    console.log(await req)
    console.log("ewqeq")
    const username = req.body.username
    console.log("ewq")
    const targetUsername = req.body.targetUsername
    console.log("ewq")
    if (!username || !targetUsername)
      return { success: false, data: { username, targetUsername, message: (!username ? "U" : "Targetu") + "ser cannot be empty!" } }

    const user = await getUserId(username)
    const targetUser = await getUserId(targetUsername)
    if (!user || !targetUser)
      return { success: false, data: { user, targetUser, message: (!username ? "U" : "Targetu") + "ser not found!" } }

    if (user == targetUser)
      return { success: false, data: { user, targetUser, message: "Cannot send message to yourself!" } }

    return { success: true, user, targetUser }

    // const username = req.body.username
    // const targetUsername = req.body.targetUsername
    // if (!username || !targetUsername)
    //   return res.status(400).json({ success: false, data: { username, targetUsername, message: (!username ? "U" : "Targetu") + "ser cannot be empty!" } })

    // const user = await getUserId(username)
    // const targetUser = await getUserId(targetUsername)
    // if (!user || !targetUser)
    //   return res.status(400).json({ success: false, data: { user, targetUser, message: (!username ? "U" : "Targetu") + "ser not found!" } })
  }

  // api/users
  switch (method) {
    case "GET":
      try {
        console.log(await req)
        console.log("ewqeq")
        // req: { username, targetUsername }
        const req = reqCheck(req)
        if (!req.success)
          return res.status(400).json(req)


        const user = req.user
        const targetUser = req.targetUser

        const messages = await ChatMessage.get({ $or: [{ user: user, targetUser: targetUser }, { user: targetUser, targetUser: user }] }).sort({ timestamp: -1 })
        if (!messages)
          return res.status(200).json({ success: true, data: { user, targetUser, message: "Be the first one who go first!" } })

        res.status(200).json({ success: true, data: { user, targetUser, messages } });
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    case "POST": // Create new User by input
      try {
        // req: { username, targetUsername, message }
        const req = reqCheck(req)
        if (!req.success)
          return res.status(400).json(req)

        const user = req.user
        const targetUser = req.targetUser

        const query = await ChatMessage.create({ user: user, targetUser: targetUser, message: req.body.message })
        if (!query)
          return res.status(400).json({ success: false, data: { user, targetUser, message: "Failed to create new message!" } })

        res.status(200).json({ success: true, data: { user, targetUser, query } });
      } catch (error) {
        res.status(403).json({ success: false, data: { error: error } });
      }
      break;

    case "PUT": // Update Password by username
      try {
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    case "DELETE": // Delete User by username
      try {
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } });
      }
      break;

    default:
      res.status(400).json({ success: false, data: "Invalid request!" });
      break;
  }
}
