import mongoose, { Mongoose } from 'mongoose';
import dns from 'node:dns';

// Fix Node.js DNS SRV lookup issues (querySrv ECONNREFUSED) on Windows/local network resolvers for MongoDB Atlas
try {
    dns.setDefaultResultOrder('ipv4first');
} catch {
    // Ignore error
}
try {
    dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch {
    // Ignore error
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

// Fallback seed list URI for Acclevate Atlas Cluster in case SRV DNS lookup is blocked by local network
const DIRECT_MONGODB_URI = process.env.DIRECT_MONGODB_URI ||
    'mongodb://acclevate:vBU1UoEaRh7S7RFh@ac-7w3vxlt-shard-00-00.mw3tdks.mongodb.net:27017,ac-7w3vxlt-shard-00-01.mw3tdks.mongodb.net:27017,ac-7w3vxlt-shard-00-02.mw3tdks.mongodb.net:27017/acclevate?ssl=true&authSource=admin&replicaSet=atlas-4cbvmp-shard-0&retryWrites=true&w=majority';

const cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}

export async function connectDB(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: 'acclevate',
            bufferCommands: false,
            maxPoolSize: 10,
        };

        cached.promise = mongoose.connect(MONGODB_URI!, opts)
            .catch(async (err) => {
                console.warn('MongoDB SRV connection failed, falling back to direct cluster seed list:', err.message);
                return mongoose.connect(DIRECT_MONGODB_URI, opts);
            })
            .then((mongooseInstance) => {
                return mongooseInstance;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;

