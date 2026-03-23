import type { Mongoose } from 'mongoose';
import { DefaultSession } from 'next-auth';

// MongoDB cached connection
declare global {
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    } | undefined;
}

// NextAuth session extension
declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
        } & DefaultSession['user'];
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
    }
}

// Environment variables
declare namespace NodeJS {
    interface ProcessEnv {
        MONGODB_URI: string;
        NEXTAUTH_SECRET: string;
        NEXTAUTH_URL: string;
        SENDGRID_API_KEY: string;
        SENDGRID_FROM_EMAIL: string;
        ADMIN_NOTIFY_EMAIL: string;
    }
}

export { };
