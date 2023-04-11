/*
Snippet from old projects, not compatible but algorithm should be useable.
 */

// require('dotenv').config()
const { env, authServerPort } = require("../utils/EnvExpress")
const { db } = require('../utils/Schemas');
const { loginQuery, getRefTokenByUsername, deleteToken, addToken } = require('../utils/Queries')

const express = require('express')
const app = express()
app.use(express.json())

const jwt = require('jsonwebtoken');
const { pwd } = require('../utils/UtilsExpress')


db.on("error", console.error.bind(console, "Connection error:"));

const generateAccessToken = user => jwt.sign(user, env.ACCESS_TOKEN_KEY, { expiresIn: env.ACCESS_TOKEN_EXPIRE_TIME });

// Apps.
// Authenticate User
function login() {
  app.post('/login', async (req, res) => {
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
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
  })
}

function logout() {
  app.delete('/logout', async (req, res) => {
    // db
    // Remove the token in refreshTokens by the refresh token in the request.
    // await deleteToken(req.body.name, req.body.refreshToken)
    await deleteToken(req.body.username)
    // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    // 204: No Content, this request is successfully executed and the token is removed 
    res.sendStatus(204)
  })
}
 
function refreshToken() {
  app.post('/refreshToken', async (req, res) => {
    const refreshToken = req.body.refreshtoken
    // 401: Unauthorized, this request did not send a token
    if (refreshToken == null)
      return res.sendStatus(401)
 
    // db
    // If the client's token does not have a match
    if (await getRefTokenByUsername(req.body.username) != refreshToken)
    // if (!refreshTokens.includes(refreshToken))
      return res.sendStatus(403)

    jwt.verify(refreshToken, env.REFRESH_TOKEN_KEY, (err, user) => {
      // 403: Forbidden, this request is invalid(invalid/outdated token)
      if (err)
        return res.sendStatus(403)

      const accessToken = generateAccessToken({ name: user.name })
      res.json({ accessToken: accessToken })
    })
  })
}

function authenticate() {
  app.all('/authenticate', authenticateToken, (req, res) => {
    res.send("1")
  })
}

// Usage:
// const { authenticateToken } = require('./authServer')
// app.get('/posts', authenticateToken, (req, res) => {
//   Normal stuff...
// })
function authenticateToken(req, res, next) {
  const header = req.headers['authorization']
  // If header is undefined, then token is undefined too
  const token = header && header.split(' ')[1]
  // 401: Unauthorized, this request did not send a token
  if (token == null){
    return res.sendStatus(401)
  }

  jwt.verify(token, env.ACCESS_TOKEN_KEY, (err, user) => {
    // console.log(err)
    // 403: Forbidden, this request is invalid(invalid/outdated token)
    if (err)
      return res.sendStatus(403)
    req.user = user
    next()
  })
}

db.once("open", () => {
  const cors = require("cors");
  app.use(cors());
  
  authenticate()
  refreshToken()
  logout()
  login()
});

app.listen(authServerPort)

// module.exports = { authenticateToken }
