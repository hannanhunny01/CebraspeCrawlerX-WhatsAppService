const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

module.exports = {dbConnect};