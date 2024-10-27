// src/components/PokerTable/PokerTable.tsx

import React from 'react';
import CommunityCards from './elements/CommunityCards';
import PlayerCards from './elements/PlayerCards';
import OpponentCards from './elements/OpponentCards';
import PotDisplay from './elements/PotDisplay';
import { GameState, Player } from '@/types/game';
import Controls from './controls/Controls';

interface PokerTableProps {
  gameState: GameState;
  winnerPlayer: Player | null;
  player: Player;
  opponent: Player | undefined;
  isPlayerTurn: boolean;
  availableActions: string[];
  handleAction: (actionType: string) => void;
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
}

const PokerTable: React.FC<PokerTableProps> = ({
  gameState,
  winnerPlayer,
  player,
  opponent,
  isPlayerTurn,
  availableActions,
  handleAction,
  betAmount,
  setBetAmount,
}) => {
  return (
    <div className="h-screen w-full bg-green-800 flex items-center justify-center p-4">
      {/* Покерный стол */}
      <div className="relative w-[800px] h-[400px]">
        {/* Круглый стол */}
        <div className="absolute inset-0 bg-green-600 rounded-full border-8 border-brown-600"></div>

        {/* Карты на столе */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CommunityCards cards={gameState.communityCards} />
        </div>

        {/* Отображение суммы в банке */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12">
          <PotDisplay pot={gameState.pot} />
        </div>

        {/* Сообщение о победителе */}
        {winnerPlayer && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-20 bg-yellow-500 text-black px-4 py-2 rounded-full">
            {winnerPlayer.id === player.id ? 'You won!' : 'You lost!'}
          </div>
        )}

        {/* Игрок внизу (пользователь) */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
          <PlayerCards cards={player.cards} />
          <div className="bg-gray-800 text-white px-4 py-2 rounded-full">
            Chips: ${player.chips}
          </div>
        </div>

        {/* Игрок сверху (оппонент) */}
        {opponent && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="bg-gray-800 text-white px-4 py-2 rounded-full mb-4">
              Chips: ${opponent.chips}
            </div>
            <OpponentCards cards={opponent.cards} showCards={!!winnerPlayer} />
          </div>
        )}
      </div>

      {/* Панель управления */}
      {isPlayerTurn && !winnerPlayer && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <Controls
            availableActions={availableActions}
            handleAction={handleAction}
            betAmount={betAmount}
            setBetAmount={setBetAmount}
            maxBet={player.chips}
          />
        </div>
      )}
    </div>
  );
};

export default PokerTable;
