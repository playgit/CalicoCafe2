export interface Ingredient {
  id: string;
  name: string;
  color: string;
  emoji: string;
  icon?: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  points: number;
  timeLimit: number;
  vipOnly?: boolean;
  theme?: 'sakura' | 'night' | 'american' | 'sunset' | 'cosmic' | 'campfire' | 'zen' | 'candy' | 'ocean';
  category?: string;
}

export interface CatCustomer {
  id: string;
  name: string;
  image: string;
  personality: string;
  color: string;
  isVIP?: boolean;
  isSpecial?: boolean;
  description?: string;
}

export interface Order {
  id: string;
  recipe: Recipe;
  timeLeft: number;
  completed: boolean;
  customer: CatCustomer;
  isVIP?: boolean;
  createdAt: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  type: 'theme' | 'boost' | 'decoration';
  icon: string;
  unlocked: boolean;
  effect: string;
}

export interface ScorePopup {
  id: string;
  points: number;
}

export type GameMode = 'classic' | 'lunch-rush' | 'memory' | 'endless' | 'vip-royale';

export interface CustomRecipe {
  id: string;
  name: string;
  ingredients: string[];
  category: 'regular' | 'american' | 'vip' | 'sakura' | 'sunset' | 'cosmic' | 'campfire' | 'zen' | 'candy' | 'ocean';
  savedAt: number;
}
