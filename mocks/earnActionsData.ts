// File: mocks/earnActionsData.ts

import { EarnActionsData } from '@/types/earnActions';

export const mockEarnActionsData: EarnActionsData = {
  swap: {
    name: "AsteroNEO",
    tokens: [
      {
        address: "0xda253891F581f366F9cb4B8bBbFBFC3Bef6D3d55",
        actions: 1,
        bonusMultiplier: 1,
        tokenName: "DEMOUSD"
      },
      {
        address: "0x37ee2766fD9426F4C42ec803209Bd6e8A9cE4d08",
        actions: 1,
        bonusMultiplier: 1,
        tokenName: "CAT"
      },
      {
        address: "0xE816deE05cf6D0F2a57EB4C489241D8326B5d106",
        actions: 1,
        bonusMultiplier: 1,
        tokenName: "NDMEME"
      },
      {
        address: "0xfAe8eA208e589Ee1183a2527132b9d273183E166",
        actions: 1,
        bonusMultiplier: 1,
        tokenName: "MTIX"
      },
      {
        address: "0x561ef01198dcde461dc74f19f5dcbaf814eebff9",
        actions: 3,
        bonusMultiplier: 2,
        tokenName: "NUSD"
      }
    ]
  },
  tokens: [
    {
      address: "0xda253891f581f366f9cb4b8bbbfbfc3bef6d3d55",
      symbol: "MKT",
      holdingMultiplier: 2,
      baseMultiplier: 1
    },
    {
      address: "0x37ee2766fd9426f4c42ec803209bd6e8a9ce4d08",
      symbol: "CAT",
      holdingMultiplier: 1.5,
      baseMultiplier: 1
    }
  ],
  smartcontracts: {
    address: "0xb8625b0e60D35E01e335c22dFfd8d33b08B69Aa7",
    events: {
      "Withdrawn": 10,
      "Deposited": 5
    },
    baseMultiplier: 1
  }
};