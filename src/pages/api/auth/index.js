import jwt from 'jsonwebtoken'

export default async function handler(req, res) {

  const header = req.headers['authorization']
  // If header is undefined, then token is undefined too
  const token = header && header.split(' ')[1]

  // 401: Unauthorized, this request did not send a token
  if (!token)
    return res.status(401).send('Unauthorized')

  try{
    res.status(200).json({ data: jwt.verify(token, process.env.ACCESS_TOKEN_KEY) })
  } catch (err) {
    // 403: Forbidden, this request is invalid(invalid/outdated token)
    res.status(403).send('Forbidden')
  }
}
