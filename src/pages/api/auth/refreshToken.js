/*
 * -----------------------------
 * File - refreshToken.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Refresh the access token by the refresh token in the request.
 * -----------------------------
 */
import dbConnect from '../../../_unsorted/database/dbConnect'
import jwt from 'jsonwebtoken'
import { getRefTokenByUsername } from '../../../_unsorted/util/queryUtil'

export default async function handler(req, res) {

  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  const generateAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });

  // api/users
  switch (method) {
    case 'POST': // Create new User by input
      try {
        const refreshToken = req.body.refreshToken
        // 401: Unauthorized, this request did not send a token
        if (!refreshToken)
          return res.status(401).json({ success: false, data: "No token provided!" })
     
        // db
        // If the client's token does not have a match
        if (await getRefTokenByUsername(req.body.username) != refreshToken)
        // if (!refreshTokens.includes(refreshToken))
          return res.status(403).json({ success: false, data: "No match for token!" })
    
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
          // 403: Forbidden, this request is invalid(invalid/outdated token)
          if (err)
            return res.status(403).json({ success: false, data: "Invalid token!" })
    
          const accessToken = generateAccessToken({ name: user.name })
          return res.status(201).json({ success: true, data: { accessToken: accessToken } })
        })
      } catch (error) {
        res.status(400).json({ success: false, data: {error: error} })
      }
      break

    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
