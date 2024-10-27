// src/components/PokerTable/PotDisplay.tsx

import React from 'react';

interface PotDisplayProps {
  pot: number;
}

const PotDisplay: React.FC<PotDisplayProps> = ({ pot }) => {
  return (
    <div className="bg-gray-800 text-white px-4 py-2 rounded-full">
      Pot: ${pot}
    </div>
  );
};

export default PotDisplay;
