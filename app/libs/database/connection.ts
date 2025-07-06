import mongoose from "mongoose";

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

declare global {
    var mongoose: MongooseCache | undefined;
};

const MONGODB_URI = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
    ? process.env.NEXT_API_MONGODB_URI_DEV!
    : process.env.NEXT_API_MONGODB_URI!;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

const globalCache = globalThis as typeof globalThis & { mongoose?: MongooseCache };

const cached: MongooseCache = globalCache.mongoose || {
    conn: null,
    promise: null,
};

export const connection = async (): Promise<typeof mongoose> => {
    if (cached.conn) {
        return cached.conn;
    };

    if (!cached.promise) {
        mongoose.set("debug", process.env.NODE_ENV === "development");

        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            maxPoolSize: 7,
            minPoolSize: 1,
        });
    };

    cached.conn = await cached.promise;
    globalCache.mongoose = cached;

    return cached.conn;
};