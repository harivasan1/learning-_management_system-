const mongoose = require('mongoose');
const User = require('./lms-full-st/server/models/User');

const testUserModel = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/lms-db');

        const user = await User.findOne({ email: 'sampleuser@example.com' });
        if (user) {
            console.log('✅ User found:', user);
        } else {
            console.log('❌ No user found with the given email.');
        }

        await conn.connection.close();
    } catch (error) {
        console.error('Error Testing User Model:', error.message);
    }
};

testUserModel();