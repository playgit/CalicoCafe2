import { useState } from 'react';
import { Utensils, Trash2 } from 'lucide-react';
import { INGREDIENTS, RECIPES } from '../data/recipes';
import { Order, GameMode } from '../types/game';

interface KitchenProps {
  currentOrders: Order[];
  onOrderComplete: (orderId: string, points: number) => void;
  onWrongOrder: (penalty: number) => void;
  gameMode?: GameMode;
}

type Tab = 'food' | 'sweet' | 'drink';

const INGREDIENT_GROUPS: Record<Tab, string[]> = {
  food:  ['fish', 'rice', 'nori', 'egg', 'sauce', 'noodles', 'tofu', 'chicken', 'vegetables', 'cheese', 'shrimp', 'miso', 'patty', 'bun', 'fries', 'pizza-dough', 'pepperoni'],
  sweet: ['matcha', 'mochi-flour', 'red-bean', 'cream', 'fruit', 'lychee', 'coconut', 'honey', 'mint', 'sakura', 'white-chocolate', 'lavender', 'dark-chocolate'],
  drink: ['tapioca', 'tea', 'brown-sugar', 'gold-leaf', 'truffle', 'chamomile', 'cola'],
};

const TAB_LABELS: Record<Tab, string> = {
  food:  '🍱 Food',
  sweet: '🍡 Sweet',
  drink: '🧋 Drinks',
};

const NEKO_ALLOWED: string[] = [
  'shrimp', 'sauce', 'rice', 'tofu', 'red-bean',
  'mochi-flour', 'cream', 'fruit', 'lychee', 'coconut',
];

export default function Kitchen({ currentOrders, onOrderComplete, onWrongOrder, gameMode }: KitchenProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('food');

  const hasVIPOrder = currentOrders.some(order => order.customer.isVIP);
  const maxIngredients = hasVIPOrder ? 6 : 4;

  // Which tabs contain ingredients needed by any active order
  const neededIds = new Set(currentOrders.flatMap(o => o.recipe.ingredients));
  const tabHasNeeded = (tab: Tab) =>
    INGREDIENT_GROUPS[tab].some(id => neededIds.has(id));

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

    // Regular order matching
    const matchedOrder = currentOrders.find(order =>
      order.recipe.ingredients.length === selectedIngredients.length &&
      order.recipe.ingredients.every(ing => selectedIngredients.includes(ing))
    );

    if (matchedOrder) {
      onOrderComplete(matchedOrder.id, matchedOrder.recipe.points);
    } else {
      const penalty = Math.min(50, selectedIngredients.length * 10);
      onWrongOrder(penalty);
    }

    setSelectedIngredients([]);
  };

  const visibleIngredients = INGREDIENTS.filter(i => INGREDIENT_GROUPS[activeTab].includes(i.id));

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Utensils className="text-orange-600" />
          <h2 className="text-xl font-semibold">Kitchen</h2>
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
            {(Object.keys(INGREDIENT_GROUPS) as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition relative ${
                  activeTab === tab
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {TAB_LABELS[tab]}
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
        <div className="border-2 border-dashed border-orange-200 rounded-xl p-4 flex flex-col">
          <h3 className="font-medium mb-3 text-gray-700">Cooking Station</h3>

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
                ✨ Pick ingredients to start cooking!
              </p>
            )}
          </div>

          <button
            onClick={handleCook}
            disabled={selectedIngredients.length === 0}
            className={`w-full py-2.5 rounded-lg font-semibold transition ${
              selectedIngredients.length === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-orange-600 text-white hover:bg-orange-700 shadow-sm hover:shadow-md ring-2 ring-orange-300'
            }`}
          >
            {selectedIngredients.length === 0 ? 'Add ingredients to cook' : '🍳 Cook!'}
          </button>
        </div>
      </div>
    </div>
  );
}
