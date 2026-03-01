import React, { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { RECIPES, INGREDIENTS } from '../data/recipes';
import { Recipe, CustomRecipe } from '../types/game';

type RecipeTab = 'all' | 'food' | 'dessert' | 'drink' | 'sakura' | 'night' | 'american' | 'sunset' | 'vip' | 'custom';

interface RecipeBookProps {
  onBack: () => void;
  unlockedItems: string[];
  activeTheme: string;
  customRecipes: CustomRecipe[];
  onDeleteCustomRecipe: (id: string) => void;
}

const TABS: { id: RecipeTab; label: string; lockedTheme?: string }[] = [
  { id: 'all',      label: '📋 All' },
  { id: 'food',     label: '🍱 Food' },
  { id: 'dessert',  label: '🍡 Desserts' },
  { id: 'drink',    label: '🧋 Drinks' },
  { id: 'sakura',   label: '🌸 Sakura',   lockedTheme: 'theme-sakura' },
  { id: 'night',    label: '🌙 Night',    lockedTheme: 'theme-night' },
  { id: 'american', label: '🍔 American', lockedTheme: 'theme-american' },
  { id: 'sunset',   label: '🍹 Mocktails', lockedTheme: 'theme-sunset' },
  { id: 'vip',      label: '⭐ VIP' },
  { id: 'custom',   label: '✏️ My Recipes' },
];

export default function RecipeBook({ onBack, unlockedItems, activeTheme, customRecipes, onDeleteCustomRecipe }: RecipeBookProps) {
  const [activeTab, setActiveTab] = useState<RecipeTab>('all');

  const sakuraUnlocked   = unlockedItems.includes('theme-sakura');
  const nightUnlocked    = unlockedItems.includes('theme-night');
  const americanUnlocked = unlockedItems.includes('theme-american');
  const sunsetUnlocked   = unlockedItems.includes('theme-sunset');

  const isRecipeLocked = (recipe: Recipe) => {
    if (recipe.theme === 'sakura')   return !sakuraUnlocked;
    if (recipe.theme === 'night')    return !nightUnlocked;
    if (recipe.theme === 'american') return !americanUnlocked;
    if (recipe.theme === 'sunset')   return !sunsetUnlocked;
    return false;
  };

  const filteredRecipes = RECIPES.filter(recipe => {
    if (activeTab === 'all') return true;
    return recipe.category === activeTab;
  });

  // Outer bg/card follow active theme
  const outerBg  = activeTheme === 'theme-night' ? 'bg-slate-900' : activeTheme === 'theme-sakura' ? 'bg-pink-50' : activeTheme === 'theme-american' ? 'bg-red-50' : activeTheme === 'theme-sunset' ? 'bg-gradient-to-b from-orange-100 via-rose-100 to-purple-100' : 'bg-amber-50';
  const cardBg   = activeTheme === 'theme-night' ? 'bg-slate-800' : activeTheme === 'theme-sunset' ? 'bg-white/80 backdrop-blur-sm' : 'bg-white';
  const textMain = activeTheme === 'theme-night' ? 'text-gray-100' : 'text-gray-800';
  const textSub  = activeTheme === 'theme-night' ? 'text-gray-400' : 'text-gray-600';
  const accentText  = activeTheme === 'theme-night' ? 'text-indigo-400' : activeTheme === 'theme-sakura' ? 'text-rose-500' : activeTheme === 'theme-american' ? 'text-blue-600' : activeTheme === 'theme-sunset' ? 'text-rose-500' : 'text-orange-600';
  const accentHover = activeTheme === 'theme-night' ? 'hover:text-indigo-300' : activeTheme === 'theme-sakura' ? 'hover:text-rose-700' : activeTheme === 'theme-american' ? 'hover:text-blue-800' : activeTheme === 'theme-sunset' ? 'hover:text-rose-700' : 'hover:text-orange-800';

  const tabActive = activeTheme === 'theme-night'
    ? 'bg-indigo-600 text-white'
    : activeTheme === 'theme-sakura'
      ? 'bg-rose-400 text-white'
      : activeTheme === 'theme-american'
        ? 'bg-blue-600 text-white'
        : activeTheme === 'theme-sunset'
          ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white'
          : 'bg-orange-600 text-white';

  const tabInactive = activeTheme === 'theme-night'
    ? 'bg-slate-700 text-indigo-300 hover:bg-slate-600'
    : activeTheme === 'theme-sakura'
      ? 'bg-pink-100 text-rose-600 hover:bg-pink-200'
      : activeTheme === 'theme-american'
        ? 'bg-red-100 text-blue-600 hover:bg-red-200'
        : activeTheme === 'theme-sunset'
          ? 'bg-orange-50 text-rose-600 hover:bg-rose-100'
          : 'bg-amber-50 text-amber-700 hover:bg-amber-100';

  return (
    <div className={`min-h-screen ${outerBg} p-4`}>
      <div className={`max-w-5xl mx-auto ${cardBg} rounded-xl shadow-lg p-8`}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${accentText} ${accentHover} transition`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className={`text-sm ${textSub}`}>
            {activeTab === 'custom'
              ? `${customRecipes.length} custom recipe${customRecipes.length !== 1 ? 's' : ''}`
              : `${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? 's' : ''}`}
          </div>
        </div>

        <h1 className={`text-3xl font-bold text-center ${textMain} mb-8`}>📖 Recipe Book</h1>

        {/* Tab bar */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TABS.map(tab => {
            const isTabLocked = tab.lockedTheme ? !unlockedItems.includes(tab.lockedTheme) : false;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 ${
                  activeTab === tab.id ? tabActive : tabInactive
                }`}
              >
                {tab.label}
                {isTabLocked && <span className="text-gray-400 ml-1">🔒</span>}
              </button>
            );
          })}
        </div>

        {/* Lock notice banners */}
        {activeTab === 'sakura' && !sakuraUnlocked && (
          <div className="mb-4 p-3 bg-pink-50 border border-pink-200 rounded-lg text-sm text-rose-600 flex items-center gap-2">
            🔒 Unlock <strong>Sakura Theme</strong> in the Shop (2 coins) to play this mode!
          </div>
        )}
        {activeTab === 'night' && !nightUnlocked && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-sm text-indigo-600 flex items-center gap-2">
            🔒 Unlock <strong>Night Mode</strong> in the Shop (2 coins) to play this mode!
          </div>
        )}
        {activeTab === 'american' && !americanUnlocked && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-blue-600 flex items-center gap-2">
            🔒 Unlock <strong>American Diner</strong> in the Shop (3 coins) to play this mode!
          </div>
        )}
        {activeTab === 'sunset' && !sunsetUnlocked && (
          <div className="mb-4 p-3 bg-orange-50 border border-rose-200 rounded-lg text-sm text-rose-600 flex items-center gap-2">
            🔒 Unlock <strong>Meow-Meow Mocktail Bar</strong> in the Shop (4 coins) to mix these drinks!
          </div>
        )}

        {/* Custom recipes tab */}
        {activeTab === 'custom' && (
          <>
            {customRecipes.length === 0 ? (
              <p className={`text-center ${textSub} py-12`}>
                No custom recipes yet. Visit <strong>Creative Mode</strong> to create one! 🍳
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customRecipes.map(cr => {
                  const catLabel = cr.category === 'regular' ? '🍳 Regular'
                    : cr.category === 'american' ? '🍔 American'
                    : cr.category === 'vip' ? '⭐ VIP'
                    : '🌸 Sakura';
                  return (
                    <div
                      key={cr.id}
                      className={`relative border rounded-lg p-4 transition ${
                        activeTheme === 'theme-night'
                          ? 'border-slate-600 bg-slate-700 hover:bg-slate-600'
                          : 'border-purple-200 bg-purple-50 hover:shadow-md'
                      }`}
                    >
                      <button
                        onClick={() => onDeleteCustomRecipe(cr.id)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
                        title="Delete recipe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <h3 className={`font-semibold mb-1 pr-6 ${activeTheme === 'theme-night' ? 'text-gray-100' : 'text-purple-800'}`}>
                        {cr.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-3 text-xs">
                        <span className="text-purple-500 font-medium">✏️ Custom</span>
                        <span className={textSub}>{catLabel}</span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {cr.ingredients.map((id, i) => {
                          const ingredient = INGREDIENTS.find(x => x.id === id);
                          if (!ingredient) return null;
                          return (
                            <span
                              key={i}
                              className={`${ingredient.color} px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1`}
                            >
                              <span>{ingredient.emoji}</span>
                              <span>{ingredient.name}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Recipe grid */}
        {activeTab !== 'custom' && (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map(recipe => {
            const locked = isRecipeLocked(recipe);
            let cardClass = '';
            if (locked) {
              cardClass = activeTheme === 'theme-night'
                ? 'border-slate-600 bg-slate-700 opacity-60'
                : 'border-gray-200 bg-gray-50 opacity-60';
            } else if (recipe.theme === 'sakura') {
              cardClass = 'border-pink-200 bg-pink-50';
            } else if (recipe.theme === 'night') {
              cardClass = 'border-indigo-200 bg-indigo-50';
            } else if (recipe.theme === 'american') {
              cardClass = 'border-red-200 bg-red-50';
            } else if (recipe.theme === 'sunset') {
              cardClass = 'border-rose-200 bg-gradient-to-br from-orange-50 to-rose-50';
            } else if (recipe.vipOnly) {
              cardClass = 'border-yellow-300 bg-yellow-50';
            } else {
              cardClass = activeTheme === 'theme-night'
                ? 'border-slate-600 bg-slate-700 hover:bg-slate-600'
                : 'border-amber-100 bg-white hover:shadow-md';
            }

            const nameColor = locked
              ? 'text-gray-400'
              : recipe.theme === 'sakura'
                ? 'text-rose-700'
                : recipe.theme === 'night'
                  ? 'text-indigo-700'
                  : recipe.theme === 'american'
                    ? 'text-blue-700'
                    : recipe.theme === 'sunset'
                      ? 'text-rose-600'
                      : recipe.vipOnly
                        ? 'text-yellow-700'
                        : textMain;

            const ptsColor = recipe.theme === 'sakura' ? 'text-rose-500'
              : recipe.theme === 'night'    ? 'text-indigo-500'
              : recipe.theme === 'american' ? 'text-blue-600'
              : recipe.theme === 'sunset'   ? 'text-rose-500'
              : 'text-orange-600';

            return (
              <div
                key={recipe.id}
                className={`relative border rounded-lg p-4 transition ${cardClass}`}
              >
                {locked && (
                  <div className="absolute top-2 right-2 text-gray-400 text-base">🔒</div>
                )}

                <h3 className={`font-semibold mb-1 pr-6 ${nameColor}`}>{recipe.name}</h3>

                {/* Meta: points, time, tags */}
                <div className="flex items-center flex-wrap gap-2 mb-3 text-xs">
                  <span className={`font-bold ${ptsColor}`}>{recipe.points} pts</span>
                  <span className={textSub}>⏱ {recipe.timeLimit}s</span>
                  {recipe.vipOnly && !recipe.theme && (
                    <span className="text-yellow-600 font-medium">⭐ VIP</span>
                  )}
                  {recipe.theme === 'sakura'   && <span className="text-rose-400 font-medium">🌸 Sakura</span>}
                  {recipe.theme === 'night'    && <span className="text-indigo-400 font-medium">🌙 Night</span>}
                  {recipe.theme === 'american' && <span className="text-blue-500 font-medium">🍔 Diner</span>}
                  {recipe.theme === 'sunset'   && <span className="text-rose-400 font-medium">🍹 Mocktail</span>}
                </div>

                {/* Ingredient chips */}
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.map(ingredientId => {
                    const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
                    if (!ingredient) return null;
                    return (
                      <span
                        key={ingredientId}
                        className={`${ingredient.color} px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1`}
                      >
                        <span>{ingredient.emoji}</span>
                        <span>{ingredient.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {filteredRecipes.length === 0 && (
          <p className={`text-center ${textSub} py-12`}>No recipes in this category.</p>
        )}
        </>
        )}

      </div>
    </div>
  );
}
