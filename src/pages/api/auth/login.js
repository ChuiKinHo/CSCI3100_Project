import dbConnect from '../../../_unsorted/database/dbConnect'
import { pwd, addToken } from '../../../_unsorted/util/authUtil'
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {

  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  const generateAccessToken = user => jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME });

  // api/users
  switch (method) {
    case 'POST':
      // Link to login form
      const user = { name: req.body.username }

      const password = pwd(req.body.password);
      if (!await (user.name, password))
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
      res.json({ accessToken: accessToken, refreshToken: refreshToken })
      break

    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
