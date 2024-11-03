import React from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { SHOP_ITEMS } from '../data/shop';
import { ShopItem } from '../types/game';

interface ShopProps {
  onBack: () => void;
  coins: number;
  onPurchase: (item: ShopItem) => void;
  unlockedItems: string[];
}

export default function Shop({ onBack, coins, onPurchase, unlockedItems }: ShopProps) {
  return (
    <div className="min-h-screen bg-amber-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-500" />
            <span className="font-bold text-amber-500">{coins} Coins</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">Calico Café Shop</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOP_ITEMS.map((item) => {
            const isUnlocked = unlockedItems.includes(item.id);
            const canAfford = coins >= item.cost;

            return (
              <div
                key={item.id}
                className={`border rounded-lg p-4 ${
                  isUnlocked
                    ? 'bg-gray-50 border-gray-200'
                    : 'bg-white border-amber-200 hover:border-amber-300 transition'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-500 font-bold">{item.cost}</span>
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <p className="text-gray-500 text-xs mb-4">{item.effect}</p>
                <button
                  onClick={() => !isUnlocked && canAfford && onPurchase(item)}
                  disabled={isUnlocked || !canAfford}
                  className={`w-full py-2 px-4 rounded transition ${
                    isUnlocked
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : canAfford
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isUnlocked ? 'Unlocked' : canAfford ? 'Purchase' : 'Not enough coins'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}