const mongoose = require('mongoose');

require('dotenv').config();

// MongoDB Atlas connection string
const MONGO_URL = process.env.MONGO_URL;

// Connection options for MongoDB Atlas (removed deprecated options)
const mongoOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connection.once('open', () => {
  console.log('✅ MongoDB Atlas connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('reconnected', () => {
  console.log('🔄 MongoDB reconnected');
});

async function mongoConnect() {
  try {
    if (!MONGO_URL) {
      throw new Error('MONGO_URL environment variable is not set. Please check your .env file.');
    }
    
    console.log('🔌 Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URL, mongoOptions);
    console.log('✅ Successfully connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error.message);
    process.exit(1);
  }
}

async function mongoDisconnect() {
  try {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB Atlas:', error.message);
  }
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}