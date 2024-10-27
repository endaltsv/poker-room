// src/pages/GamePage.tsx

import React, { useEffect, useState, useContext } from 'react';
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
  const [playerId, setPlayerId] = useState<string | undefined>('');

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

  if (!gameState) {
    return <div>Loading game...</div>;
  }

  const player = gameState.players.find((p) => p.id === playerId);
  const opponent = gameState.players.find((p) => p.id !== playerId);

  if (!player) {
    return <div>Player not found</div>;
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
    }
  };

  // Сообщение о победителе
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
    />
  );
};

export default GamePage;
