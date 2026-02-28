import React, { useState } from 'react';
import { Utensils, Trash2 } from 'lucide-react';
import { INGREDIENTS, RECIPES } from '../data/recipes';
import { Order, GameMode } from '../types/game';
import { getFeedback } from '../utils/feedback';

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
  const [feedback, setFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('food');

  const hasVIPOrder = currentOrders.some(order => order.customer.isVIP);
  const maxIngredients = hasVIPOrder ? 6 : 4;

  const showFeedback = (message: string, isSuccess: boolean) => {
    setFeedback({ message, isSuccess });
    setTimeout(() => setFeedback(null), 3000);
  };

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
        const matchingRecipe = RECIPES.find(r =>
          r.ingredients.length === selectedIngredients.length &&
          r.ingredients.every(ing => selectedIngredients.includes(ing))
        );
        showFeedback(getFeedback(matchingRecipe?.name || 'Special Creation', true).message, true);
        onOrderComplete(inspectorOrder.id, 200);
      } else {
        const penalty = Math.min(50, selectedIngredients.length * 10);
        showFeedback(getFeedback('The Inspector only accepts drinks and desserts!', false).message, false);
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
        showFeedback(getFeedback(matchingRecipe.name, true).message, true);
        onOrderComplete(emperorOrder.id, emperorOrder.recipe.points);
      } else {
        const penalty = Math.min(50, selectedIngredients.length * 10);
        showFeedback(getFeedback("The Emperor's golden recipe wasn't right!", false).message, false);
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
        const ingredientNames = selectedIngredients
          .map(id => INGREDIENTS.find(i => i.id === id)?.name)
          .filter(Boolean)
          .join(', ');
        showFeedback(getFeedback(`Love Creation (${ingredientNames})`, true).message, true);
        onOrderComplete(nekoOrder.id, 150);
      } else {
        const penalty = Math.min(50, selectedIngredients.length * 10);
        showFeedback(getFeedback('Neko only accepts pink/white/red ingredients! (2–4 items)', false).message, false);
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
      showFeedback(getFeedback(matchedOrder.recipe.name, true).message, true);
      onOrderComplete(matchedOrder.id, matchedOrder.recipe.points);
    } else {
      const penalty = Math.min(50, selectedIngredients.length * 10);
      showFeedback(getFeedback(selectedIngredients, false).message, false);
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

      {feedback && (
        <div className={`mb-4 p-3 rounded-lg text-center text-sm ${
          feedback.isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Ingredient panel */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 mb-3">
            {(Object.keys(INGREDIENT_GROUPS) as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 mb-2">
            Selected: {selectedIngredients.length}/{maxIngredients}
          </p>

          <div className="grid grid-cols-2 gap-2">
            {visibleIngredients.map(ingredient => (
              <button
                key={ingredient.id}
                onClick={() => handleIngredientClick(ingredient.id)}
                disabled={selectedIngredients.length >= maxIngredients}
                className={`group relative ${ingredient.color} p-3 rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm`}
              >
                <span className="text-base leading-none">{ingredient.emoji}</span>
                <span className="font-medium">{ingredient.name}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                  Add {ingredient.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cooking station */}
        <div className="border-2 border-dashed border-orange-200 rounded-xl p-4 flex flex-col">
          <h3 className="font-medium mb-3 text-gray-700">Cooking Station</h3>

          <div className="flex-1 flex flex-wrap gap-2 content-start mb-4 min-h-[200px]">
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
              <p className="text-gray-400 text-sm self-center w-full text-center pt-6">
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
                : 'bg-orange-600 text-white hover:bg-orange-700 shadow-sm hover:shadow-md'
            }`}
          >
            {selectedIngredients.length === 0 ? 'Add ingredients to cook' : '🍳 Cook!'}
          </button>
        </div>
      </div>
    </div>
  );
}
