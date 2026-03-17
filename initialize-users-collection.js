const mongoose = require('mongoose');

const initializeUsersCollection = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/lms-db');

        const User = conn.connection.db.collection('users');
        const sampleUser = {
            firstName: 'Sample',
            lastName: 'User',
            email: 'sampleuser@example.com',
            password: 'password123',
            role: 'student'
        };

        await User.insertOne(sampleUser);
        console.log('✅ Sample user inserted and users collection initialized.');

        await conn.connection.close();
    } catch (error) {
        console.error('Error Initializing Users Collection:', error.message);
    }
};

initializeUsersCollection();