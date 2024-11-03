import React, { useEffect } from 'react';
import { Timer, Crown, Coffee, IceCream, Heart } from 'lucide-react';
import { Order as OrderType } from '../types/game';
import { INGREDIENTS } from '../data/recipes';

interface OrderProps {
  order: OrderType;
  onComplete: (points: number) => void;
  onTimeout: () => void;
}

export default function Order({ order, onComplete, onTimeout }: OrderProps) {
  useEffect(() => {
    if (order.timeLeft <= 0) {
      onTimeout();
    }
  }, [order.timeLeft, onTimeout]);

  // Special rendering for Neko
  if (order.customer.id === 'neko') {
    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-pink-50">
        <div className="flex items-start gap-3">
          <div className="relative">
            <img
              src={order.customer.image}
              alt={order.customer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-white text-xs px-1 py-0.5 rounded-full shadow-sm border border-gray-200">
              💝
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{order.customer.name}</h3>
                  <Heart className="w-4 h-4 text-pink-500" />
                </div>
                <p className="text-xs text-gray-600">{order.customer.personality}</p>
                <p className="text-xs text-pink-600 mt-1">{order.customer.description}</p>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Timer className="w-4 h-4 mr-1" />
                <span>{Math.max(0, order.timeLeft)}s</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-sm text-pink-600">
                Accepts: shrimp, sauce, rice, tofu, red bean, mochi flour, cream, fresh fruit, lychee, coconut
              </p>
              <p className="text-xs text-pink-500 mt-2">
                Create something lovely with pink, white, or red ingredients! (150 points)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special rendering for Inspector Pawsworth
  if (order.customer.isSpecial && !order.customer.isVIP) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-blue-50">
        <div className="flex items-start gap-3">
          <div className="relative">
            <img
              src={order.customer.image}
              alt={order.customer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 bg-white text-xs px-1 py-0.5 rounded-full shadow-sm border border-gray-200">
              🧐
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-medium">{order.customer.name}</h3>
                <p className="text-xs text-gray-600">{order.customer.personality}</p>
                <p className="text-xs text-blue-600 mt-1">{order.customer.description}</p>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Timer className="w-4 h-4 mr-1" />
                <span>{Math.max(0, order.timeLeft)}s</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-2 text-blue-600">
                <Coffee className="w-4 h-4" />
                <IceCream className="w-4 h-4" />
                <span className="text-sm">Accepting any drinks or desserts</span>
              </div>
              <p className="text-xs text-blue-500 mt-2">
                Surprise me with something sweet! (200 points for valid creation)
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition ${
      order.customer.isVIP ? 'border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50' : order.customer.color
    }`}>
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={order.customer.image}
            alt={order.customer.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-white text-xs px-1 py-0.5 rounded-full shadow-sm border border-gray-200">
            {order.customer.isVIP ? '👑' : '😺'}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{order.customer.name}</h3>
                {order.customer.isVIP && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-gray-600">{order.customer.personality}</p>
              {order.customer.description && (
                <p className="text-xs text-amber-600 mt-1">{order.customer.description}</p>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Timer className="w-4 h-4 mr-1" />
              <span>{Math.max(0, order.timeLeft)}s</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium">Ordered: {order.recipe.name}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {order.recipe.ingredients.map((ingredientId, index) => {
                const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
                return (
                  <div
                    key={index}
                    className="group relative"
                  >
                    <div
                      className={`flex items-center gap-1 ${ingredient?.color} px-2 py-1 rounded text-xs`}
                    >
                      <span>{ingredient?.name}</span>
                      <span className="text-gray-500">#{index + 1}</span>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                      {ingredient?.name} (Ingredient #{index + 1})
                    </div>
                  </div>
                );
              })}
            </div>
            {order.customer.isVIP && (
              <p className="text-xs text-yellow-600 mt-2">
                Double points available! ✨
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}