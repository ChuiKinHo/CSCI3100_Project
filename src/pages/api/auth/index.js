import dbConnect from '../../../_unsorted/database/dbConnect'
import { User } from '../../../_unsorted/database/schemas'
import { pwd } from '../../../_unsorted/util/utils'

export default async function handler(req, res) {
  
  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  // api/users
  switch (method) {
    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
