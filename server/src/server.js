// src/server.js
const http = require('http');
const socketHandler = require('./sockets');
const app = require('./app');
const initConfig = require('./config/index');
const logger = require('./utils/logger');
const socketio = require('socket.io')
const sockets = require('./sockets');

require('dotenv').config();
initConfig();

const server = http.createServer(app);

const io = socketio(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

sockets(io);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
