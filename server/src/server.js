// src/server.js
const http = require('http');
const socketHandler = require('./sockets');
const app = require('./app');
const initConfig = require('./config/index');
const logger = require('./utils/logger');

require('dotenv').config();
initConfig();

const server = http.createServer(app);

// const io = require('socket.io')(server, {
//     cors: {
//         origin: "*", 
//         methods: ["GET", "POST"],
//     },
// });
// socketHandler(io);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
