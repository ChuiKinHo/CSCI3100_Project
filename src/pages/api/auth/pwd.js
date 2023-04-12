import dbConnect from '../../../_unsorted/database/dbConnect'
import { User } from '../../../_unsorted/database/schemas'
import { pwd } from '../../../_unsorted/util/utils'
import jwt from 'jsonwebtoken'
import { getUserId, loginQuery, getRefTokenByUserId, getRefTokenByUsername, deleteToken, addToken } from '../../../_unsorted/util/authUtil'

export default async function handler(req, res) {
  
  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  // api/auth/login
  switch (method) {
    case 'GET': // Create new User by input
      try {
        res.status(201).json({ success: true, data: pwd(req.body.password) })
      } catch (error) {
        res.status(400).json({ success: false, data: {error: error} })
      }
      break
    
    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
