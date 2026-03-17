const { MongoClient } = require('mongodb');

const testDirectQuery = async () => {
    try {
        const client = new MongoClient('mongodb://localhost:27017');
        await client.connect();

        const db = client.db('lms-db');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: 'sampleuser@example.com' });
        if (user) {
            console.log('✅ User found:', user);
        } else {
            console.log('❌ No user found with the given email.');
        }

        await client.close();
    } catch (error) {
        console.error('Error Testing Direct Query:', error.message);
    }
};

testDirectQuery();