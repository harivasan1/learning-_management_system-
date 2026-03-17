const mongoose = require('mongoose');

const testMongoConnection = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const admin = conn.connection.db.admin();
        const databases = await admin.listDatabases();
        console.log('Databases:', databases);

        await conn.connection.close();
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

testMongoConnection();