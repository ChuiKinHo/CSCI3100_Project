/*
 * -----------------------------
 * File - schemas.js
 * Author: Chui Kin Ho, Chow Tsz Ching, Dingcheng Wang, Heung Tsz Kit, Tanja Impens
 * Date: May  5 2023, 11:08:51 PM
 * Version: 1.0
 * Description: Schemas for the database
 * -----------------------------
 */
/*
Contains the Schemas for the database
*/

/* References:
Using Mongoose with Next.js 11
https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c

Mongoose/NextJS - Model is not defined / Cannot overwrite model once compiled
https://stackoverflow.com/questions/62440264/mongoose-nextjs-model-is-not-defined-cannot-overwrite-model-once-compiled
*/

import mongoose from "mongoose";

// Connect to the database and create the models
mongoose.connect(process.env.MONGODB_DATA_API_URL);

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  usrImg: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  follower: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  mytweets: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tweet",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tweet",
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tweet",
  },
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

const AdminSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

const TweetSchema = new mongoose.Schema({
  // _id: { type: mongoose.Schema.Types.ObjectId, reuqired: true },
  id: { type: String, required: true, unique: true },
  userObjectId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  timestamp: { type: Date, required: true, default: Date.now },
  img: { type: String, required: false },
  text: { type: String, required: true },
  // timelineId: { type: Number, required: true },
  likeCount: { type: Number, required: true, default: 0 },
  dislikeCount: { type: Number, required: true, default: 0 },
  retweet: { type: Boolean, required: true, default: false },
  commentId: { type: Array, required: true, default: [] },
  targetTweetId: { type: String, require: true, default: null }, //the targeted retweet
  private: { type: Boolean, require: true, default: false },
});
const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", TweetSchema);

const ChatMessageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  targetUser: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  message: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});
const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", ChatMessageSchema);

// Not used yet, preassumably for authentication, haven't looked into Auth0 yet, dunno if Auth0 can do tokens
const TokenSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true, ref: "User" },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
});
const Token = mongoose.models.Token || mongoose.model("Token", TokenSchema);

module.exports = { User, Tweet, Admin, ChatMessage, Token };
