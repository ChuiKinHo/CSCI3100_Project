import { User, Admin, Token } from "../database/schemas";

// User
async function getUserId(username) {
  let res = await User.exists({ username: username });
  return res == null ? null : res._id;
}

async function loginQuery(username, password) {
  return await User.exists({ username: username, password: password });
}

async function adminLoginQuery(username, password) {
  return await Admin.exists({ username: username, password: password });
}
// User

// Token
async function getRefTokenByUserId(id) {
  let res = await Token.findOne({ userid: id }, 'refreshToken');
  return res == null ? null : res.refreshToken;
}

async function getRefTokenByUsername(username) {
  const id = await getUserId(username);
  return id == null ? null : getRefTokenByUserId(id);
}

async function deleteToken(username) {
  const id = await getUserId(username);
  return id == null ? null : await Token.deleteMany({ userid: id });
}

async function addToken(username, accessToken, refreshToken) {
  const id = await getUserId(username);
  if (id == null)
    return null;

  if (!await Token.exists({ userid: id }))
    return await Token.create({ userid: id, accessToken: accessToken, refreshToken: refreshToken })
  return await Token.findOneAndUpdate({ userid: id }, { accessToken: accessToken, refreshToken: refreshToken })
}
// Token;

export { getUserId, loginQuery, adminLoginQuery, getRefTokenByUserId, getRefTokenByUsername, deleteToken, addToken };