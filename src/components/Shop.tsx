import React from 'react';
import { ArrowLeft, ShoppingBag, Cat } from 'lucide-react';
import { SHOP_ITEMS } from '../data/shop';
import { ShopItem } from '../types/game';
import { getThemeConfig, THEME_CONFIG } from '../data/themeConfig';

interface ThemeClasses {
  bg: string;
  header: string;
  card: string;
  text: string;
  subtext: string;
}

interface ShopProps {
  onBack: () => void;
  coins: number;
  onPurchase: (item: ShopItem) => void;
  unlockedItems: string[];
  activeTheme: string;
  onActivateTheme: (id: string) => void;
  themeClasses: ThemeClasses;
}

export default function Shop({ onBack, coins, onPurchase, unlockedItems, activeTheme, onActivateTheme, themeClasses }: ShopProps) {
  const tc = getThemeConfig(activeTheme);

  return (
    <div className={`min-h-screen ${themeClasses.bg} p-4`}>
      <div className={`max-w-4xl mx-auto ${themeClasses.card} rounded-xl shadow-lg p-8`}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${tc.shopAccentText} ${tc.shopAccentHover} transition`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-amber-500">{coins} Coins</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-8">
          <Cat className={`w-7 h-7 ${tc.shopAccentText}`} />
          <h1 className={`text-3xl font-bold ${themeClasses.text}`}>Calico Café Shop</h1>
          <Cat className={`w-7 h-7 ${tc.shopAccentText}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOP_ITEMS.map((item) => {
            const isUnlocked = unlockedItems.includes(item.id);
            const canAfford = coins >= item.cost;
            const isActive = activeTheme === item.id;
            const isTheme = item.type === 'theme';
            const itemTc = THEME_CONFIG[item.id];

            return (
              <div
                key={item.id}
                className={`border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
                  isUnlocked ? tc.shopCardUnlockedBg : `${themeClasses.card} ${tc.shopCardBorder}`
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`font-semibold text-lg ${themeClasses.text}`}>{item.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500 font-bold">{item.cost}</span>
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                <p className={`${themeClasses.subtext} text-sm mb-4`}>{item.description}</p>

                {isUnlocked && isTheme ? (
                  <div className="space-y-2">
                    <div className="w-full py-2 px-4 rounded bg-green-100 text-green-700 text-center text-sm font-medium">
                      ✓ Unlocked
                    </div>
                    {isActive ? (
                      <div className={`w-full py-2 px-4 rounded text-center text-sm font-semibold ${
                        itemTc ? itemTc.shopActiveBg : 'bg-orange-100 text-orange-700'
                      }`}>
                        {itemTc ? itemTc.shopActiveLabel : '✓ Active'}
                      </div>
                    ) : (
                      <button
                        onClick={() => onActivateTheme(item.id)}
                        className={`w-full py-2 px-4 rounded transition text-sm font-medium text-white ${
                          itemTc ? itemTc.shopActivateBtn : 'bg-orange-600 hover:bg-orange-700'
                        }`}
                      >
                        Activate
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => !isUnlocked && canAfford && onPurchase(item)}
                    disabled={isUnlocked || !canAfford}
                    className={`w-full py-2.5 px-4 rounded transition ${
                      isUnlocked
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : canAfford
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isUnlocked ? 'Unlocked ✓' : canAfford ? 'Purchase' : 'Not enough coins'}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Theme switcher note */}
        {unlockedItems.some(id => id.startsWith('theme-')) ? (
          <p className={`text-center text-sm ${themeClasses.subtext} mt-6`}>
            Tip: Click <strong>Activate</strong> on any unlocked theme to switch your café's look!
          </p>
        ) : null}
      </div>
    </div>
  );
}
