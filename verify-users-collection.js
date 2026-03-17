const mongoose = require('mongoose');

const verifyUsersCollection = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/lms-db');

        const collections = await conn.connection.db.listCollections().toArray();
        const usersCollection = collections.find(c => c.name === 'users');

        if (usersCollection) {
            console.log('✅ The users collection exists.');
        } else {
            console.log('❌ The users collection does not exist.');
        }

        await conn.connection.close();
    } catch (error) {
        console.error('MongoDB Verification Error:', error.message);
    }
};

verifyUsersCollection();