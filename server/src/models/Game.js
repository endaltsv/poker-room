// src/models/Game.js

const { createDeck, shuffleDeck } = require('../utils/cards');
const PokerSolver = require('pokersolver').Hand;

class Game {
  constructor(roomId, playerIds, io) {
    this.roomId = roomId;
    this.players = playerIds.map((id, index) => ({
      id,
      chips: 1000,
      bet: 0,
      folded: false,
      isDealer: index === 0, // Первый игрок - дилер
      position: null,
      cards: [],
      hasActed: false,
    }));
    this.deck = [];
    this.pot = 0;
    this.currentBet = 0;
    this.currentPlayerIndex = 0;
    this.round = 'pre-flop';
    this.communityCards = [];
    this.winnerId = null;
    this.io = io; // Сохраняем io для отправки сообщений
  }

  initializeGame() {
    this.deck = shuffleDeck(createDeck());
    this.assignPositions();
    this.dealCards();
    this.postBlinds();
    this.setCurrentPlayer();
    this.broadcastGameState();
  }

  assignPositions() {
    // Перемещаем фишку дилера
    const currentDealerIndex = this.players.findIndex((p) => p.isDealer);
    const nextDealerIndex = (currentDealerIndex + 1) % this.players.length;

    this.players.forEach((player, index) => {
      player.isDealer = index === nextDealerIndex;
    });

    // Назначаем позиции
    const dealerIndex = nextDealerIndex;
    const sbIndex = (dealerIndex + 1) % this.players.length;
    const bbIndex = (dealerIndex + 2) % this.players.length;

    this.players.forEach((player) => {
      player.position = null;
    });

    this.players[dealerIndex].position = 'Dealer';
    this.players[sbIndex].position = 'SB';
    this.players[bbIndex].position = 'BB';
  }

  postBlinds() {
    const sbPlayer = this.players.find((p) => p.position === 'SB');
    const bbPlayer = this.players.find((p) => p.position === 'BB');

    const smallBlind = 10;
    const bigBlind = 20;

    sbPlayer.chips -= smallBlind;
    sbPlayer.bet = smallBlind;
    this.pot += smallBlind;

    bbPlayer.chips -= bigBlind;
    bbPlayer.bet = bigBlind;
    this.pot += bigBlind;

    this.currentBet = bigBlind;
  }

  dealCards() {
    this.players.forEach((player) => {
      player.cards = [this.deck.pop(), this.deck.pop()];
    });
  }

  setCurrentPlayer() {
    // Игрок после BB начинает действие
    const bbIndex = this.players.findIndex((p) => p.position === 'BB');
    this.currentPlayerIndex = (bbIndex + 1) % this.players.length;

    // Проверяем, что текущий игрок не выбыл
    while (this.players[this.currentPlayerIndex].folded) {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    }
  }

  processPlayerAction(playerId, action) {
    const player = this.players.find((p) => p.id === playerId);
    if (!player) return;

    player.hasActed = true; // Отмечаем, что игрок сделал ход

    if (action.type === 'fold') {
      player.folded = true;
    } else if (action.type === 'call' || action.type === 'check') {
      const callAmount = this.currentBet - player.bet;
      player.chips -= callAmount;
      player.bet += callAmount;
      this.pot += callAmount;
    } else if (action.type === 'raise') {
      const raiseAmount = action.amount;
      player.chips -= raiseAmount;
      player.bet += raiseAmount;
      this.pot += raiseAmount;
      this.currentBet = player.bet;
      // После рейза остальные игроки должны снова сделать ход
      this.players.forEach((p) => {
        if (p.id !== player.id) {
          p.hasActed = false;
        }
      });
    }

    // Проверяем, остался ли один активный игрок
    if (this.players.filter((p) => !p.folded).length <= 1) {
      this.determineWinner();
      return;
    }

    // Переходим к следующему игроку
    this.advanceToNextPlayer();

    // Проверяем, завершился ли раунд ставок
    if (this.isBettingRoundOver()) {
      this.advanceRound();
    }

    // Обновляем состояние игры
    this.broadcastGameState();
  }

  advanceToNextPlayer() {
    do {
      this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
    } while (this.players[this.currentPlayerIndex].folded);
  }

  isBettingRoundOver() {
    const activePlayers = this.players.filter((p) => !p.folded);

    // Проверяем, что все активные игроки сделали ход
    const allPlayersActed = activePlayers.every((p) => p.hasActed);

    // Проверяем, что ставки всех активных игроков выровнены
    const allBetsEqual = activePlayers.every((p) => p.bet === this.currentBet);

    return allPlayersActed && allBetsEqual;
  }

  advanceRound() {
    // Сбрасываем ставки и флаги действий игроков
    this.players.forEach((p) => {
      p.bet = 0;
      p.hasActed = false;
    });
    this.currentBet = 0;

    if (this.round === 'pre-flop') {
      // Раздаем флоп
      this.round = 'flop';
      this.communityCards.push(this.deck.pop(), this.deck.pop(), this.deck.pop());
    } else if (this.round === 'flop') {
      // Раздаем терн
      this.round = 'turn';
      this.communityCards.push(this.deck.pop());
    } else if (this.round === 'turn') {
      // Раздаем ривер
      this.round = 'river';
      this.communityCards.push(this.deck.pop());
    } else if (this.round === 'river') {
      // Шоудаун
      this.determineWinner();
      return;
    }

    // Устанавливаем текущего игрока
    this.setCurrentPlayer();

    // Обновляем состояние игры
    this.broadcastGameState();
  }

  determineWinner() {
    const activePlayers = this.players.filter((p) => !p.folded);
    if (activePlayers.length === 1) {
      // Если остался один игрок, он выигрывает банк
      const winner = activePlayers[0];
      winner.chips += this.pot;
      this.pot = 0;
      this.winnerId = winner.id;
    } else {
      // Используем pokersolver для определения победителя
      const hands = activePlayers.map((player) => {
        const playerCards = player.cards.map((card) => mapCardToSolver(card));
        const communityCards = this.communityCards.map((card) => mapCardToSolver(card));
        const allCards = playerCards.concat(communityCards);
        const hand = PokerSolver.solve(allCards);
        return { player, hand };
      });

      const winnerHands = PokerSolver.winners(hands.map((h) => h.hand));

      // Находим победителей
      const winningPlayers = hands
        .filter((h) => winnerHands.includes(h.hand))
        .map((h) => h.player);

      const share = this.pot / winningPlayers.length;
      winningPlayers.forEach((player) => {
        player.chips += share;
      });
      this.pot = 0;

      // Сохраняем ID победителя (берем первого, если несколько)
      this.winnerId = winningPlayers[0].id;
    }

    // Отправляем обновленное состояние игры игрокам
    this.broadcastGameState();

    // Ждем 5 секунд перед началом новой игры
    setTimeout(() => {
      this.startNewRound();
    }, 5000);
  }

  startNewRound() {
    // Проверяем, есть ли у игроков фишки для продолжения игры
    const activePlayers = this.players.filter((p) => p.chips > 0);
    if (activePlayers.length >= 2) {
      // Начинаем новую игру
      this.round = 'pre-flop';
      this.communityCards = [];
      this.winnerId = null;
      this.players.forEach((p) => {
        p.bet = 0;
        p.folded = false;
        p.cards = [];
        p.hasActed = false;
      });
      this.initializeGame();
    } else {
      // Игра окончена
      this.io.to(this.roomId).emit('game_over', { winnerId: this.winnerId });
    }
  }

  broadcastGameState() {
    this.players.forEach((player) => {
      const state = this.getPublicStateForPlayer(player.id);
      this.io.to(player.id).emit('game_state', state);
    });
  }

  getPublicStateForPlayer(playerId) {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const currentPlayerId = currentPlayer ? currentPlayer.id : null;

    return {
      roomId: this.roomId,
      players: this.players.map((p) => ({
        id: p.id,
        chips: p.chips,
        bet: p.bet,
        folded: p.folded,
        position: p.position,
        isDealer: p.isDealer,
        cards: p.id === playerId || this.winnerId ? p.cards : [], // Отправляем карты только текущему игроку или после окончания игры
      })),
      pot: this.pot,
      currentBet: this.currentBet,
      currentPlayerId: currentPlayerId,
      round: this.round,
      communityCards: this.communityCards,
      winnerId: this.winnerId,
    };
  }
}

// Функция для преобразования карты в формат, понятный pokersolver
function mapCardToSolver(card) {
  const rankMap = {
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '10': 'T',
    J: 'J',
    Q: 'Q',
    K: 'K',
    A: 'A',
  };
  const suitMap = {
    '♠': 's',
    '♥': 'h',
    '♦': 'd',
    '♣': 'c',
  };
  return rankMap[card.rank] + suitMap[card.suit];
}

module.exports = Game;
