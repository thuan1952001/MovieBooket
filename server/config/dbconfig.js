const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI)

const connection = mongoose.connection

connection.on('connected', () => {
    console.log("MongoDB connection successful");
})

connection.on('error', (err) => {
    console.log("MongoDB connection failed", err);
})

