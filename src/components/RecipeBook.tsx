import React, { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { RECIPES, INGREDIENTS } from '../data/recipes';
import { Recipe, CustomRecipe } from '../types/game';
import { getThemeConfig, getRecipeThemeConfig } from '../data/themeConfig';

type RecipeTab = 'all' | 'food' | 'dessert' | 'drink' | 'sakura' | 'night' | 'american' | 'sunset' | 'cosmic' | 'campfire' | 'zen' | 'candy' | 'ocean' | 'vip' | 'custom';

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
  { id: 'sakura',   label: '🌸 Sakura',    lockedTheme: 'theme-sakura' },
  { id: 'night',    label: '🌙 Night',     lockedTheme: 'theme-night' },
  { id: 'american', label: '🍔 American',  lockedTheme: 'theme-american' },
  { id: 'sunset',   label: '🍹 Mocktails', lockedTheme: 'theme-sunset' },
  { id: 'cosmic',   label: '🌌 Cosmic',    lockedTheme: 'theme-cosmic' },
  { id: 'campfire', label: '🏕️ Campfire',  lockedTheme: 'theme-campfire' },
  { id: 'zen',      label: '🎋 Zen',       lockedTheme: 'theme-zen' },
  { id: 'candy',    label: '🍭 Candy',     lockedTheme: 'theme-candy' },
  { id: 'ocean',    label: '🌊 Ocean',     lockedTheme: 'theme-ocean' },
  { id: 'vip',      label: '⭐ VIP' },
  { id: 'custom',   label: '✏️ My Recipes' },
];

export default function RecipeBook({ onBack, unlockedItems, activeTheme, customRecipes, onDeleteCustomRecipe }: RecipeBookProps) {
  const [activeTab, setActiveTab] = useState<RecipeTab>('all');
  const tc = getThemeConfig(activeTheme);

  const isRecipeLocked = (recipe: Recipe) => {
    if (recipe.theme) {
      return !unlockedItems.includes(`theme-${recipe.theme}`);
    }
    return false;
  };

  const filteredRecipes = RECIPES.filter(recipe => {
    if (activeTab === 'all') return true;
    return recipe.category === activeTab;
  });

  const textMain = tc.text;
  const textSub = tc.subtext;

  return (
    <div className={`min-h-screen ${tc.bg} p-4`}>
      <div className={`max-w-5xl mx-auto ${tc.card} rounded-xl shadow-lg p-8`}>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${tc.rbAccentText} ${tc.rbAccentHover} transition`}
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

        {/* Tab bar — horizontal scroll for many tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {TABS.map(tab => {
            const isTabLocked = tab.lockedTheme ? !unlockedItems.includes(tab.lockedTheme) : false;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-1 whitespace-nowrap ${
                  activeTab === tab.id ? tc.tabActive : tc.tabInactive
                }`}
              >
                {tab.label}
                {isTabLocked && <span className="text-gray-400 ml-1">🔒</span>}
              </button>
            );
          })}
        </div>

        {/* Lock notice banners — driven by config */}
        {TABS.map(tab => {
          if (!tab.lockedTheme || activeTab !== tab.id) return null;
          if (unlockedItems.includes(tab.lockedTheme)) return null;
          const tabTc = getThemeConfig(tab.lockedTheme);
          const banner = tabTc.lockBanner;
          if (!banner.message) return null;
          return (
            <div key={tab.id} className={`mb-4 p-3 ${banner.bg} border ${banner.border} rounded-lg text-sm ${banner.text} flex items-center gap-2`}
              dangerouslySetInnerHTML={{ __html: banner.message }}
            />
          );
        })}

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
                    : cr.category === 'vip' ? '⭐ VIP'
                    : getRecipeThemeConfig(cr.category)?.recipeBadge || `📦 ${cr.category}`;
                  return (
                    <div
                      key={cr.id}
                      className={`relative border rounded-lg p-4 transition ${
                        tc.isDark
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

                      <h3 className={`font-semibold mb-1 pr-6 ${tc.isDark ? 'text-gray-100' : 'text-purple-800'}`}>
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
            const recipeTc = recipe.theme ? getRecipeThemeConfig(recipe.theme) : null;

            let cardClass = '';
            if (locked) {
              cardClass = tc.isDark
                ? 'border-slate-600 bg-slate-700 opacity-60'
                : 'border-gray-200 bg-gray-50 opacity-60';
            } else if (recipeTc) {
              cardClass = recipeTc.recipeCardClass;
            } else if (recipe.vipOnly) {
              cardClass = 'border-yellow-300 bg-yellow-50';
            } else {
              cardClass = tc.isDark
                ? 'border-slate-600 bg-slate-700 hover:bg-slate-600'
                : 'border-amber-100 bg-white hover:shadow-md';
            }

            const nameColor = locked
              ? 'text-gray-400'
              : recipeTc
                ? recipeTc.recipeNameColor
                : recipe.vipOnly
                  ? 'text-yellow-700'
                  : textMain;

            const ptsColor = recipeTc
              ? recipeTc.recipeBadgeColor || 'text-orange-600'
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
                  {recipeTc && recipeTc.recipeBadge && (
                    <span className={`${recipeTc.recipeBadgeColor} font-medium`}>{recipeTc.recipeBadge}</span>
                  )}
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
