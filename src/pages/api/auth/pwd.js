/*
 * -----------------------------
 * File - pwd.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Password hashing function
 * -----------------------------
 */
import dbConnect from '../../../_unsorted/database/dbConnect'
import { pwd } from '../../../_unsorted/util/utils'

export default async function handler(req, res) {
  
  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  // api/auth/pwd
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
