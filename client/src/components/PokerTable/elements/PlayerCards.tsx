// src/components/PokerTable/PlayerCards.tsx

import React from 'react';
import Card from './Card';
import { CardType } from '@/types/game';

interface PlayerCardsProps {
  cards: CardType[];
}

const PlayerCards: React.FC<PlayerCardsProps> = ({ cards }) => {
  return (
    <div className="flex space-x-2 mb-4">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default PlayerCards;
