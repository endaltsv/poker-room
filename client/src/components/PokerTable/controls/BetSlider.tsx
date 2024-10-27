// src/components/Controls/BetSlider.tsx

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface BetSliderProps {
  betAmount: number;
  setBetAmount: React.Dispatch<React.SetStateAction<number>>;
  maxBet: number;
}

const BetSlider: React.FC<BetSliderProps> = ({
  betAmount,
  setBetAmount,
  maxBet,
}) => {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-white">Bet: ${betAmount}</span>
        <div className="flex space-x-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setBetAmount(Math.max(0, betAmount - 10))}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => setBetAmount(Math.min(maxBet, betAmount + 10))}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Slider
        value={[betAmount]}
        onValueChange={(value) => setBetAmount(value[0])}
        max={maxBet}
        step={1}
        className="mb-4"
      />
    </>
  );
};

export default BetSlider;
