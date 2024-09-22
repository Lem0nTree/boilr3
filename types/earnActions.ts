// File: types/earnActions.ts

export interface SwapToken {
    address: string;
    actions: number;
    bonusMultiplier: number;
    tokenName: string;
  }
  
  export interface Swap {
    name: string;
    tokens: SwapToken[];
  }
  
  export interface Token {
    address: string;
    symbol: string;
    holdingMultiplier: number;
    baseMultiplier: number;
  }
  
  export interface SmartContract {
    address: string;
    events: { [key: string]: number };
    baseMultiplier: number;
  }
  
  export interface EarnAction {
    category: 'swap' | 'holding' | 'smartcontracts';
    title: string;
    multiplier: number;
    description: string;
  }
  
  export interface EarnActionsData {
    swap: Swap;
    tokens: Token[];
    smartcontracts: SmartContract;
  }