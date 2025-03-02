import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testMongoConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log(`URI: ${process.env.MONGODB_URI}`);
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('MongoDB Connection Successful!');
    console.log(`Connected to: ${mongoose.connection.host}:${mongoose.connection.port}`);
    console.log(`Database: ${mongoose.connection.name}`);
    
    // Check if collections exist
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:');
    if (collections.length === 0) {
      console.log('No collections found. They will be created automatically when data is inserted.');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
    
    console.log('\nSetup complete! Your database is ready to use.');
    
    // Close the connection
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
    
  } catch (error) {
    console.error('MongoDB Connection Failed:', error.message);
    process.exit(1);
  }
}

testMongoConnection();
