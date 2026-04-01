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
    id: 'theme-cosmic',
    name: 'Cosmic Café',
    description: 'Unlocks 12 stellar recipes and transforms your café into a deep-space observatory!',
    cost: 4,
    type: 'theme',
    icon: 'Sparkles',
    unlocked: false,
    effect: 'Deep purple nebula theme with cosmic ingredients and starry vibes'
  },
  {
    id: 'theme-campfire',
    name: 'Campfire Kitchen',
    description: 'Unlocks 12 rustic outdoor recipes and transforms your café into a cozy campsite!',
    cost: 3,
    type: 'theme',
    icon: 'Flame',
    unlocked: false,
    effect: 'Warm charcoal and forest theme with s\'mores, maple, and campfire treats'
  },
  {
    id: 'theme-zen',
    name: 'Zen Garden',
    description: 'Unlocks 12 tranquil recipes and transforms your café into a serene Japanese garden!',
    cost: 3,
    type: 'theme',
    icon: 'Leaf',
    unlocked: false,
    effect: 'Sage green stone garden theme with bamboo, yuzu, and mindful dishes'
  },
  {
    id: 'theme-candy',
    name: 'Candy Shop',
    description: 'Unlocks 12 sweet explosion recipes and transforms your café into a candy wonderland!',
    cost: 3,
    type: 'theme',
    icon: 'Candy',
    unlocked: false,
    effect: 'Bubblegum pink candy theme with sprinkles, gummy bears, and sugar overload'
  },
  {
    id: 'theme-ocean',
    name: 'Ocean Breeze Café',
    description: 'Unlocks 12 coastal recipes and transforms your café into a seaside retreat!',
    cost: 3,
    type: 'theme',
    icon: 'Waves',
    unlocked: false,
    effect: 'Deep blue coastal theme with seafoam, pearls, and ocean-fresh flavors'
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