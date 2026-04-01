import { useState } from 'react';
import { Utensils, Trash2 } from 'lucide-react';
import { INGREDIENTS, RECIPES } from '../data/recipes';
import { Order, GameMode } from '../types/game';
import { getThemeConfig } from '../data/themeConfig';

interface KitchenProps {
  currentOrders: Order[];
  onOrderComplete: (orderId: string, points: number) => void;
  onWrongOrder: (penalty: number) => void;
  gameMode?: GameMode;
  activeTheme?: string;
}

type Tab = 'food' | 'sweet' | 'drink';

// ─── Per-theme ingredient groups & tab labels ────────────────────────────────

interface KitchenTabConfig {
  groups: Record<Tab, string[]>;
  labels: Record<Tab, string>;
}

const DEFAULT_CONFIG: KitchenTabConfig = {
  groups: {
    food:  ['fish', 'rice', 'nori', 'egg', 'sauce', 'noodles', 'tofu', 'chicken', 'vegetables', 'cheese', 'shrimp', 'miso', 'patty', 'bun', 'fries', 'pizza-dough', 'pepperoni'],
    sweet: ['matcha', 'mochi-flour', 'red-bean', 'cream', 'fruit', 'lychee', 'coconut', 'honey', 'mint', 'sakura', 'white-chocolate', 'lavender', 'dark-chocolate'],
    drink: ['tapioca', 'tea', 'brown-sugar', 'gold-leaf', 'truffle', 'chamomile', 'cola'],
  },
  labels: { food: '🍱 Food', sweet: '🍡 Sweet', drink: '🧋 Drinks' },
};

const KITCHEN_CONFIGS: Record<string, KitchenTabConfig> = {
  'theme-sunset': {
    groups: {
      food:  ['passionfruit', 'mango', 'pineapple', 'watermelon', 'lychee', 'dragon-fruit', 'lime', 'fruit', 'coconut'],
      sweet: ['grenadine', 'rose-syrup', 'honey', 'agave', 'lavender', 'sakura', 'hibiscus', 'butterfly-pea'],
      drink: ['soda-water', 'crushed-ice', 'boba', 'espresso', 'ginger', 'mint', 'gold-leaf'],
    },
    labels: { food: '🍹 Fruits', sweet: '🌺 Floral', drink: '🫧 Bar' },
  },
  'theme-cosmic': {
    groups: {
      food:  ['stardust', 'moon-cheese', 'rocket-pepper', 'starfruit', 'meteorite-crumble', 'rice', 'cream'],
      sweet: ['nebula-cream', 'cosmic-berry', 'aurora-jelly', 'space-honey', 'galaxy-swirl', 'mochi-flour'],
      drink: ['tea', 'soda-water', 'galaxy-swirl', 'stardust', 'aurora-jelly'],
    },
    labels: { food: '☄️ Astro', sweet: '🌌 Nebula', drink: '🚀 Cosmic' },
  },
  'theme-campfire': {
    groups: {
      food:  ['bacon', 'cornbread', 'cast-iron-butter', 'campfire-smoke', 'pine-nuts', 'egg', 'vegetables', 'maple-syrup'],
      sweet: ['marshmallow', 'graham-cracker', 'wild-berry', 'firewood-honey', 'dark-chocolate', 'cream', 'honey'],
      drink: ['tea', 'campfire-smoke', 'firewood-honey', 'maple-syrup', 'cream'],
    },
    labels: { food: '🏕️ Hearty', sweet: '🔥 Toasty', drink: '☕ Warm' },
  },
  'theme-zen': {
    groups: {
      food:  ['rice', 'noodles', 'tofu', 'miso', 'bamboo-shoot', 'edamame', 'wasabi', 'seaweed', 'dashi', 'pickled-ginger', 'umeboshi'],
      sweet: ['matcha', 'sesame', 'mochi-flour', 'cream', 'honey', 'yuzu', 'rice-vinegar'],
      drink: ['tea', 'matcha', 'yuzu', 'honey', 'cream'],
    },
    labels: { food: '🎋 Garden', sweet: '🍡 Wagashi', drink: '🍵 Sado' },
  },
  'theme-candy': {
    groups: {
      food:  ['wafer', 'rice', 'marshmallow', 'caramel'],
      sweet: ['cotton-candy', 'sprinkles', 'gummy-bears', 'frosting', 'bubblegum', 'jelly-bean', 'pop-rocks', 'rock-candy', 'cream', 'mochi-flour', 'dark-chocolate'],
      drink: ['soda-water', 'tea', 'honey', 'pop-rocks', 'rock-candy', 'cream', 'bubblegum', 'cotton-candy'],
    },
    labels: { food: '🧇 Snacks', sweet: '🍭 Candy', drink: '🫧 Fizz' },
  },
  'theme-ocean': {
    groups: {
      food:  ['crab', 'shrimp', 'fish', 'kelp', 'rice', 'noodles', 'seaweed', 'driftwood-smoke', 'lemon', 'sea-salt', 'dashi'],
      sweet: ['ocean-jelly', 'coral-sugar', 'sand-cookie', 'coconut', 'cream', 'mochi-flour', 'sea-salt', 'seafoam'],
      drink: ['tea', 'pearl-tapioca', 'coral-sugar', 'lemon', 'coconut', 'seafoam', 'cream', 'sea-salt'],
    },
    labels: { food: '🦀 Catch', sweet: '🪸 Reef', drink: '🌊 Tide' },
  },
};

const NEKO_ALLOWED: string[] = [
  'shrimp', 'sauce', 'rice', 'tofu', 'red-bean',
  'mochi-flour', 'cream', 'fruit', 'lychee', 'coconut',
];

export default function Kitchen({ currentOrders, onOrderComplete, onWrongOrder, gameMode, activeTheme }: KitchenProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('food');

  const tc = getThemeConfig(activeTheme || 'default');
  const kitchenCfg = KITCHEN_CONFIGS[activeTheme || 'default'] ?? DEFAULT_CONFIG;
  const groups = kitchenCfg.groups;
  const labels = kitchenCfg.labels;

  const hasVIPOrder = currentOrders.some(order => order.customer.isVIP);
  const maxIngredients = hasVIPOrder ? 6 : 4;

  // Which tabs contain ingredients needed by any active order
  const neededIds = new Set(currentOrders.flatMap(o => o.recipe.ingredients));
  const tabHasNeeded = (tab: Tab) =>
    groups[tab].some(id => neededIds.has(id));

  const isDrinkOrDessert = (ingredients: string[]) =>
    RECIPES.some(recipe => {
      const isMatch =
        recipe.ingredients.length === ingredients.length &&
        recipe.ingredients.every(ing => ingredients.includes(ing));
      const isDrink = recipe.name.includes('Tea') || recipe.name.includes('Latte') || recipe.name.includes('Milkshake') || recipe.name.includes('Shake') || recipe.name.includes('Soda');
      const isDessert = recipe.name.includes('Mochi') || recipe.name.includes('Parfait') || recipe.name.includes('Cookies');
      return isMatch && (isDrink || isDessert);
    });

  const handleIngredientClick = (ingredientId: string) => {
    if (selectedIngredients.length < maxIngredients) {
      setSelectedIngredients(prev => [...prev, ingredientId]);
    }
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleCook = () => {
    if (selectedIngredients.length === 0) return;

    // Regular order matching — checked first so special customers don't intercept
    // submissions intended for other active orders (e.g. Duchess alongside Inspector)
    const matchedOrder = currentOrders.find(order =>
      order.recipe.ingredients.length === selectedIngredients.length &&
      order.recipe.ingredients.every(ing => selectedIngredients.includes(ing))
    );

    if (matchedOrder) {
      onOrderComplete(matchedOrder.id, matchedOrder.recipe.points);
      setSelectedIngredients([]);
      return;
    }

    // Special customer fallback — only reached if no exact recipe match found

    // Inspector Pawsworth
    const inspectorOrder = currentOrders.find(o => o.customer.id === 'inspector');
    if (inspectorOrder) {
      if (isDrinkOrDessert(selectedIngredients)) {
        onOrderComplete(inspectorOrder.id, 200);
      } else {
        const penalty = Math.min(50, selectedIngredients.length * 10);
        onWrongOrder(penalty);
      }
      setSelectedIngredients([]);
      return;
    }

    // Emperor Meowximilian — only gold-leaf recipes
    const emperorOrder = currentOrders.find(o => o.customer.id === 'emperor');
    if (emperorOrder && selectedIngredients.includes('gold-leaf')) {
      const matchingRecipe = RECIPES.find(r =>
        r.ingredients.length === selectedIngredients.length &&
        r.ingredients.every(ing => selectedIngredients.includes(ing)) &&
        r.ingredients.includes('gold-leaf')
      );
      if (matchingRecipe) {
        onOrderComplete(emperorOrder.id, emperorOrder.recipe.points);
      } else {
        const penalty = Math.min(50, selectedIngredients.length * 10);
        onWrongOrder(penalty);
      }
      setSelectedIngredients([]);
      return;
    }

    // Neko — any pink/white/red combo
    const nekoOrder = currentOrders.find(o => o.customer.id === 'neko');
    if (nekoOrder) {
      const valid = selectedIngredients.length >= 2 &&
        selectedIngredients.length <= 4 &&
        selectedIngredients.every(ing => NEKO_ALLOWED.includes(ing));
      if (valid) {
        onOrderComplete(nekoOrder.id, 150);
      } else {
        const penalty = Math.min(50, selectedIngredients.length * 10);
        onWrongOrder(penalty);
      }
      setSelectedIngredients([]);
      return;
    }

    // Nothing matched
    const penalty = Math.min(50, selectedIngredients.length * 10);
    onWrongOrder(penalty);
    setSelectedIngredients([]);
  };

  const visibleIngredients = INGREDIENTS.filter(i => groups[activeTab].includes(i.id));

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Utensils className={tc.kitchenIcon} />
          <h2 className="text-xl font-semibold">{tc.kitchenTitle}</h2>
          {gameMode === 'lunch-rush' && (
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full ml-1">
              ⚡ RUSH
            </span>
          )}
        </div>
        {selectedIngredients.length > 0 && (
          <button
            onClick={() => setSelectedIngredients([])}
            className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition text-sm"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Ingredient panel */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 mb-3">
            {(Object.keys(groups) as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition relative ${
                  activeTab === tab
                    ? tc.kitchenTabActive
                    : tc.kitchenTabInactive
                }`}
              >
                {labels[tab]}
                {tabHasNeeded(tab) && activeTab !== tab && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 mb-2">
            Selected: {selectedIngredients.length}/{maxIngredients}
          </p>

          <div className="grid grid-cols-4 gap-3">
            {visibleIngredients.map(ingredient => (
              <button
                key={ingredient.id}
                onClick={() => handleIngredientClick(ingredient.id)}
                disabled={selectedIngredients.length >= maxIngredients}
                className="group flex flex-col items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <div className={`w-14 h-14 rounded-full ${ingredient.color} flex items-center justify-center text-2xl shadow-sm group-hover:shadow-md transition group-hover:scale-105`}>
                  {ingredient.emoji}
                </div>
                <span className="text-xs text-center leading-tight text-gray-700">{ingredient.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cooking station */}
        <div className={`border-2 border-dashed rounded-xl p-4 flex flex-col ${tc.stationBorder}`}>
          <h3 className="font-medium mb-3 text-gray-700">{tc.stationTitle}</h3>

          <div className="flex-1 flex flex-wrap gap-2 content-start mb-4 min-h-[120px]">
            {selectedIngredients.map((ingredientId, index) => {
              const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
              return (
                <button
                  key={index}
                  onClick={() => removeIngredient(index)}
                  title="Click to remove"
                  className={`${ingredient?.color} px-2 py-1.5 rounded-lg flex items-center gap-1.5 text-sm hover:opacity-70 transition group`}
                >
                  <span>{ingredient?.emoji}</span>
                  <span>{ingredient?.name}</span>
                  <span className="text-gray-400 group-hover:text-red-500 transition text-xs ml-0.5">×</span>
                </button>
              );
            })}
            {selectedIngredients.length === 0 && (
              <p className="text-gray-400 text-sm self-center w-full text-center pt-4">
                {tc.stationEmptyText}
              </p>
            )}
          </div>

          <button
            onClick={handleCook}
            disabled={selectedIngredients.length === 0}
            className={`w-full py-2.5 rounded-lg font-semibold transition ${
              selectedIngredients.length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : tc.cookBtnActive
            }`}
          >
            {selectedIngredients.length === 0
              ? tc.cookBtnEmptyLabel
              : tc.cookBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
