import React, { useState } from 'react';
import { Cat, Play, Info, ArrowLeft, Trophy, Coffee, IceCream, Crown, Star, Clock, Heart, ShoppingBag, Coins, FlaskConical, Zap } from 'lucide-react';
import { GameMode } from '../types/game';
import { getThemeConfig } from '../data/themeConfig';

interface ThemeClasses {
  bg: string;
  header: string;
  card: string;
  text: string;
  subtext: string;
}

interface HomeScreenProps {
  onPlay: (mode: GameMode) => void;
  onAbout: () => void;
  onBack: () => void;
  onShop: () => void;
  onRecipeBook: () => void;
  onCreativeMode: () => void;
  showAbout: boolean;
  highScore: number;
  coins: number;
  activeTheme: string;
  themeClasses: ThemeClasses;
}

export default function HomeScreen({ onPlay, onAbout, onBack, onShop, onRecipeBook, onCreativeMode, showAbout, highScore, coins, activeTheme, themeClasses }: HomeScreenProps) {
  const [showModes, setShowModes] = useState(false);
  const tc = getThemeConfig(activeTheme);
  const accentBtn = tc.accentBtn;
  const accentText = tc.accentText;
  const iconColor = tc.iconColor;
  const bgIcon = tc.bgIcon;
  const earColor = tc.earColor;
  const whiskerColor = tc.whiskerColor;
  const pawColor = tc.pawColor;

  if (showAbout) {
    return (
      <div className={`min-h-screen ${themeClasses.bg} flex items-center justify-center p-4`}>
        <div className={`max-w-2xl w-full ${themeClasses.card} rounded-xl shadow-lg p-8`}>
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${accentText} hover:opacity-80 transition mb-6 font-medium`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Cat className={`w-8 h-8 ${iconColor}`} />
            <h1 className={`text-3xl font-bold ${accentText}`}>About Calico Café</h1>
            <Cat className={`w-8 h-8 ${iconColor}`} />
          </div>

          <div className={`space-y-5 ${themeClasses.text}`}>
            <p className={`${tc.aboutBg} ${tc.aboutBorder} rounded-lg p-3 text-sm border`}>
              Welcome to Calico Café, where you'll serve a delightful array of dishes and drinks to our charming cat customers!
            </p>

            <div>
              <h2 className={`text-lg font-bold ${accentText} flex items-center gap-2 mb-2`}>
                🍳 How to Play
              </h2>
              <ul className="list-disc pl-5 space-y-1.5 text-sm">
                <li>Take orders from cat customers — each order shows the required ingredients</li>
                <li>Select ingredients from the Kitchen and press <strong>Cook!</strong> to serve</li>
                <li>Complete orders before the order timer runs out</li>
                <li>Click an ingredient in the Cooking Station to remove it</li>
                <li>VIP customers offer double points but have stricter timers!</li>
                <li>Earn coins based on your final score to unlock shop items</li>
              </ul>
            </div>

            <div>
              <h2 className={`text-lg font-bold ${accentText} flex items-center gap-2 mb-2`}>
                ⭐ Special Customers
              </h2>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2"><span>🧐</span><div><strong>Inspector Pawsworth:</strong> Only accepts drinks and desserts (any valid combination)</div></li>
                <li className="flex gap-2"><span>👑</span><div><strong>Emperor Meowximilian:</strong> Only accepts 5-ingredient golden elixirs (must include ✨ Gold Leaf)</div></li>
                <li className="flex gap-2"><span>💝</span><div><strong>Neko:</strong> Accepts any 2–4 pink/white/red ingredients for 150 pts</div></li>
                <li className="flex gap-2"><span>👑</span><div><strong>Duchess:</strong> VIP — double points for any valid recipe, tighter timer</div></li>
              </ul>
            </div>

            <div>
              <h2 className={`text-lg font-bold ${accentText} flex items-center gap-2 mb-2`}>
                🌸 Seasonal Themes
              </h2>
              <p className="text-sm">Unlock themes in the Shop to transform your café! When active, only that theme's exclusive recipes appear in orders.</p>
            </div>

            <div>
              <h2 className={`text-lg font-bold ${accentText} flex items-center gap-2 mb-2`}>
                🔥 Combo Bonus
              </h2>
              <p className="text-sm">Complete 3 or more orders in a row without a mistake to earn a <strong>10% point bonus</strong> per order!</p>
            </div>

            <div>
              <h2 className={`text-lg font-bold ${accentText} flex items-center gap-2 mb-2`}>
                🪙 Earning Coins
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Score 2000+ points: 4 coins</li>
                <li>Score 1500–1999 points: 3 coins</li>
                <li>Score 1000–1499 points: 2 coins</li>
                <li>Score below 1000 points: 1 coin</li>
              </ul>
            </div>

            <p className={`text-sm ${themeClasses.subtext} text-center pt-2`}>
              You have 3 minutes — serve as many customers as possible!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeClasses.bg} relative overflow-hidden`}>
      {/* Animated background icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 left-10 ${bgIcon} transform -rotate-12 animate-bounce`}>
          <Cat className="w-32 h-32 opacity-30" />
        </div>
        <div className={`absolute bottom-10 right-10 ${bgIcon} transform rotate-12 animate-pulse`}>
          <Coffee className="w-32 h-32 opacity-30" />
        </div>
        <div className={`absolute top-1/4 right-1/4 ${bgIcon} transform rotate-45 animate-bounce`}>
          <IceCream className="w-24 h-24 opacity-30" />
        </div>
        <div className={`absolute bottom-1/4 left-1/4 ${bgIcon} transform -rotate-45 animate-pulse`}>
          <Crown className="w-24 h-24 opacity-30" />
        </div>
        <div className={`absolute top-1/3 left-1/3 ${bgIcon} transform rotate-90 animate-bounce`} style={{ animationDelay: '150ms' }}>
          <Star className="w-16 h-16 opacity-30" />
        </div>
        <div className={`absolute bottom-1/3 right-1/3 ${bgIcon} transform -rotate-90 animate-pulse`} style={{ animationDelay: '150ms' }}>
          <Heart className="w-16 h-16 opacity-30" />
        </div>
        <div className={`absolute top-2/3 right-1/3 ${bgIcon} transform rotate-180 animate-bounce`} style={{ animationDelay: '300ms' }}>
          <Clock className="w-20 h-20 opacity-30" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className={`max-w-lg w-full ${themeClasses.card} rounded-xl shadow-lg p-10 m-4 relative`}>

          {/* Cat ears — pointed triangles */}
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 flex gap-14">
            <div className="w-0 h-0" style={{
              borderLeft: '18px solid transparent',
              borderRight: '18px solid transparent',
              borderBottom: `36px solid ${earColor}`,
            }} />
            <div className="w-0 h-0" style={{
              borderLeft: '18px solid transparent',
              borderRight: '18px solid transparent',
              borderBottom: `36px solid ${earColor}`,
            }} />
          </div>

          {/* Whiskers */}
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-full px-4">
            <div className="flex justify-between">
              <div className="space-y-1.5">
                <div className={`w-10 h-px ${whiskerColor} transform rotate-6`} />
                <div className={`w-10 h-px ${whiskerColor}`} />
                <div className={`w-10 h-px ${whiskerColor} transform -rotate-6`} />
              </div>
              <div className="space-y-1.5">
                <div className={`w-10 h-px ${whiskerColor} transform -rotate-6`} />
                <div className={`w-10 h-px ${whiskerColor}`} />
                <div className={`w-10 h-px ${whiskerColor} transform rotate-6`} />
              </div>
            </div>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-6 mt-2">
            <div className="relative">
              <Cat className={`w-24 h-24 ${iconColor}`} />
              <div className="absolute -right-2 -bottom-2">
                <Coffee className={`w-8 h-8 ${iconColor} animate-bounce`} />
              </div>
            </div>
          </div>

          <h1 className={`text-4xl font-bold text-center ${themeClasses.text} mb-2`}>Calico Café</h1>
          <p className={`text-center ${themeClasses.subtext} mb-8 text-sm`}>Serve delightful dishes to charming cats!</p>

          {/* Stats */}
          <div className="flex gap-4 mb-8">
            <div className={`flex-1 ${tc.statsBg} ${tc.statsBorder} rounded-lg p-4 border`}>
              <div className="flex items-center justify-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-500 animate-pulse" />
                <div>
                  <div className={`text-xs ${themeClasses.subtext}`}>Best Score</div>
                  <div className={`font-bold text-2xl ${themeClasses.text}`}>{highScore}</div>
                </div>
              </div>
            </div>
            <div className={`flex-1 ${tc.statsBg} ${tc.statsBorder} rounded-lg p-4 border`}>
              <div className="flex items-center justify-center gap-3">
                <Coins className="w-6 h-6 text-amber-500 animate-pulse" />
                <div>
                  <div className={`text-xs ${themeClasses.subtext}`}>Coins</div>
                  <div className={`font-bold text-2xl ${themeClasses.text}`}>{coins}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            {!showModes ? (
              <button
                onClick={() => setShowModes(true)}
                className={`w-full ${accentBtn} text-white py-4 px-6 rounded-lg transition transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center gap-2 font-bold text-lg group`}
              >
                <Play className="w-6 h-6 group-hover:animate-bounce" />
                Start Cooking!
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => { setShowModes(false); onPlay('classic'); }}
                  className={`w-full ${accentBtn} text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 font-bold`}
                >
                  <Play className="w-5 h-5" />
                  Classic Mode
                </button>
                <button
                  onClick={() => { setShowModes(false); onPlay('lunch-rush'); }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 font-bold"
                >
                  <Zap className="w-5 h-5" />
                  Lunch Rush ⚡ Hard
                </button>
                <button
                  onClick={() => { setShowModes(false); onPlay('endless'); }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 font-bold"
                >
                  ♾ Endless Survival
                </button>
                <button
                  onClick={() => { setShowModes(false); onPlay('memory'); }}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 font-bold"
                >
                  🧠 Memory Café
                </button>
                <button
                  onClick={() => { setShowModes(false); onPlay('vip-royale'); }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-amber-900 py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 font-bold"
                >
                  👑 VIP Royale
                </button>
                <button
                  onClick={() => { setShowModes(false); onCreativeMode(); }}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 font-bold"
                >
                  <FlaskConical className="w-5 h-5" />
                  Creative Mode 🎨
                </button>
                <button
                  onClick={() => setShowModes(false)}
                  className="w-full text-gray-500 hover:text-gray-700 py-1 text-sm transition"
                >
                  ← Back
                </button>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={onShop}
                className="bg-amber-500 text-white py-3 px-6 rounded-lg hover:bg-amber-600 transition flex items-center justify-center gap-2 group font-medium"
              >
                <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Shop
              </button>
              <button
                onClick={onAbout}
                className="bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 group font-medium"
              >
                <Info className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                How to Play
              </button>
            </div>

            <button
              onClick={onRecipeBook}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 font-medium"
            >
              <span className="text-lg">📖</span>
              Recipe Book
            </button>
          </div>

          {/* Paw prints */}
          <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 flex gap-4">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`w-4 h-4 ${pawColor} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>

          {/* Corner decorations */}
          <div className={`absolute -top-2 -left-2 w-10 h-10 ${iconColor}`}>
            <Star className="w-full h-full animate-spin-slow" />
          </div>
          <div className={`absolute -bottom-2 -right-2 w-10 h-10 ${iconColor}`}>
            <Heart className="w-full h-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
