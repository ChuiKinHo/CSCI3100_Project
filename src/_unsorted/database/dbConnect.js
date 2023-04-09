import mongoose from 'mongoose'

/** 
Source : 
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

async function dbConnect() {
  const MONGODB_DATA_API_URL = process.env.MONGODB_DATA_API_URL

  if (!MONGODB_DATA_API_URL)
    throw new Error('Cannot find MONGODB_DATA_API_URL .env.local')

  /**
   * Global is used here to maintain a cached connection across hot reloads
   * in development. This prevents connections growing exponentially
   * during API Route usage.
   */
  let cached = await global.mongoose

  if (!cached)
    cached = global.mongoose = { conn: null, promise: null }

  if (cached.conn)
    return cached.conn

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true
    }
    cached.promise = mongoose.connect(MONGODB_DATA_API_URL, opts).then(mongoose => mongoose)
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
