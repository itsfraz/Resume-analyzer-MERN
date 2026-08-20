const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
    try {
        let uri = process.env.MONGO_URI || 'mongodb://localhost:27017/resume-analyzer';
        try {
            const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (err) {
            console.log(`Standard MongoDB connection failed. Starting in-memory database...`);
            const mongoServer = await MongoMemoryServer.create();
            uri = mongoServer.getUri();
            const conn = await mongoose.connect(uri);
            console.log(`MongoDB In-Memory Connected: ${conn.connection.host}`);
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
