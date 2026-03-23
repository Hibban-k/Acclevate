// Seed script to create the first admin user
// Run with: npx tsx scripts/seed-admin.ts

import 'dotenv/config'; // Load .env file
import mongoose from 'mongoose';
import Admin from '../models/Admin';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/acclevate';

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI, { dbName: 'acclevate' });
        console.log('Connected to MongoDB');

        const email = process.env.ADMIN_EMAIL || 'admin@acclevate.com';
        const password = process.env.ADMIN_PASSWORD || 'admin123';
        const name = process.env.ADMIN_NAME || 'Admin';

        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            console.log('Admin already exists! Deleting and recreating...');
            await Admin.deleteOne({ email });
        }

        // Create admin - password will be hashed by Admin model's pre-save hook
        await Admin.create({
            email,
            password,
            name,
        });

        console.log('Admin created successfully!');
        console.log('Email:', email);

    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

seedAdmin();
