import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGODB_URL!;



if(!MONGODB_URL){
  throw new Error('Please define mongodb');
}

let cached = global.mongoose;

if(!cached){
  cached = global.mongoose = {conn: null, promise: null}
}

export async function connectToDatabase() {
  if(cached.conn){
    return cached.conn;
  }
  if(!cached.promise){
    const opts = {
      bufferCommands: false,
      maxPoolSize:10,
    }
    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongooseInstance) =>mongooseInstance.connection);
  }
  
  try {
    cached.conn = await cached.promise
    
  } catch (error) {
    cached.promise = null;
    throw error;
    
  }
  
  return cached.conn;
}