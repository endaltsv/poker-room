// src/components/Controls/Controls.tsx

import React from 'react';
import { Button } from '@/components/ui/button';
import BetSlider from './BetSlider';

interface ControlsProps {
  availableActions: string[];
  handleAction: (actionType: string) => void;
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  maxBet: number;
}

const Controls: React.FC<ControlsProps> = ({
  availableActions,
  handleAction,
  betAmount,
  setBetAmount,
  maxBet,
}) => {
  return (
    <div className="w-[400px] bg-gray-800 p-4 rounded-lg shadow-lg">
      {availableActions.includes('raise') && (
        <BetSlider
          betAmount={betAmount}
          setBetAmount={setBetAmount}
          maxBet={maxBet}
        />
      )}
      <div className="flex justify-between space-x-2">
        {availableActions.map((action) => (
          <Button
            key={action}
            variant={action === 'fold' ? 'destructive' : 'default'}
            onClick={() => handleAction(action)}
            disabled={action === 'Waiting for next round'}
          >
            {action.charAt(0).toUpperCase() + action.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Controls;
