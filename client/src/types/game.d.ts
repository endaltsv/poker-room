// src/types/game.d.ts

export interface CardType {
  suit: string;
  rank: string;
}

export interface Player {
  id: string;
  chips: number;
  bet: number;
  folded: boolean;
  position: 'Dealer' | 'SB' | 'BB' | null;
  isDealer: boolean;
  cards: CardType[];
}

export interface GameState {
  roomId: string;
  players: Player[];
  pot: number;
  currentBet: number;
  currentPlayerId: string | null;
  round: string;
  communityCards: CardType[];
  winnerId?: string;
}
