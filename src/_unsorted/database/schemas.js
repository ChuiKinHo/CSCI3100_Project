/*
Contains the Schemas for the database
*/

/* References:
Using Mongoose with Next.js 11
https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

Mongoose/NextJS - Model is not defined / Cannot overwrite model once compiled
https://stackoverflow.com/questions/62440264/mongoose-nextjs-model-is-not-defined-cannot-overwrite-model-once-compiled
*/

import mongoose from 'mongoose'

// Connect to the database and create the models
mongoose.connect(process.env.MONGODB_DATA_API_URL);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  following: { type: Array },
  follower: { type: Array },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

const AdminSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

const TweetSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  author: { type: String, required: true, ref: "User" },
  postTime: { type: Date, required: true },
  text: { type: String, required: true },
  timelineId: { type: Number, required: true },
  likeCount: { type: Number, required: true },
  dislikeCount: { type: Number, required: true },
  reweetTo: { type: Number, ref: "Tweet" },
});
const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);

const ReplySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  author: { type: String, required: true, ref: "User" },
  tweetId: { type: Number, required: true, ref: "Tweet" },
  actionTime: { type: Date, required: true },
  reply: { type: String, required: true },
});
const Reply = mongoose.models.Reply || mongoose.model("Reply", ReplySchema);

const LikeDislikeSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  author: { type: String, required: true, ref: "User" },
  tweetId: { type: Number, required: true, ref: "Tweet" },
  actionTime: { type: Date, required: true },
  value: { type: Number, required: true }, // like or dislike, (dislike < (0 = neutral) < like), or (0 = neutral, 1 = like, -1 = dislike)
});
const LikeDislike = mongoose.models.LikeDislike || mongoose.model("LikeDislike", LikeDislikeSchema);

// Not used yet, preassumably for authentication, haven't looked into Auth0 yet, dunno if Auth0 can do tokens
const TokenSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true, ref: "User" },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});
const Token = mongoose.models.Token || mongoose.model("Token", TokenSchema);

module.exports = { User, Tweet, Admin, Reply, LikeDislike, Token };