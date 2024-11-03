export interface Ingredient {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  points: number;
  timeLimit: number;
  vipOnly?: boolean;
}

export interface CatCustomer {
  id: string;
  name: string;
  image: string;
  personality: string;
  color: string;
  isVIP?: boolean;
  description?: string;
}

export interface Order {
  id: string;
  recipe: Recipe;
  timeLeft: number;
  completed: boolean;
  customer: CatCustomer;
  isVIP?: boolean;
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