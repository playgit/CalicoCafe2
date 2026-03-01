import React, { useState } from 'react';
import { ArrowLeft, Trash2, FlaskConical } from 'lucide-react';
import { INGREDIENTS, RECIPES } from '../data/recipes';
import { CustomRecipe } from '../types/game';
import { nameDish } from '../utils/dishNamer';

type Tab = 'food' | 'sweet' | 'drink' | 'sunset';

const INGREDIENT_GROUPS: Record<Tab, string[]> = {
  food:  ['fish', 'rice', 'nori', 'egg', 'sauce', 'noodles', 'tofu', 'chicken', 'vegetables', 'cheese', 'shrimp', 'miso', 'patty', 'bun', 'fries', 'pizza-dough', 'pepperoni'],
  sweet: ['matcha', 'mochi-flour', 'red-bean', 'cream', 'fruit', 'lychee', 'coconut', 'honey', 'mint', 'sakura', 'white-chocolate', 'lavender', 'dark-chocolate'],
  drink: ['tapioca', 'tea', 'brown-sugar', 'gold-leaf', 'truffle', 'chamomile', 'cola'],
  sunset: [
    'passionfruit', 'mango', 'pineapple', 'watermelon', 'lychee', 'dragon-fruit', 'lime', 'fruit', 'coconut',
    'grenadine', 'rose-syrup', 'honey', 'agave', 'lavender', 'sakura', 'hibiscus', 'butterfly-pea',
    'soda-water', 'crushed-ice', 'boba', 'espresso', 'ginger', 'mint', 'gold-leaf',
  ],
};

const TAB_LABELS: Record<Tab, string> = {
  food:   '🍱 Food',
  sweet:  '🍡 Sweet',
  drink:  '🧋 Drinks',
  sunset: '🍹 Mocktails',
};

type SaveCategory = 'regular' | 'american' | 'vip' | 'sakura' | 'sunset';

interface ThemeClasses {
  bg: string;
  header: string;
  card: string;
  text: string;
  subtext: string;
}

interface CreativeModeProps {
  onBack: () => void;
  coins: number;
  onSpendCoins: (amount: number) => boolean;
  customRecipes: CustomRecipe[];
  onSaveRecipe: (recipe: CustomRecipe) => void;
  unlockedItems: string[];
  themeClasses: ThemeClasses;
  activeTheme: string;
}

const MAX_CUSTOM_RECIPES = 10;

export default function CreativeMode({
  onBack, coins, onSpendCoins, customRecipes, onSaveRecipe, unlockedItems, themeClasses, activeTheme,
}: CreativeModeProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('food');
  const [createdName, setCreatedName] = useState<string | null>(null);
  const [isKnownRecipe, setIsKnownRecipe] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveCategory, setSaveCategory] = useState<SaveCategory>('regular');
  const [customSaveName, setCustomSaveName] = useState('');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [usedNames, setUsedNames] = useState<Set<string>>(new Set());

  const accentBtn = activeTheme === 'theme-night'
    ? 'bg-indigo-600 hover:bg-indigo-700'
    : activeTheme === 'theme-sakura'
      ? 'bg-rose-400 hover:bg-rose-500'
      : activeTheme === 'theme-american'
        ? 'bg-blue-600 hover:bg-blue-700'
        : activeTheme === 'theme-sunset'
          ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500'
          : 'bg-orange-600 hover:bg-orange-700';

  const accentText = activeTheme === 'theme-night'
    ? 'text-indigo-400'
    : activeTheme === 'theme-sakura'
      ? 'text-rose-500'
      : activeTheme === 'theme-american'
        ? 'text-blue-600'
        : activeTheme === 'theme-sunset'
          ? 'text-rose-500'
          : 'text-orange-600';

  const liveName = selectedIngredients.length > 0 ? nameDish(selectedIngredients, usedNames) : null;
  const visibleIngredients = INGREDIENTS.filter(i => INGREDIENT_GROUPS[activeTab].includes(i.id));

  const handleIngredientClick = (id: string) => {
    if (selectedIngredients.length < 6) {
      setSelectedIngredients(prev => [...prev, id]);
      setCreatedName(null);
    }
  };

  const removeIngredient = (index: number) => {
    setSelectedIngredients(prev => prev.filter((_, i) => i !== index));
    setCreatedName(null);
  };

  const handleCreate = () => {
    if (selectedIngredients.length === 0) return;
    const name = nameDish(selectedIngredients, usedNames);
    const sorted = selectedIngredients.slice().sort();
    const isKnown = RECIPES.some(r =>
      r.ingredients.length === selectedIngredients.length &&
      r.ingredients.slice().sort().join(',') === sorted.join(',')
    );
    setCreatedName(name);
    setIsKnownRecipe(isKnown);
    setCustomSaveName(name);
    setUsedNames(prev => new Set(prev).add(name));
  };

  const openSaveModal = () => {
    if (!createdName) return;
    setCustomSaveName(createdName);
    setSaveError(null);
    setShowSaveModal(true);
  };

  const handleConfirmSave = () => {
    setSaveError(null);
    if (customRecipes.length >= MAX_CUSTOM_RECIPES) {
      setSaveError(`Recipe Book is full (${MAX_CUSTOM_RECIPES}/${MAX_CUSTOM_RECIPES}). Delete a recipe to make room.`);
      return;
    }
    const trimmed = customSaveName.trim();
    if (!trimmed) {
      setSaveError('Please enter a recipe name.');
      return;
    }
    const spent = onSpendCoins(100);
    if (!spent) {
      setSaveError('Not enough coins! You need 100 🪙');
      return;
    }
    const recipe: CustomRecipe = {
      id: `custom-${Date.now()}`,
      name: trimmed,
      ingredients: selectedIngredients.slice(),
      category: saveCategory,
      savedAt: Date.now(),
    };
    onSaveRecipe(recipe);
    setShowSaveModal(false);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2500);
  };

  const sakuraUnlocked   = unlockedItems.includes('theme-sakura');
  const americanUnlocked = unlockedItems.includes('theme-american');
  const sunsetUnlocked   = unlockedItems.includes('theme-sunset');
  const atLimit = customRecipes.length >= MAX_CUSTOM_RECIPES;

  const CATEGORIES: { id: SaveCategory; label: string; locked?: boolean }[] = [
    { id: 'regular',  label: '🍳 Regular' },
    { id: 'american', label: '🍔 American', locked: !americanUnlocked },
    { id: 'vip',      label: '⭐ VIP' },
    { id: 'sakura',   label: '🌸 Sakura', locked: !sakuraUnlocked },
    { id: 'sunset',   label: '🍹 Mocktail', locked: !sunsetUnlocked },
  ];

  return (
    <div className={`min-h-screen ${themeClasses.bg} flex flex-col`}>
      {/* Header */}
      <header className={`${themeClasses.header} text-white p-4 shadow-lg`}>
        <div className="container mx-auto flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <FlaskConical className="w-6 h-6" />
            <h1 className="text-xl font-bold">Creative Mode — Kitchen Lab</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full font-medium">{coins} 🪙</span>
            <span className="text-white/70 text-xs">{customRecipes.length}/{MAX_CUSTOM_RECIPES} saved</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 pb-6">
        {/* Left — Ingredient selector */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-5">
          <h2 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            🥘 Ingredients
          </h2>

          {/* Tabs */}
          <div className="flex gap-1 mb-3">
            {(Object.keys(INGREDIENT_GROUPS) as Tab[])
              .filter(tab => tab !== 'sunset' || sunsetUnlocked)
              .map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition ${
                  activeTab === tab
                    ? tab === 'sunset'
                      ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white shadow-sm'
                      : 'bg-orange-600 text-white shadow-sm'
                    : tab === 'sunset'
                      ? 'bg-orange-50 text-rose-600 hover:bg-rose-100'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 mb-2">Selected: {selectedIngredients.length}/6</p>

          <div className="grid grid-cols-2 gap-2">
            {visibleIngredients.map(ingredient => (
              <button
                key={ingredient.id}
                onClick={() => handleIngredientClick(ingredient.id)}
                disabled={selectedIngredients.length >= 6}
                className={`${ingredient.color} p-3 rounded-lg shadow-sm hover:shadow-md transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm`}
              >
                <span className="text-base leading-none">{ingredient.emoji}</span>
                <span className="font-medium">{ingredient.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right — Creation Station */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-white rounded-xl shadow-md p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                ✨ Creation Station
              </h2>
              {selectedIngredients.length > 0 && (
                <button
                  onClick={() => { setSelectedIngredients([]); setCreatedName(null); }}
                  className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>

            {/* Live name preview */}
            {liveName && !createdName && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Looks like:</span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium italic">
                  {liveName}
                </span>
              </div>
            )}

            {/* Ingredient chips */}
            <div className="border-2 border-dashed border-orange-200 rounded-xl p-4 min-h-[120px] flex flex-wrap gap-2 content-start">
              {selectedIngredients.map((id, index) => {
                const ingredient = INGREDIENTS.find(i => i.id === id);
                return (
                  <button
                    key={index}
                    onClick={() => removeIngredient(index)}
                    title="Click to remove"
                    className={`${ingredient?.color} px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-sm hover:opacity-70 transition group`}
                  >
                    <span>{ingredient?.emoji}</span>
                    <span>{ingredient?.name}</span>
                    <span className="text-gray-400 group-hover:text-red-500 text-xs ml-0.5">×</span>
                  </button>
                );
              })}
              {selectedIngredients.length === 0 && (
                <p className="text-gray-400 text-sm self-center w-full text-center pt-2">
                  Click ingredients on the left to add them here
                </p>
              )}
            </div>

            {/* Create button */}
            <button
              onClick={handleCreate}
              disabled={selectedIngredients.length === 0}
              className={`w-full py-3 rounded-lg font-semibold transition text-white ${
                selectedIngredients.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md'
              }`}
            >
              {selectedIngredients.length === 0 ? 'Add ingredients to create' : '🧪 Create Dish!'}
            </button>

            {/* Result card */}
            {createdName && (
              <div className={`rounded-xl p-5 border-2 ${isKnownRecipe ? 'bg-blue-50 border-blue-200' : 'bg-green-50 border-green-200'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{isKnownRecipe ? '📖' : '✨'}</span>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-wide mb-0.5 ${isKnownRecipe ? 'text-blue-500' : 'text-green-600'}`}>
                      {isKnownRecipe ? 'Known Recipe!' : 'New Creation!'}
                    </p>
                    <p className="text-xl font-bold text-gray-800">{createdName}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {selectedIngredients.map((id, i) => {
                    const ing = INGREDIENTS.find(x => x.id === id);
                    return (
                      <span key={i} className={`${ing?.color} px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1`}>
                        <span>{ing?.emoji}</span>
                        <span>{ing?.name}</span>
                      </span>
                    );
                  })}
                </div>

                {savedFlash ? (
                  <div className="w-full py-2 rounded-lg bg-green-600 text-white text-center font-semibold text-sm">
                    ✅ Recipe Saved!
                  </div>
                ) : (
                  <button
                    onClick={openSaveModal}
                    disabled={atLimit || coins < 100}
                    className={`w-full py-2 rounded-lg font-semibold transition text-sm ${
                      atLimit
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : coins < 100
                          ? 'bg-amber-100 text-amber-400 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                    }`}
                  >
                    {atLimit
                      ? `Recipe Book Full (${MAX_CUSTOM_RECIPES}/${MAX_CUSTOM_RECIPES})`
                      : coins < 100
                        ? `Save for 100 🪙 (need ${100 - coins} more)`
                        : 'Save for 100 🪙'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Saved creations list */}
          {customRecipes.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-semibold text-gray-700 mb-3">✏️ Your Saved Recipes ({customRecipes.length}/{MAX_CUSTOM_RECIPES})</h3>
              <div className="space-y-2">
                {customRecipes.slice().reverse().map(cr => {
                  const catLabel = cr.category === 'regular' ? '🍳 Regular' : cr.category === 'american' ? '🍔 American' : cr.category === 'vip' ? '⭐ VIP' : cr.category === 'sunset' ? '🍹 Mocktail' : '🌸 Sakura';
                  return (
                    <div key={cr.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-sm truncate">{cr.name}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {cr.ingredients.map((id, i) => {
                            const ing = INGREDIENTS.find(x => x.id === id);
                            return (
                              <span key={i} className={`${ing?.color} px-1.5 py-0.5 rounded text-xs flex items-center gap-0.5`}>
                                <span>{ing?.emoji}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 shrink-0">{catLabel}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Save modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Save Recipe — 100 🪙</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">Recipe Name</label>
              <input
                type="text"
                value={customSaveName}
                onChange={e => setCustomSaveName(e.target.value)}
                maxLength={40}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="Name your creation…"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => !cat.locked && setSaveCategory(cat.id)}
                    disabled={cat.locked}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition border-2 ${
                      cat.locked
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : saveCategory === cat.id
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                    }`}
                  >
                    {cat.label}
                    {cat.locked && <span className="ml-1 text-gray-400">🔒</span>}
                  </button>
                ))}
              </div>
            </div>

            {saveError && (
              <p className="text-red-600 text-sm mb-3 bg-red-50 border border-red-200 rounded-lg p-2">
                {saveError}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { setShowSaveModal(false); setSaveError(null); }}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSave}
                className="flex-1 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white transition font-semibold text-sm"
              >
                Save — 100 🪙
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
