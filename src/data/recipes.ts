import { Recipe, Ingredient } from '../types/game';

export const INGREDIENTS: Ingredient[] = [
  { id: 'fish', name: 'Fish', color: 'bg-blue-200' },
  { id: 'rice', name: 'Rice', color: 'bg-white border border-gray-200' },
  { id: 'nori', name: 'Nori', color: 'bg-green-800' },
  { id: 'egg', name: 'Egg', color: 'bg-yellow-200' },
  { id: 'sauce', name: 'Sauce', color: 'bg-red-400' },
  { id: 'noodles', name: 'Noodles', color: 'bg-yellow-100' },
  { id: 'tofu', name: 'Tofu', color: 'bg-gray-100' },
  { id: 'chicken', name: 'Chicken', color: 'bg-orange-200' },
  { id: 'vegetables', name: 'Vegetables', color: 'bg-green-300' },
  { id: 'cheese', name: 'Cheese', color: 'bg-yellow-300' },
  { id: 'shrimp', name: 'Shrimp', color: 'bg-pink-200' },
  { id: 'miso', name: 'Miso', color: 'bg-amber-600' },
  { id: 'matcha', name: 'Matcha', color: 'bg-green-500' },
  { id: 'mochi-flour', name: 'Mochi Flour', color: 'bg-gray-200' },
  { id: 'red-bean', name: 'Red Bean', color: 'bg-red-700' },
  { id: 'cream', name: 'Cream', color: 'bg-cream-50 border border-gray-200' },
  { id: 'fruit', name: 'Fresh Fruit', color: 'bg-rose-300' },
  { id: 'gold-leaf', name: 'Gold Leaf', color: 'bg-yellow-400' },
  { id: 'truffle', name: 'Black Truffle', color: 'bg-stone-800' },
  { id: 'tapioca', name: 'Tapioca Pearls', color: 'bg-stone-900' },
  { id: 'tea', name: 'Black Tea', color: 'bg-amber-900' },
  { id: 'brown-sugar', name: 'Brown Sugar', color: 'bg-amber-700' },
  { id: 'lychee', name: 'Lychee', color: 'bg-pink-50' },
  { id: 'coconut', name: 'Coconut', color: 'bg-gray-50' },
  { id: 'honey', name: 'Honey', color: 'bg-amber-300' },
  { id: 'mint', name: 'Fresh Mint', color: 'bg-emerald-400' }
];

export const RECIPES: Recipe[] = [
  // Regular Dishes
  {
    id: 'sushi',
    name: 'Classic Sushi Roll',
    ingredients: ['rice', 'fish', 'nori'],
    points: 100,
    timeLimit: 30
  },
  {
    id: 'spicy-roll',
    name: 'Spicy Tuna Roll',
    ingredients: ['rice', 'fish', 'sauce'],
    points: 120,
    timeLimit: 35
  },
  {
    id: 'california',
    name: 'California Roll',
    ingredients: ['rice', 'nori', 'shrimp'],
    points: 110,
    timeLimit: 30
  },
  {
    id: 'veggie-roll',
    name: 'Vegetable Roll',
    ingredients: ['rice', 'nori', 'vegetables'],
    points: 90,
    timeLimit: 25
  },
  {
    id: 'cheese-roll',
    name: 'Cheese Roll',
    ingredients: ['rice', 'nori', 'cheese'],
    points: 100,
    timeLimit: 30
  },
  {
    id: 'ramen',
    name: 'Classic Ramen',
    ingredients: ['noodles', 'egg', 'sauce'],
    points: 150,
    timeLimit: 40
  },
  {
    id: 'miso-ramen',
    name: 'Miso Ramen',
    ingredients: ['noodles', 'miso', 'vegetables'],
    points: 160,
    timeLimit: 45
  },
  {
    id: 'shrimp-ramen',
    name: 'Shrimp Ramen',
    ingredients: ['noodles', 'shrimp', 'sauce'],
    points: 170,
    timeLimit: 45
  },
  {
    id: 'veggie-ramen',
    name: 'Vegetable Ramen',
    ingredients: ['noodles', 'vegetables', 'tofu'],
    points: 140,
    timeLimit: 35
  },
  {
    id: 'rice-bowl',
    name: 'Classic Rice Bowl',
    ingredients: ['rice', 'egg', 'sauce'],
    points: 80,
    timeLimit: 25
  },
  {
    id: 'chicken-bowl',
    name: 'Chicken Rice Bowl',
    ingredients: ['rice', 'chicken', 'sauce'],
    points: 100,
    timeLimit: 30
  },
  {
    id: 'tofu-bowl',
    name: 'Tofu Rice Bowl',
    ingredients: ['rice', 'tofu', 'vegetables'],
    points: 90,
    timeLimit: 25
  },
  {
    id: 'miso-soup',
    name: 'Classic Miso Soup',
    ingredients: ['miso', 'tofu', 'vegetables'],
    points: 120,
    timeLimit: 35
  },
  {
    id: 'seafood-miso',
    name: 'Seafood Miso Soup',
    ingredients: ['miso', 'shrimp', 'vegetables'],
    points: 140,
    timeLimit: 40
  },
  {
    id: 'katsu',
    name: 'Chicken Katsu',
    ingredients: ['chicken', 'sauce', 'rice'],
    points: 160,
    timeLimit: 45
  },
  {
    id: 'tempura',
    name: 'Shrimp Tempura',
    ingredients: ['shrimp', 'vegetables', 'sauce'],
    points: 140,
    timeLimit: 40
  },
  {
    id: 'udon',
    name: 'Classic Udon',
    ingredients: ['noodles', 'vegetables', 'tofu'],
    points: 110,
    timeLimit: 35
  },
  {
    id: 'poke',
    name: 'Poke Bowl',
    ingredients: ['rice', 'fish', 'vegetables'],
    points: 130,
    timeLimit: 30
  },
  {
    id: 'okonomiyaki',
    name: 'Okonomiyaki',
    ingredients: ['egg', 'vegetables', 'sauce'],
    points: 140,
    timeLimit: 45
  },
  {
    id: 'yakisoba',
    name: 'Yakisoba',
    ingredients: ['noodles', 'vegetables', 'chicken'],
    points: 120,
    timeLimit: 40
  },

  // Desserts
  {
    id: 'matcha-mochi',
    name: 'Matcha Mochi',
    ingredients: ['matcha', 'mochi-flour', 'red-bean'],
    points: 180,
    timeLimit: 50
  },
  {
    id: 'fruit-mochi',
    name: 'Fruit Mochi',
    ingredients: ['mochi-flour', 'cream', 'fruit'],
    points: 160,
    timeLimit: 45
  },
  {
    id: 'coconut-mochi',
    name: 'Coconut Mochi',
    ingredients: ['mochi-flour', 'coconut', 'cream'],
    points: 170,
    timeLimit: 45
  },
  {
    id: 'lychee-mochi',
    name: 'Lychee Mochi',
    ingredients: ['mochi-flour', 'lychee', 'cream'],
    points: 175,
    timeLimit: 45
  },
  {
    id: 'matcha-parfait',
    name: 'Matcha Parfait',
    ingredients: ['matcha', 'cream', 'fruit'],
    points: 170,
    timeLimit: 35
  },
  {
    id: 'red-bean-parfait',
    name: 'Red Bean Parfait',
    ingredients: ['red-bean', 'cream', 'matcha'],
    points: 150,
    timeLimit: 40
  },
  {
    id: 'fruit-parfait',
    name: 'Fresh Fruit Parfait',
    ingredients: ['fruit', 'cream', 'honey'],
    points: 160,
    timeLimit: 35
  },
  {
    id: 'lychee-parfait',
    name: 'Lychee Parfait',
    ingredients: ['lychee', 'cream', 'fruit'],
    points: 165,
    timeLimit: 35
  },

  // Drinks
  {
    id: 'boba-tea',
    name: 'Brown Sugar Boba Tea',
    ingredients: ['tapioca', 'tea', 'brown-sugar'],
    points: 140,
    timeLimit: 45
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    ingredients: ['matcha', 'cream', 'honey'],
    points: 130,
    timeLimit: 40
  },
  {
    id: 'fruit-tea',
    name: 'Fresh Fruit Tea',
    ingredients: ['tea', 'fruit', 'honey'],
    points: 120,
    timeLimit: 35
  },
  {
    id: 'coconut-tea',
    name: 'Coconut Milk Tea',
    ingredients: ['tea', 'coconut', 'honey'],
    points: 125,
    timeLimit: 35
  },
  {
    id: 'lychee-tea',
    name: 'Lychee Bubble Tea',
    ingredients: ['tea', 'lychee', 'tapioca'],
    points: 135,
    timeLimit: 40
  },

  // VIP Recipes
  {
    id: 'truffle-sushi',
    name: 'Truffle Sushi Deluxe',
    ingredients: ['rice', 'fish', 'truffle'],
    points: 250,
    timeLimit: 45,
    vipOnly: true
  },
  {
    id: 'luxury-ramen',
    name: 'Luxury Truffle Ramen',
    ingredients: ['noodles', 'truffle', 'egg'],
    points: 280,
    timeLimit: 50,
    vipOnly: true
  },
  {
    id: 'royal-poke',
    name: 'Royal Poke Bowl',
    ingredients: ['rice', 'fish', 'truffle', 'sauce'],
    points: 300,
    timeLimit: 55,
    vipOnly: true
  },
  {
    id: 'deluxe-matcha',
    name: 'Deluxe Matcha Paradise',
    ingredients: ['matcha', 'cream', 'truffle', 'honey'],
    points: 320,
    timeLimit: 50,
    vipOnly: true
  },

  // Ultra VIP Golden Drinks (Emperor exclusive)
  {
    id: 'imperial-sunrise',
    name: '👑 Imperial Sunrise Elixir',
    ingredients: ['tea', 'honey', 'gold-leaf', 'lychee', 'mint'],
    points: 1000,
    timeLimit: 45,
    vipOnly: true
  },
  {
    id: 'royal-matcha',
    name: '👑 Royal Matcha Dynasty',
    ingredients: ['matcha', 'cream', 'gold-leaf', 'honey', 'coconut'],
    points: 1000,
    timeLimit: 40,
    vipOnly: true
  },
  {
    id: 'golden-fruit',
    name: '👑 Golden Fruit Nectar',
    ingredients: ['fruit', 'honey', 'gold-leaf', 'tea', 'coconut'],
    points: 1000,
    timeLimit: 35,
    vipOnly: true
  },
  {
    id: 'emperors-boba',
    name: '👑 Emperor\'s Boba Dream',
    ingredients: ['tapioca', 'tea', 'gold-leaf', 'brown-sugar', 'cream'],
    points: 1000,
    timeLimit: 45,
    vipOnly: true
  },
  {
    id: 'celestial-brew',
    name: '👑 Celestial Golden Brew',
    ingredients: ['tea', 'lychee', 'gold-leaf', 'mint', 'honey'],
    points: 1000,
    timeLimit: 40,
    vipOnly: true
  }
];