const mongoose = require('mongoose');
const config = require('../config/config');

const url = process.env.MONGODB_URL;
mongoose.Promise = global.Promise;

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("connected to database successfully");
    } catch (err) {
        console.log("Unable to connect to database");
        console.log("error :" + err);
    }
}

connectDB();