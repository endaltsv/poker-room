// src/services/gameService.js

const Game = require('../models/Game');

const games = {}; // Хранение игр по roomId
const waitingPlayers = []; // Очередь ожидающих игроков

module.exports = {
  handlePlayerRegistration,
  handlePlayerJoinRoom,
  handlePlayerAction,
  handlePlayerDisconnect,
};

function handlePlayerRegistration(io, socket) {
  if (waitingPlayers.length > 0) {
    const opponentSocket = waitingPlayers.shift();

    // Создаем уникальный идентификатор комнаты
    const roomId = `room-${opponentSocket.id}-${socket.id}`;

    // Оба игрока присоединяются к комнате
    socket.join(roomId);
    opponentSocket.join(roomId);

    // Инициализируем новую игру
    const game = new Game(roomId, [socket.id, opponentSocket.id], io);
    games[roomId] = game;
    game.initializeGame();

    // Уведомляем игроков о начале игры
    socket.emit('start_game', roomId);
    opponentSocket.emit('start_game', roomId);
  } else {
    waitingPlayers.push(socket);
    // Уведомляем игрока, что он зарегистрирован и ожидает оппонента
    socket.emit('room_created');
  }
}

function handlePlayerJoinRoom(io, socket, roomId) {
  const game = games[roomId];
  if (!game) {
    socket.emit('error', 'Игра не найдена');
    return;
  }

  // Проверяем, является ли игрок участником игры
  const isPlayerInGame = game.players.some((p) => p.id === socket.id);
  if (!isPlayerInGame) {
    socket.emit('error', 'Вы не являетесь участником этой игры');
    return;
  }

  socket.join(roomId);
  console.log(`Player ${socket.id} joined room ${roomId}`);

  // Отправляем состояние игры игроку
  const state = game.getPublicStateForPlayer(socket.id);
  socket.emit('game_state', state);
}

function handlePlayerAction(io, socket, data) {
  const { roomId, action } = data;
  const game = games[roomId];

  if (!game) {
    console.error(`Game not found for room ${roomId}`);
    return;
  }

  game.processPlayerAction(socket.id, action);
}

function handlePlayerDisconnect(io, socket) {
  console.log(`Player disconnected: ${socket.id}`);

  // Удаляем из очереди ожидания, если игрок там находится
  const index = waitingPlayers.indexOf(socket);
  if (index !== -1) {
    waitingPlayers.splice(index, 1);
  }

  // Обработка отключения игрока из активной игры
  for (const roomId in games) {
    const game = games[roomId];
    const playerIndex = game.players.findIndex((p) => p.id === socket.id);
    if (playerIndex !== -1) {
      // Удаляем игрока из игры
      game.players.splice(playerIndex, 1);
      if (game.players.length === 0) {
        // Если нет игроков, удаляем игру
        delete games[roomId];
      } else {
        // Уведомляем оставшихся игроков
        io.to(roomId).emit('player_left', { playerId: socket.id });
      }
    }
  }
}
