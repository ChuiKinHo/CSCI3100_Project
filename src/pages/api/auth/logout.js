import dbConnect from '../../../_unsorted/database/dbConnect'
import { deleteToken } from '../../../_unsorted/util/authUtil'


export default async function handler(req, res) {

  // Wait for database to connect before continuing
  const { method } = req

  await dbConnect()

  // api/auth/logout
  switch (method) {
    case 'DELETE': // Create new User by input
      try {
        // db
        // Remove the token in refreshTokens by the refresh token in the request.
        // await deleteToken(req.body.name, req.body.refreshToken)
        
        // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
        // 204: No Content, this request is successfully executed and the token is removed 
        const logout = await deleteToken(req.body.username)
        // console.log(logout)
        if (!logout.deletedCount)
          return res.status(400).json({ success: false, data: "You are not logged in!" })

        res.status(201).json({ success: true, data: logout })

        // res.status(201).json({ success: true, data: "You are logged out!" })
      } catch (error) {
        res.status(400).json({ success: false, data: { error: error } })
      }
      break

    default:
      res.status(400).json({ success: false, data: "Invalid request!" })
      break
  }
}
