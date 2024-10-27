// src/components/PokerTable/CommunityCards.tsx

import React from 'react';
import Card from './Card';

interface CommunityCardsProps {
  cards: CardType[];
}

const CommunityCards: React.FC<CommunityCardsProps> = ({ cards }) => {
  return (
    <div className="flex space-x-2">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default CommunityCards;
