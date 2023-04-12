import dbConnect from '../../../_unsorted/database/dbConnect'
import { pwd } from '../../../_unsorted/util/utils'
import jwt from 'jsonwebtoken'
import { getUserId, loginQuery, adminLoginQuery, getRefTokenByUserId, getRefTokenByUsername, deleteToken, addToken } from '../../../_unsorted/util/authUtil'
import { User, Token } from "../../../_unsorted/database/schemas";

export default async function handler(req, res) {
  
  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  const generateAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });

  // api/auth/login
  switch (method) {
    case 'POST': // Create new User by input
      try {
        // Link to login form
        const user = { name: req.body.username }
        const password = pwd(req.body.password);

        if (await adminLoginQuery(user.name, password))
          return res.status(201).json({ success: true, data: { admin: true } })

        if (!await loginQuery(user.name, password))
          // 401: Unauthorized, this request has the wrong username password pair
          return res.sendStatus(401)

        // Access Token generation
        const accessToken = generateAccessToken({ name: user.name })
        
        // Refresh Token generation
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_KEY)
        
        // db
        await addToken(user.name, accessToken, refreshToken)

        // refreshTokens.push(refreshToken)

        // Respond with Access Token and Refresh Token for client to store
        // res.status(201).json({ success: true, data: { accessToken: accessToken, refreshToken: refreshToken } })
        

        // Login for now, implement JWT tonight
        res.status(201).json({ success: true, data: { username: user.name, accessToken: accessToken, refreshToken: refreshToken } })
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } })
      }
      break
    
    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
