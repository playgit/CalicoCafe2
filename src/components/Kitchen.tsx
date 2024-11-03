import React, { useState } from 'react';
import { Utensils, Trash2 } from 'lucide-react';
import { INGREDIENTS, RECIPES } from '../data/recipes';
import { Order } from '../types/game';
import { getFeedback } from '../utils/feedback';

interface KitchenProps {
  currentOrders: Order[];
  onOrderComplete: (orderId: string, points: number) => void;
  onWrongOrder: (penalty: number) => void;
}

export default function Kitchen({ currentOrders, onOrderComplete, onWrongOrder }: KitchenProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);

  const NEKO_ALLOWED_INGREDIENTS = [
    'shrimp', 'sauce', 'rice', 'tofu', 'red-bean',
    'mochi-flour', 'cream', 'fruit', 'lychee', 'coconut'
  ];

  const hasVIPOrder = currentOrders.some(order => order.customer.isVIP);
  const maxIngredients = hasVIPOrder ? 6 : 4;

  const isDrinkOrDessert = (ingredients: string[]) => {
    return RECIPES.some(recipe => {
      const isMatch = recipe.ingredients.length === ingredients.length &&
        recipe.ingredients.every(ing => ingredients.includes(ing));
      const isDrink = recipe.name.includes('Tea') || recipe.name.includes('Latte');
      const isDessert = recipe.name.includes('Mochi') || recipe.name.includes('Parfait');
      return isMatch && (isDrink || isDessert);
    });
  };

  const isValidNekoIngredients = (ingredients: string[]) => {
    return ingredients.length >= 2 && ingredients.length <= 4 && 
           ingredients.every(ing => NEKO_ALLOWED_INGREDIENTS.includes(ing));
  };

  const handleIngredientClick = (ingredientId: string) => {
    if (selectedIngredients.length < maxIngredients) {
      setSelectedIngredients(prev => [...prev, ingredientId]);
    }
  };

  const handleCook = () => {
    // Check for special inspector case
    const inspectorOrder = currentOrders.find(order => 
      order.customer.id === 'inspector');
    if (inspectorOrder && isDrinkOrDessert(selectedIngredients)) {
      const matchingRecipe = RECIPES.find(recipe => 
        recipe.ingredients.length === selectedIngredients.length &&
        recipe.ingredients.every(ing => selectedIngredients.includes(ing))
      );
      
      const points = 200;
      const { message } = getFeedback(matchingRecipe?.name || "Special Creation", true);
      setFeedback({ message, isSuccess: true });
      onOrderComplete(inspectorOrder.id, points);
      setSelectedIngredients([]);
      return;
    } else if (inspectorOrder) {
      const penalty = Math.min(50, selectedIngredients.length * 10);
      const { message } = getFeedback("The Inspector only accepts drinks and desserts!", false);
      setFeedback({ message, isSuccess: false });
      onWrongOrder(penalty);
      setSelectedIngredients([]);
      return;
    }

    // Check for Neko's order
    const nekoOrder = currentOrders.find(order => 
      order.customer.id === 'neko');
    if (nekoOrder) {
      if (isValidNekoIngredients(selectedIngredients)) {
        const points = 150;
        const ingredients = selectedIngredients
          .map(id => INGREDIENTS.find(i => i.id === id)?.name)
          .filter(Boolean)
          .join(', ');
        const { message } = getFeedback(`Love Creation (${ingredients})`, true);
        setFeedback({ message, isSuccess: true });
        onOrderComplete(nekoOrder.id, points);
        setSelectedIngredients([]);
        return;
      } else {
        const penalty = Math.min(50, selectedIngredients.length * 10);
        const { message } = getFeedback("Neko only accepts pink, white, or red ingredients! (2-4 ingredients)", false);
        setFeedback({ message, isSuccess: false });
        onWrongOrder(penalty);
        setSelectedIngredients([]);
        return;
      }
    }

    // Regular order processing
    const matchedOrder = currentOrders.find(order => {
      const recipe = RECIPES.find(r => 
        r.ingredients.length === selectedIngredients.length &&
        r.ingredients.every(ing => selectedIngredients.includes(ing))
      );
      return recipe && order.recipe.ingredients.length === selectedIngredients.length &&
        order.recipe.ingredients.every(ing => selectedIngredients.includes(ing));
    });

    if (matchedOrder) {
      const { message } = getFeedback(matchedOrder.recipe.name, true);
      setFeedback({ message, isSuccess: true });
      onOrderComplete(matchedOrder.id, matchedOrder.recipe.points);
    } else {
      const penalty = Math.min(50, selectedIngredients.length * 10);
      const { message } = getFeedback(selectedIngredients, false);
      setFeedback({ message, isSuccess: false });
      onWrongOrder(penalty);
    }

    setTimeout(() => setFeedback(null), 3000);
    setSelectedIngredients([]);
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Utensils className="text-orange-600" />
          <h2 className="text-xl font-semibold">Kitchen</h2>
        </div>
        {selectedIngredients.length > 0 && (
          <button
            onClick={clearIngredients}
            className="text-gray-500 hover:text-red-500 transition"
            title="Clear ingredients"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {feedback && (
        <div className={`mb-4 p-3 rounded-lg text-center transition-all ${
          feedback.isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium">Ingredients ({selectedIngredients.length}/{maxIngredients})</h3>
          <div className="grid grid-cols-2 gap-3">
            {INGREDIENTS.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => handleIngredientClick(ingredient.id)}
                disabled={selectedIngredients.length >= maxIngredients}
                className={`group relative ${ingredient.color} p-3 rounded-lg shadow hover:shadow-md transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="text-sm">{ingredient.name}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Click to add {ingredient.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
          <h3 className="font-medium mb-4">Cooking Station</h3>
          <div className="min-h-[200px] flex flex-wrap gap-2 mb-4">
            {selectedIngredients.map((ingredientId, index) => {
              const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
              return (
                <div
                  key={index}
                  className={`${ingredient?.color} p-2 rounded flex items-center gap-1`}
                >
                  <span className="text-sm">{ingredient?.name}</span>
                  <span className="text-xs text-gray-500">#{index + 1}</span>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleCook}
            disabled={selectedIngredients.length === 0}
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cook!
          </button>
        </div>
      </div>
    </div>
  );
}