import { ShopItem } from '../types/game';

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'theme-sakura',
    name: 'Sakura Theme',
    description: 'Unlocks 12 cherry blossom recipes and transforms your café with a spring theme!',
    cost: 2,
    type: 'theme',
    icon: 'Palette',
    unlocked: false,
    effect: 'Changes the café appearance to a cherry blossom theme'
  },
  {
    id: 'theme-night',
    name: 'Night Mode',
    description: 'Unlocks 12 cozy night recipes and transforms your café with a moonlit theme!',
    cost: 2,
    type: 'theme',
    icon: 'Moon',
    unlocked: false,
    effect: 'Changes the café appearance to a nighttime theme'
  },
  {
    id: 'theme-american',
    name: 'American Diner',
    description: 'Unlocks 12 American classics and transforms your café into a retro diner!',
    cost: 3,
    type: 'theme',
    icon: 'Star',
    unlocked: false,
    effect: 'American diner theme with burgers, pizza, and milkshakes'
  },
  {
    id: 'theme-sunset',
    name: 'Meow-Meow Mocktail Bar',
    description: 'Unlocks 12 tropical mocktails and transforms your café into a sunset cocktail bar!',
    cost: 4,
    type: 'theme',
    icon: 'Sunset',
    unlocked: false,
    effect: 'Sunset gradient theme with mocktails, tiki vibes, and tropical ingredients'
  },
  {
    id: 'boost-time',
    name: 'Time Extension',
    description: 'Start with 30 extra seconds',
    cost: 3,
    type: 'boost',
    icon: 'Clock',
    unlocked: false,
    effect: '+30 seconds to game time'
  },
  {
    id: 'boost-points',
    name: 'Point Multiplier',
    description: '1.5x points for one game',
    cost: 4,
    type: 'boost',
    icon: 'Sparkles',
    unlocked: false,
    effect: '50% more points for all orders'
  },
  {
    id: 'deco-golden',
    name: 'Golden Spatula',
    description: 'A prestigious decoration for master chefs',
    cost: 3,
    type: 'decoration',
    icon: 'Crown',
    unlocked: false,
    effect: 'Adds a golden sparkle to your cooking animations'
  },
  {
    id: 'deco-lucky',
    name: 'Lucky Cat Statue',
    description: 'Brings good fortune to your café',
    cost: 2,
    type: 'decoration',
    icon: 'Star',
    unlocked: false,
    effect: 'Adds a lucky cat decoration to your café'
  }
];