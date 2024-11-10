// src/pages/GamePage.tsx

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import { useSocketEvents } from '../../hooks/useSocketEvents';
import PokerTable from '@/components/PokerTable/PokerTable';
import { GameState } from '@/types/game';

const GamePage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [betAmount, setBetAmount] = useState<number>(50);
  const [playerId, setPlayerId] = useState<string>('');
  const [opponentLastAction, setOpponentLastAction] = useState<string | null>(
    null,
  );
  const [opponentLastActionTime, setOpponentLastActionTime] = useState<
    number | null
  >(null);

  const prevOpponentLastActionRef = useRef<string | null>(null);

  useEffect(() => {
    if (socket && roomId) {
      socket.emit('join_room', roomId);
      setPlayerId(socket.id);
    }
  }, [socket, roomId]);

  useSocketEvents({
    game_state: (state: GameState) => {
      setGameState(state);
    },
    error: (message: string) => {
      alert(message);
      navigate('/');
    },
  });

  const player = gameState?.players.find((p) => p.id === playerId);
  const opponent = gameState?.players.find((p) => p.id !== playerId);

  useEffect(() => {
    if (gameState && opponent) {
      if (
        opponent.lastAction &&
        opponent.lastAction !== prevOpponentLastActionRef.current
      ) {
        setOpponentLastAction(opponent.lastAction);
        setOpponentLastActionTime(Date.now());
        prevOpponentLastActionRef.current = opponent.lastAction;
      } else if (!opponent.lastAction && prevOpponentLastActionRef.current) {
        // Действие оппонента было сброшено на сервере
        setOpponentLastAction(null);
        prevOpponentLastActionRef.current = null;
      }
    } else {
      // Сбрасываем состояние, если оппонента нет
      setOpponentLastAction(null);
      prevOpponentLastActionRef.current = null;
    }
  }, [gameState, opponent]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (opponentLastActionTime) {
      timer = setTimeout(() => {
        setOpponentLastAction(null);
      }, 2000); // Время в миллисекундах
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [opponentLastActionTime]);

  if (!gameState || !player) {
    return <div>Loading game...</div>;
  }

  const isPlayerTurn = gameState.currentPlayerId === playerId;

  // Определяем доступные действия для игрока
  const availableActions: string[] = [];
  if (player.folded) {
    availableActions.push('Waiting for next round');
  } else if (isPlayerTurn) {
    availableActions.push('fold');
    if (gameState.currentBet > player.bet) {
      availableActions.push('call');
    } else {
      availableActions.push('check');
    }
    if (player.chips > gameState.currentBet) {
      availableActions.push('raise');
    }
  }

  const handleAction = (actionType: string) => {
    if (socket && roomId && gameState && player) {
      const action: any = { type: actionType };

      if (actionType === 'raise') {
        action.amount = betAmount;
      }
      socket.emit('player_action', {
        roomId,
        action,
      });

      // Сбрасываем betAmount после действия
      setBetAmount(0);

      // Сбрасываем действие оппонента после нашего хода
      setOpponentLastAction(null);
      setOpponentLastActionTime(null);
      prevOpponentLastActionRef.current = null;
    }
  };

  // Определяем победителя
  const winnerPlayer = gameState.winnerId
    ? gameState.players.find((p) => p.id === gameState.winnerId)
    : null;

  return (
    <PokerTable
      gameState={gameState}
      winnerPlayer={winnerPlayer || null}
      player={player}
      opponent={opponent}
      isPlayerTurn={isPlayerTurn}
      availableActions={availableActions}
      handleAction={handleAction}
      betAmount={betAmount}
      setBetAmount={setBetAmount}
      opponentLastAction={opponentLastAction}
    />
  );
};

export default GamePage;
