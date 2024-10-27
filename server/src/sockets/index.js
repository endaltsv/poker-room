// src/sockets/index.js
const gameSockets = require('./gameSockets');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Initialize game-related socket events
    gameSockets(io, socket);
  });
};
