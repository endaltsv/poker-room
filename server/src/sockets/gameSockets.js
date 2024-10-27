// src/sockets/gameSockets.js

const gameService = require('../services/gameService');

module.exports = (io, socket) => {
  socket.on('register', () => {
    gameService.handlePlayerRegistration(io, socket);
  });

  socket.on('join_room', (roomId) => {
    gameService.handlePlayerJoinRoom(io, socket, roomId);
  });

  socket.on('player_action', (data) => {
    gameService.handlePlayerAction(io, socket, data);
  });

  socket.on('disconnect', () => {
    gameService.handlePlayerDisconnect(io, socket);
  });
};
