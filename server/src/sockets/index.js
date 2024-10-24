// src/sockets/index.js
const logger = require('../utils/logger');

module.exports = (io) => {
    io.on('connection', (socket) => {
        logger.info(`User connected: ${socket.id}`);

        socket.on('message', (data) => {
            logger.info(`Message from ${socket.id}: ${data}`);
            io.emit('message', data);
        });

        socket.on('disconnect', () => {
            logger.info(`User disconnected: ${socket.id}`);
        });
    });
};
