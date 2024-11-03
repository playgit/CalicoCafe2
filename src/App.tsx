import React, { useState, useEffect } from 'react';
import { Cat, Coffee } from 'lucide-react';
import Kitchen from './components/Kitchen';
import Order from './components/Order';
import Timer from './components/Timer';
import ScoreBoard from './components/ScoreBoard';
import HomeScreen from './components/HomeScreen';
import Shop from './components/Shop';
import { RECIPES } from './data/recipes';
import { CAT_CUSTOMERS } from './data/customers';
import { Order as OrderType, Recipe, ShopItem } from './types/game';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [firstOrderCompleted, setFirstOrderCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [showHome, setShowHome] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('coins');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('unlockedItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('unlockedItems', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  // Generate new orders periodically
  useEffect(() => {
    if (timeLeft <= 0 || gameOver) return;

    const generateOrder = () => {
      if (orders.length >= 3) return;
      
      // Get available customers (not currently ordering)
      const busyCustomerIds = orders.map(order => order.customer.id);
      const availableCustomers = CAT_CUSTOMERS.filter(
        customer => !busyCustomerIds.includes(customer.id)
      );
      
      if (availableCustomers.length === 0) return;
      
      const customer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
      
      // Get recipes based on customer type
      const availableRecipes = RECIPES.filter(recipe => {
        if (customer.id === 'inspector') {
          // Inspector only gets drinks and desserts
          return recipe.name.toLowerCase().includes('tea') || 
                 recipe.name.toLowerCase().includes('parfait') ||
                 recipe.name.toLowerCase().includes('mochi');
        }
        if (customer.isVIP) {
          // VIP customers can order any VIP or regular recipe
          return recipe.vipOnly || !recipe.vipOnly;
        }
        // Regular customers only get regular recipes
        return !recipe.vipOnly;
      });
      
      if (availableRecipes.length === 0) return;
      
      const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
      const timeLimit = customer.isVIP ? Math.floor(recipe.timeLimit * 0.8) : recipe.timeLimit;
      
      const newOrder: OrderType = {
        id: Math.random().toString(36).substr(2, 9),
        recipe: {
          ...recipe,
          timeLimit
        },
        timeLeft: timeLimit,
        completed: false,
        customer,
        isVIP: customer.isVIP
      };
      
      setOrders(prev => [...prev, newOrder]);
    };

    // Generate initial orders
    if (orders.length === 0) {
      generateOrder();
    }

    // Only start the interval for new orders after first order is completed
    let orderInterval: NodeJS.Timeout | null = null;
    if (firstOrderCompleted) {
      orderInterval = setInterval(generateOrder, 4000);
    }

    return () => {
      if (orderInterval) clearInterval(orderInterval);
    };
  }, [timeLeft, gameOver, firstOrderCompleted, orders]);

  // Update order timers
  useEffect(() => {
    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }

    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setOrders(prev => {
        const updatedOrders = prev.map(order => ({
          ...order,
          timeLeft: order.timeLeft - 1
        }));
        
        // Check for timed out orders
        const timedOutOrders = updatedOrders.filter(order => order.timeLeft <= 0);
        if (timedOutOrders.length > 0) {
          timedOutOrders.forEach(order => {
            const penalty = order.isVIP ? -100 : -50;
            setScore(current => Math.max(0, current + penalty));
            setFeedback({
              message: `${order.customer.name}'s ${order.recipe.name} was not completed! ${penalty} points!`,
              isError: true
            });
            setTimeout(() => setFeedback(null), 3000);
          });
        }
        
        return updatedOrders.filter(order => order.timeLeft > 0);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver]);

  const handleGameOver = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    
    // Award coins based on score
    let earnedCoins = 1;
    if (score >= 2000) earnedCoins = 4;
    else if (score >= 1500) earnedCoins = 3;
    else if (score >= 1000) earnedCoins = 2;
    
    setCoins(prev => prev + earnedCoins);
    setGameOver(true);
  };

  const handleOrderComplete = (orderId: string, points: number) => {
    const order = orders.find(o => o.id === orderId);
    const finalPoints = order?.isVIP ? points * 2 : points;
    setScore(prev => prev + finalPoints);
    setOrders(prev => prev.filter(order => order.id !== orderId));
    
    setFeedback({
      message: `Order completed! +${finalPoints} points!`,
      isError: false
    });
    setTimeout(() => setFeedback(null), 3000);
    
    if (!firstOrderCompleted) {
      setFirstOrderCompleted(true);
    }
  };

  const handleOrderTimeout = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    if (!firstOrderCompleted) {
      setFirstOrderCompleted(true);
    }
  };

  const handleWrongOrder = (penalty: number) => {
    setScore(prev => Math.max(0, prev - penalty));
    setTimeLeft(prev => Math.max(0, prev - 5)); // 5-second time penalty
    setFeedback({
      message: `Wrong order! -${penalty} points!`,
      isError: true
    });
    setTimeout(() => setFeedback(null), 3000);
  };

  const handlePurchase = (item: ShopItem) => {
    if (coins >= item.cost && !unlockedItems.includes(item.id)) {
      setCoins(prev => prev - item.cost);
      setUnlockedItems(prev => [...prev, item.id]);
    }
  };

  const startNewGame = () => {
    setScore(0);
    setTimeLeft(180);
    setOrders([]);
    setGameOver(false);
    setFirstOrderCompleted(false);
    setFeedback(null);
    setShowHome(false);
    setShowAbout(false);
    setShowShop(false);
  };

  const goToHome = () => {
    setShowHome(true);
    setShowAbout(false);
    setShowShop(false);
    setGameOver(false);
  };

  if (showHome) {
    return (
      <HomeScreen
        onPlay={startNewGame}
        onAbout={() => setShowAbout(true)}
        onBack={() => setShowAbout(false)}
        onShop={() => setShowShop(true)}
        showAbout={showAbout}
        highScore={highScore}
        coins={coins}
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
      />
    );
  }

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-orange-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cat className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Calico Café</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={goToHome}
              className="bg-orange-700 px-4 py-2 rounded-lg hover:bg-orange-800 transition"
            >
              Home
            </button>
            <Timer timeLeft={timeLeft} />
            <ScoreBoard score={score} highScore={highScore} />
          </div>
        </div>
      </header>

      {/* Feedback Message */}
      {feedback && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all ${
          feedback.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-center mb-4">Game Over!</h2>
            <p className="text-lg text-center mb-4">Final Score: {score}</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={startNewGame}
                className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
              >
                Play Again
              </button>
              <button
                onClick={goToHome}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Orders Panel */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="text-orange-600" />
            <h2 className="text-xl font-semibold">Orders ({orders.length}/3)</h2>
          </div>
          <div className="space-y-4">
            {orders.map((order) => (
              <Order
                key={order.id}
                order={order}
                onComplete={(points) => handleOrderComplete(order.id, points)}
                onTimeout={() => handleOrderTimeout(order.id)}
              />
            ))}
            {orders.length === 0 && (
              <p className="text-gray-500 text-center py-4">Waiting for orders...</p>
            )}
          </div>
        </div>

        {/* Kitchen Area */}
        <div className="lg:col-span-2">
          <Kitchen
            currentOrders={orders}
            onOrderComplete={handleOrderComplete}
            onWrongOrder={handleWrongOrder}
          />
        </div>
      </main>
    </div>
  );
}

export default App;