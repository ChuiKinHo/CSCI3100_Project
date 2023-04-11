import dbConnect from '../../../_unsorted/database/dbConnect'
import { User } from '../../../_unsorted/database/schemas'
import { pwd } from '../../../_unsorted/util/utils'

export default async function handler(req, res) {
  
  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  // api/auth/login
  switch (method) {
    case 'POST': // Create new User by input
      try {
        // Link to login form
        const user = { name: req.body.username }
        const password = pwd(req.body.password);

        if (!await loginQuery(user.name, password))
          // 401: Unauthorized, this request has the wrong username password pair
          return res.sendStatus(401)

        // Access Token generation
        const accessToken = generateAccessToken({ name: user.name })
        
        // Refresh Token generation
        const refreshToken = jwt.sign(user, env.REFRESH_TOKEN_KEY)
        
        // db
        await addToken(user.name, accessToken, refreshToken)

        // refreshTokens.push(refreshToken)

        // Respond with Access Token and Refresh Token for client to store


        res.status(201).json({ success: true, data: user })
      } catch (error) {
        res.status(400).json({ success: false, data: {error: error} })
      }
      break
    
    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
