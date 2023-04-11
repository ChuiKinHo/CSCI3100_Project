import dbConnect from '../../../_unsorted/database/dbConnect'
// import cloudinary from '../../_unsorted/imageRelated/cloudinary/cloudinary';

import { User } from '../../../_unsorted/database/schemas'
import { pwd } from '../../../_unsorted/util/utils'

export default async function handler(req, res) {

  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  // api/users
  switch (method) {
    case 'GET': // Get all Users
      try {
        const users = await User.find({});

        res.status(200).html({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST': // Create new User by input
      try {
        if (await User.exists({ username: String(req.body["username"]) })){
          res.status(400).json({ success: false, data: "Username already exist!"})
          break
        }

        const user = await User.create({
          username: String(req.body["username"]),
          name: String(req.body["name"]),
          password: pwd(String(req.body["pw"])),
          following: req.body["following"],
          follower: req.body["follower"],
        })

        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, data: {error: error} })
      }
      break

    case 'PUT': // Update Password by username
      try {
        const username = req.body["username"]
        const password = pwd(req.body["password"])

        // Find user
        let user = await User.exists({ username: username })
        if (!user) {
          res.status(400).json({ success: false, data: "User not found." })
          break
        }

        // Update password
        user = await User.updateOne({ username: username }, { $set: { password : password } })
        if (user["modifiedCount"] == 0){
          res.status(400).json({ success: false, data: "Password is the same, no change." })
          break
        }

        res.status(202).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, data: {error: error} })
      }
      break

    case 'DELETE': // Delete User by username
      try {
        const user = await User.deleteOne({ username: String(req.body["username"]) });
        res.status(202).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, data: {error: error} })
      }
      break

    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
