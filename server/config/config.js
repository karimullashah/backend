const environment = process.env.NODE_ENV || 'development';
const config = require('./config.json');

if (environment == 'development') {
    process.env.MONGODB_URL = config.development.MONGODB_URL;
    process.env.PORT = config.development.SERVER_PORT;
} 