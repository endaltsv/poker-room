// src/components/Shared/Card.tsx

import { CardType } from '@/types/game';
import React from 'react';

interface CardProps {
  card: CardType;
  className?: string;
}

const Card: React.FC<CardProps> = ({ card, className }) => {
  return (
    <div
      className={`w-14 h-20 bg-white rounded-lg shadow-md flex items-center justify-center text-2xl ${className}`}
    >
      {card.rank}
      {card.suit}
    </div>
  );
};

export default Card;
