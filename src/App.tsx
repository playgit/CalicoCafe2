import React, { useState, useEffect, useRef } from 'react';
import { Cat, Coffee, Heart } from 'lucide-react';
import Kitchen from './components/Kitchen';
import Order from './components/Order';
import Timer from './components/Timer';
import ScoreBoard from './components/ScoreBoard';
import HomeScreen from './components/HomeScreen';
import Shop from './components/Shop';
import RecipeBook from './components/RecipeBook';
import CreativeMode from './components/CreativeMode';
import { RECIPES } from './data/recipes';
import { CAT_CUSTOMERS } from './data/customers';
import { Order as OrderType, Recipe, ShopItem, ScorePopup, GameMode, CustomRecipe } from './types/game';

// Score tiers for game over screen
function getScoreTier(score: number): { emoji: string; title: string } {
  if (score >= 3000) return { emoji: '👑', title: 'Legendary Barista!' };
  if (score >= 2000) return { emoji: '🌟', title: 'Master Chef!' };
  if (score >= 1500) return { emoji: '⭐', title: 'Expert Cook!' };
  if (score >= 1000) return { emoji: '🍳', title: 'Apprentice Chef' };
  return { emoji: '🐱', title: 'Cat Café Rookie' };
}

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [firstOrderCompleted, setFirstOrderCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [showHome, setShowHome] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [showRecipeBook, setShowRecipeBook] = useState(false);
  const [showCreativeMode, setShowCreativeMode] = useState(false);
  const [paused, setPaused] = useState(false);
  const [comboCount, setComboCount] = useState(0);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const [earnedCoinsThisRound, setEarnedCoinsThisRound] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [pointMultiplier, setPointMultiplier] = useState(1);
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [lunchRushMisses, setLunchRushMisses] = useState(0);
  const [lunchRushSuccess, setLunchRushSuccess] = useState(false);

  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('coins');
    return saved ? parseInt(saved, 10) : 5;
  });
  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('unlockedItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTheme, setActiveTheme] = useState<string>(() =>
    localStorage.getItem('activeTheme') || 'default'
  );
  const [customRecipes, setCustomRecipes] = useState<CustomRecipe[]>(() => {
    const saved = localStorage.getItem('customRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Refs to give timer/interval callbacks access to latest values without stale closures
  const scoreRef = useRef(score);
  const timeLeftRef = useRef(timeLeft);
  const pausedRef = useRef(paused);
  const unlockedItemsRef = useRef(unlockedItems);
  const activeThemeRef = useRef(activeTheme);
  const gameModeRef = useRef<GameMode>('classic');
  const lunchRushMissesRef = useRef(0);
  const customRecipesRef = useRef(customRecipes);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { unlockedItemsRef.current = unlockedItems; }, [unlockedItems]);
  useEffect(() => { activeThemeRef.current = activeTheme; }, [activeTheme]);
  useEffect(() => { gameModeRef.current = gameMode; }, [gameMode]);
  useEffect(() => { lunchRushMissesRef.current = lunchRushMisses; }, [lunchRushMisses]);
  useEffect(() => { customRecipesRef.current = customRecipes; }, [customRecipes]);

  useEffect(() => { localStorage.setItem('highScore', highScore.toString()); }, [highScore]);
  useEffect(() => { localStorage.setItem('coins', coins.toString()); }, [coins]);
  useEffect(() => { localStorage.setItem('unlockedItems', JSON.stringify(unlockedItems)); }, [unlockedItems]);
  useEffect(() => { localStorage.setItem('activeTheme', activeTheme); }, [activeTheme]);
  useEffect(() => { localStorage.setItem('customRecipes', JSON.stringify(customRecipes)); }, [customRecipes]);

  // Derive theme classes for visual theming — applied to outer containers
  const themeClasses = {
    bg:      activeTheme === 'theme-night' ? 'bg-slate-900'  : activeTheme === 'theme-sakura' ? 'bg-pink-50'  : activeTheme === 'theme-american' ? 'bg-red-50'   : 'bg-amber-50',
    header:  activeTheme === 'theme-night' ? 'bg-indigo-900' : activeTheme === 'theme-sakura' ? 'bg-rose-400' : activeTheme === 'theme-american' ? 'bg-blue-700' : 'bg-orange-600',
    card:    activeTheme === 'theme-night' ? 'bg-slate-800'  : 'bg-white',
    text:    activeTheme === 'theme-night' ? 'text-gray-100' : 'text-gray-800',
    subtext: activeTheme === 'theme-night' ? 'text-gray-400' : 'text-gray-600',
  };

  // ─── Order generation ──────────────────────────────────────────────────────
  useEffect(() => {
    if (gameOver) return;

    const generateOrder = () => {
      if (pausedRef.current || timeLeftRef.current <= 0) return;
      const mode = gameModeRef.current;
      const maxOrders = mode === 'lunch-rush' ? 2 : 3;
      if (orders.length >= maxOrders) return;

      const busyCustomerIds = orders.map(o => o.customer.id);
      const availableCustomers = CAT_CUSTOMERS.filter(c => !busyCustomerIds.includes(c.id));
      if (availableCustomers.length === 0) return;

      const customer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];

      const currentTheme = activeThemeRef.current;
      const themeName = currentTheme === 'default' ? null : currentTheme.replace('theme-', '');

      // Base recipes filtered by theme
      const baseRecipes = RECIPES.filter(recipe => {
        if (themeName) {
          if (recipe.theme !== themeName) return false;
        } else {
          if (recipe.theme) return false;
        }
        if (customer.id === 'inspector') {
          const n = recipe.name.toLowerCase();
          return n.includes('tea') || n.includes('latte') || n.includes('parfait') ||
                 n.includes('mochi') || n.includes('milkshake') || n.includes('shake') ||
                 n.includes('soda') || n.includes('cookies');
        }
        if (customer.id === 'emperor') {
          return recipe.ingredients.includes('gold-leaf');
        }
        if (customer.isVIP) {
          return true;
        }
        return !recipe.vipOnly;
      });

      // Merge custom recipes into pool
      const savedCustom = customRecipesRef.current;
      const customAsRecipes: Recipe[] = savedCustom
        .filter(cr => {
          if (themeName === 'sakura') return cr.category === 'sakura';
          if (themeName === 'american') return cr.category === 'american';
          if (themeName === 'night') return false; // no custom night recipes
          // default/no theme: only regular or vip custom recipes
          return cr.category === 'regular' || cr.category === 'vip';
        })
        .filter(cr => {
          // Don't show custom VIP recipes to non-VIP non-special customers
          if (cr.category === 'vip' && !customer.isVIP && !customer.isSpecial) return false;
          // Inspector: skip custom (no category match logic for custom)
          if (customer.id === 'inspector') return false;
          // Emperor: skip custom (requires gold-leaf logic)
          if (customer.id === 'emperor') return false;
          return true;
        })
        .map(cr => ({
          id: cr.id,
          name: cr.name,
          ingredients: cr.ingredients,
          points: 100,
          timeLimit: 30,
          vipOnly: cr.category === 'vip',
          category: cr.category,
        }));

      const availableRecipes = [...baseRecipes, ...customAsRecipes];
      if (availableRecipes.length === 0) return;

      const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];

      // Lunch Rush: fixed 7s timers; otherwise apply VIP 0.8× scaling
      const timeLimit = mode === 'lunch-rush'
        ? 7
        : customer.isVIP
          ? Math.floor(recipe.timeLimit * 0.8)
          : recipe.timeLimit;

      const newOrder: OrderType = {
        id: Math.random().toString(36).substr(2, 9),
        recipe: { ...recipe, timeLimit },
        timeLeft: timeLimit,
        completed: false,
        customer,
        isVIP: customer.isVIP,
      };

      setOrders(prev => [...prev, newOrder]);
    };

    if (orders.length === 0) {
      generateOrder();
    }

    let orderInterval: ReturnType<typeof setInterval> | null = null;
    if (firstOrderCompleted) {
      const mode = gameModeRef.current;
      const intervalMs = mode === 'lunch-rush'
        ? 1500
        : (() => {
            const elapsed = 180 - timeLeftRef.current;
            return elapsed > 90 ? 2000 : elapsed > 60 ? 3000 : 4000;
          })();
      orderInterval = setInterval(generateOrder, intervalMs);
    }

    return () => {
      if (orderInterval) clearInterval(orderInterval);
    };
  }, [gameOver, firstOrderCompleted, orders]);

  // ─── Global timer + per-order countdown ───────────────────────────────────
  useEffect(() => {
    if (timeLeft <= 0) {
      if (gameModeRef.current === 'lunch-rush') {
        handleLunchRushComplete();
      } else {
        handleGameOver();
      }
      return;
    }
    if (gameOver || paused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setOrders(prev => {
        const updated = prev.map(o => ({ ...o, timeLeft: o.timeLeft - 1 }));
        const timedOut = updated.filter(o => o.timeLeft <= 0);
        if (timedOut.length > 0) {
          timedOut.forEach(o => {
            const penalty = o.isVIP ? -100 : -50;
            setScore(s => Math.max(0, s + penalty));
            setComboCount(0);
            setFeedback({ message: `${o.customer.name}'s order timed out! ${penalty} pts`, isError: true });
            setTimeout(() => setFeedback(null), 3000);

            if (gameModeRef.current === 'lunch-rush') {
              const newMisses = lunchRushMissesRef.current + 1;
              setLunchRushMisses(newMisses);
              lunchRushMissesRef.current = newMisses;
              if (newMisses >= 3) {
                setTimeout(() => handleLunchRushFail(), 0);
              }
            }
          });
        }
        return updated.filter(o => o.timeLeft > 0);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver, paused]);

  // ─── Game over ────────────────────────────────────────────────────────────
  const handleGameOver = () => {
    const finalScore = scoreRef.current;
    let newHigh = false;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      newHigh = true;
    }
    setIsNewHighScore(newHigh);

    let earned = 1;
    if (finalScore >= 2000) earned = 4;
    else if (finalScore >= 1500) earned = 3;
    else if (finalScore >= 1000) earned = 2;

    setEarnedCoinsThisRound(earned);
    setCoins(prev => prev + earned);
    setGameOver(true);
  };

  const handleLunchRushComplete = () => {
    const finalScore = scoreRef.current;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      setIsNewHighScore(true);
    } else {
      setIsNewHighScore(false);
    }
    setEarnedCoinsThisRound(10);
    setCoins(prev => prev + 10);
    setLunchRushSuccess(true);
    setGameOver(true);
  };

  const handleLunchRushFail = () => {
    const finalScore = scoreRef.current;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      setIsNewHighScore(true);
    } else {
      setIsNewHighScore(false);
    }
    setEarnedCoinsThisRound(0);
    setLunchRushSuccess(false);
    setGameOver(true);
  };

  // ─── Order complete ───────────────────────────────────────────────────────
  const handleOrderComplete = (orderId: string, points: number) => {
    const order = orders.find(o => o.id === orderId);
    const vipMultiplier = order?.isVIP ? 2 : 1;
    const newCombo = comboCount + 1;
    const comboBonus = newCombo >= 3 ? 1.1 : 1;
    const finalPoints = Math.floor(points * vipMultiplier * comboBonus * pointMultiplier);

    setScore(prev => prev + finalPoints);
    setComboCount(newCombo);
    setOrders(prev => prev.filter(o => o.id !== orderId));

    const popupId = Math.random().toString(36).substr(2, 9);
    setScorePopups(prev => [...prev, { id: popupId, points: finalPoints }]);
    setTimeout(() => setScorePopups(prev => prev.filter(p => p.id !== popupId)), 1500);

    const comboMsg = newCombo >= 3 ? ` 🔥 x${newCombo} combo!` : '';
    setFeedback({ message: `+${finalPoints} pts!${comboMsg}`, isError: false });
    setTimeout(() => setFeedback(null), 2500);

    if (!firstOrderCompleted) setFirstOrderCompleted(true);
  };

  const handleOrderTimeout = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    setComboCount(0);
    if (!firstOrderCompleted) setFirstOrderCompleted(true);
  };

  const handleWrongOrder = (penalty: number) => {
    setScore(prev => Math.max(0, prev - penalty));
    setComboCount(0);

    if (gameModeRef.current === 'lunch-rush') {
      const newMisses = lunchRushMissesRef.current + 1;
      setLunchRushMisses(newMisses);
      lunchRushMissesRef.current = newMisses;
      setFeedback({ message: `Wrong order! Miss ${newMisses}/3`, isError: true });
      setTimeout(() => setFeedback(null), 3000);
      if (newMisses >= 3) {
        setTimeout(() => handleLunchRushFail(), 500);
      }
    } else {
      setTimeLeft(prev => Math.max(0, prev - 5));
      setFeedback({ message: `Wrong order! −${penalty} pts & −5s`, isError: true });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handlePurchase = (item: ShopItem) => {
    if (coins >= item.cost && !unlockedItems.includes(item.id)) {
      setCoins(prev => prev - item.cost);
      setUnlockedItems(prev => [...prev, item.id]);
      if (item.type === 'theme') {
        setActiveTheme(item.id);
      }
    }
  };

  const spendCoins = (amount: number): boolean => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    }
    return false;
  };

  const handleSaveCustomRecipe = (recipe: CustomRecipe) => {
    setCustomRecipes(prev => [...prev, recipe]);
  };

  const handleDeleteCustomRecipe = (id: string) => {
    setCustomRecipes(prev => prev.filter(r => r.id !== id));
  };

  const startNewGame = (mode: GameMode = 'classic') => {
    const extraTime = unlockedItems.includes('boost-time') ? 30 : 0;
    const multiplier = unlockedItems.includes('boost-points') ? 1.5 : 1;
    setScore(0);
    setTimeLeft(mode === 'lunch-rush' ? 30 : 180 + extraTime);
    setOrders([]);
    setGameOver(false);
    setFirstOrderCompleted(false);
    setFeedback(null);
    setPaused(false);
    setComboCount(0);
    setScorePopups([]);
    setEarnedCoinsThisRound(0);
    setIsNewHighScore(false);
    setPointMultiplier(mode === 'lunch-rush' ? 1 : multiplier);
    setGameMode(mode);
    gameModeRef.current = mode;
    setLunchRushMisses(0);
    lunchRushMissesRef.current = 0;
    setLunchRushSuccess(false);
    setShowHome(false);
    setShowAbout(false);
    setShowShop(false);
    setShowRecipeBook(false);
    setShowCreativeMode(false);
  };

  const goToHome = () => {
    setShowHome(true);
    setShowAbout(false);
    setShowShop(false);
    setShowRecipeBook(false);
    setShowCreativeMode(false);
    setGameOver(false);
  };

  const goToShop = () => {
    setShowShop(true);
    setShowHome(false);
  };

  const goToRecipeBook = () => {
    setShowRecipeBook(true);
    setShowHome(false);
  };

  const goToCreativeMode = () => {
    setShowCreativeMode(true);
    setShowHome(false);
  };

  // ─── Screen routing ───────────────────────────────────────────────────────
  if (showHome) {
    return (
      <HomeScreen
        onPlay={startNewGame}
        onAbout={() => setShowAbout(true)}
        onBack={() => setShowAbout(false)}
        onShop={goToShop}
        onRecipeBook={goToRecipeBook}
        onCreativeMode={goToCreativeMode}
        showAbout={showAbout}
        highScore={highScore}
        coins={coins}
        activeTheme={activeTheme}
        themeClasses={themeClasses}
      />
    );
  }

  if (showShop) {
    return (
      <Shop
        onBack={goToHome}
        coins={coins}
        onPurchase={handlePurchase}
        unlockedItems={unlockedItems}
        activeTheme={activeTheme}
        onActivateTheme={setActiveTheme}
        themeClasses={themeClasses}
      />
    );
  }

  if (showRecipeBook) {
    return (
      <RecipeBook
        onBack={goToHome}
        unlockedItems={unlockedItems}
        activeTheme={activeTheme}
        customRecipes={customRecipes}
        onDeleteCustomRecipe={handleDeleteCustomRecipe}
      />
    );
  }

  if (showCreativeMode) {
    return (
      <CreativeMode
        onBack={goToHome}
        coins={coins}
        onSpendCoins={spendCoins}
        customRecipes={customRecipes}
        onSaveRecipe={handleSaveCustomRecipe}
        unlockedItems={unlockedItems}
        themeClasses={themeClasses}
        activeTheme={activeTheme}
      />
    );
  }

  const tier = getScoreTier(score);
  const isLunchRush = gameMode === 'lunch-rush';

  return (
    <div className={`min-h-screen ${themeClasses.bg} flex flex-col`}>
      {/* Header */}
      <header className={`${themeClasses.header} text-white p-4 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cat className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Calico Café</h1>
            {isLunchRush && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full ml-1">
                ⚡ LUNCH RUSH
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isLunchRush && (
              <div className="flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <Heart
                    key={i}
                    className={`w-5 h-5 ${i < (3 - lunchRushMisses) ? 'text-red-400 fill-red-400' : 'text-gray-500 fill-gray-500'}`}
                  />
                ))}
              </div>
            )}
            <button
              onClick={goToHome}
              className={`${activeTheme === 'theme-night' ? 'bg-indigo-800 hover:bg-indigo-700' : activeTheme === 'theme-sakura' ? 'bg-rose-500 hover:bg-rose-600' : activeTheme === 'theme-american' ? 'bg-blue-800 hover:bg-blue-900' : 'bg-orange-700 hover:bg-orange-800'} px-4 py-2 rounded-lg transition text-sm`}
            >
              Home
            </button>
            {!isLunchRush && (
              <button
                onClick={() => setPaused(p => !p)}
                className={`${activeTheme === 'theme-night' ? 'bg-indigo-800 hover:bg-indigo-700' : activeTheme === 'theme-sakura' ? 'bg-rose-500 hover:bg-rose-600' : activeTheme === 'theme-american' ? 'bg-blue-800 hover:bg-blue-900' : 'bg-orange-700 hover:bg-orange-800'} px-4 py-2 rounded-lg transition text-sm`}
              >
                {paused ? '▶ Resume' : '⏸ Pause'}
              </button>
            )}
            {comboCount >= 3 && (
              <div className="bg-red-600 px-3 py-2 rounded-lg text-sm font-bold animate-pulse">
                🔥 x{comboCount}
              </div>
            )}
            {pointMultiplier > 1 && (
              <div className="bg-purple-600 px-3 py-2 rounded-lg text-xs font-bold">
                ×{pointMultiplier} pts
              </div>
            )}
            <Timer timeLeft={timeLeft} />
            <ScoreBoard score={score} highScore={highScore} />
          </div>
        </div>
      </header>

      {/* Feedback banner */}
      {feedback && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-8 py-3 rounded-lg shadow-lg z-40 text-sm font-semibold ${
          feedback.isError ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Score popups */}
      {scorePopups.map(popup => (
        <div
          key={popup.id}
          className="fixed pointer-events-none z-50 font-bold text-lg bg-green-500 text-white px-4 py-1.5 rounded-full shadow-lg animate-float-up"
          style={{ top: '80px', left: '50%' }}
        >
          +{popup.points}
        </div>
      ))}

      {/* Pause overlay */}
      {paused && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl px-14 py-10 shadow-2xl text-center">
            <p className="text-4xl mb-2">⏸</p>
            <p className="text-2xl font-bold text-gray-800 mb-1">Paused</p>
            <p className="text-gray-500 text-sm">Press Resume to continue</p>
          </div>
        </div>
      )}

      {/* Game Over modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
            {isLunchRush ? (
              <>
                <div className="text-center mb-5">
                  <p className="text-5xl mb-2">{lunchRushSuccess ? '🥪' : '💀'}</p>
                  <h2 className="text-3xl font-bold mb-1">
                    {lunchRushSuccess ? 'Rush Complete!' : 'Rush Failed!'}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {lunchRushSuccess
                      ? 'You survived the lunch rush!'
                      : `3 misses — better luck next time!`}
                  </p>
                </div>

                {isNewHighScore && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center mb-4">
                    <span className="text-yellow-700 font-bold">🏆 New High Score!</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 rounded-lg p-4 text-center border border-red-100">
                    <div className="text-xs text-gray-500 mb-1">Score</div>
                    <div className="text-2xl font-bold text-red-600">{score}</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-100">
                    <div className="text-xs text-gray-500 mb-1">Coins Earned</div>
                    <div className="text-2xl font-bold text-amber-500">+{earnedCoinsThisRound} 🪙</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-5">
                  <p className="text-5xl mb-2">{tier.emoji}</p>
                  <h2 className="text-3xl font-bold mb-1">Game Over!</h2>
                  <p className="text-gray-500 text-sm">{tier.title}</p>
                </div>

                {isNewHighScore && (
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center mb-4">
                    <span className="text-yellow-700 font-bold">🏆 New High Score!</span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-orange-50 rounded-lg p-4 text-center border border-orange-100">
                    <div className="text-xs text-gray-500 mb-1">Final Score</div>
                    <div className="text-2xl font-bold text-orange-600">{score}</div>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-100">
                    <div className="text-xs text-gray-500 mb-1">Coins Earned</div>
                    <div className="text-2xl font-bold text-amber-500">+{earnedCoinsThisRound} 🪙</div>
                  </div>
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => startNewGame(gameMode)}
                className="bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                Play Again
              </button>
              <button
                onClick={goToHome}
                className="bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition font-semibold"
              >
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main game area */}
      <main className="container mx-auto p-4 flex flex-col gap-4 h-[calc(100vh-4.5rem)]">
        {/* Orders row */}
        <div className="bg-white rounded-xl shadow-md p-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <Coffee className="text-orange-600" />
            <h2 className="text-lg font-semibold">
              Orders ({orders.length}/{isLunchRush ? 2 : 3})
            </h2>
            {isLunchRush && lunchRushMisses > 0 && (
              <span className="ml-auto text-xs text-red-500 font-semibold">
                {lunchRushMisses}/3 misses
              </span>
            )}
          </div>
          <div className="flex gap-4 overflow-x-auto pb-1">
            {orders.map(order => (
              <Order
                key={order.id}
                order={order}
                onComplete={points => handleOrderComplete(order.id, points)}
                onTimeout={() => handleOrderTimeout(order.id)}
              />
            ))}
            {orders.length === 0 && (
              <p className="text-gray-400 text-center py-4 text-sm w-full">Waiting for customers…</p>
            )}
          </div>
        </div>

        {/* Kitchen */}
        <div className="flex-1 min-h-0 flex flex-col">
          <Kitchen
            currentOrders={orders}
            onOrderComplete={handleOrderComplete}
            onWrongOrder={handleWrongOrder}
            gameMode={gameMode}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
