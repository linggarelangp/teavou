import mongoose from "mongoose";

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    var mongoose: MongooseCache | undefined;
};

const MONGODB_URI = process.env.NODE_ENV === "development" ?
    process.env.NEXT_API_MONGODB_URI_DEV! :
    process.env.NEXT_API_MONGODB_URI!;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

const globalCache = globalThis as typeof globalThis & { mongoose?: MongooseCache };

const cached: MongooseCache = globalCache.mongoose || {
    conn: null,
    promise: null,
};

async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        console.log("🟡 MongoDB from cache");
        return cached.conn;
    };

    if (!cached.promise) {
        console.log("🔵 Connecting to MongoDB...");
        mongoose.set("debug", process.env.NODE_ENV === "development");

        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    };

    cached.conn = await cached.promise;
    globalCache.mongoose = cached;

    console.log("MongoDB connected!");

    return cached.conn;
};

export default dbConnect;