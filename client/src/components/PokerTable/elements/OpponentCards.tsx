// src/components/PokerTable/OpponentCards.tsx

import React from 'react';
import Card from './Card';
import { CardType } from '@/types/game';

interface OpponentCardsProps {
  cards: CardType[];
  showCards: boolean;
}

const OpponentCards: React.FC<OpponentCardsProps> = ({ cards, showCards }) => {
  return (
    <div className="flex space-x-2">
      {showCards
        ? cards.map((card, index) => <Card key={index} card={card} />)
        : [0, 1].map((index) => (
            <div
              key={index}
              className="w-14 h-20 bg-blue-500 rounded-lg shadow-md flex items-center justify-center text-2xl"
            >
              🂠
            </div>
          ))}
    </div>
  );
};

export default OpponentCards;
