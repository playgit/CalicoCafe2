import { Recipe, Ingredient } from '../types/game';

export const INGREDIENTS: Ingredient[] = [
  { id: 'fish',            name: 'Fish',            color: 'bg-blue-200',                        emoji: '🐟' },
  { id: 'rice',            name: 'Rice',            color: 'bg-white border border-gray-200',    emoji: '🍚' },
  { id: 'nori',            name: 'Nori',            color: 'bg-green-800 text-white',            emoji: '🌿' },
  { id: 'egg',             name: 'Egg',             color: 'bg-yellow-200',                      emoji: '🥚' },
  { id: 'sauce',           name: 'Sauce',           color: 'bg-red-400',                         emoji: '🌶️' },
  { id: 'noodles',         name: 'Noodles',         color: 'bg-yellow-100',                      emoji: '🍜' },
  { id: 'tofu',            name: 'Tofu',            color: 'bg-gray-100',                        emoji: '🫙' },
  { id: 'chicken',         name: 'Chicken',         color: 'bg-orange-200',                      emoji: '🍗' },
  { id: 'vegetables',      name: 'Vegetables',      color: 'bg-green-300',                       emoji: '🥦' },
  { id: 'cheese',          name: 'Cheese',          color: 'bg-yellow-300',                      emoji: '🧀' },
  { id: 'shrimp',          name: 'Shrimp',          color: 'bg-pink-200',                        emoji: '🦐' },
  { id: 'miso',            name: 'Miso',            color: 'bg-amber-600 text-white',            emoji: '🫕' },
  { id: 'matcha',          name: 'Matcha',          color: 'bg-green-500 text-white',            emoji: '🍵' },
  { id: 'mochi-flour',     name: 'Mochi Flour',     color: 'bg-gray-200',                        emoji: '🌾' },
  { id: 'red-bean',        name: 'Red Bean',        color: 'bg-red-700 text-white',              emoji: '🫘' },
  { id: 'cream',           name: 'Cream',           color: 'bg-orange-50 border border-gray-200',emoji: '🥛' },
  { id: 'fruit',           name: 'Fresh Fruit',     color: 'bg-rose-300',                        emoji: '🍓' },
  { id: 'gold-leaf',       name: 'Gold Leaf',       color: 'bg-yellow-400',                      emoji: '✨' },
  { id: 'truffle',         name: 'Black Truffle',   color: 'bg-stone-800 text-white',            emoji: '🍄' },
  { id: 'tapioca',         name: 'Tapioca Pearls',  color: 'bg-stone-900 text-white',            emoji: '🧋' },
  { id: 'tea',             name: 'Black Tea',       color: 'bg-amber-900 text-white',            emoji: '🫖' },
  { id: 'brown-sugar',     name: 'Brown Sugar',     color: 'bg-amber-700 text-white',            emoji: '🍬' },
  { id: 'lychee',          name: 'Lychee',          color: 'bg-pink-100',                        emoji: '🍈' },
  { id: 'coconut',         name: 'Coconut',         color: 'bg-gray-100 border border-gray-200', emoji: '🥥' },
  { id: 'honey',           name: 'Honey',           color: 'bg-amber-300',                       emoji: '🍯' },
  { id: 'mint',            name: 'Fresh Mint',      color: 'bg-emerald-400 text-white',          emoji: '🌱' },
  // Seasonal ingredients
  { id: 'sakura',          name: 'Cherry Blossom',  color: 'bg-pink-300',                        emoji: '🌸' },
  { id: 'white-chocolate', name: 'White Chocolate', color: 'bg-amber-50 border border-gray-200', emoji: '🍫' },
  { id: 'chamomile',       name: 'Chamomile',       color: 'bg-yellow-200',                      emoji: '🌼' },
  { id: 'lavender',        name: 'Lavender',        color: 'bg-purple-300',                      emoji: '💜' },
  { id: 'dark-chocolate',  name: 'Dark Chocolate',  color: 'bg-stone-700 text-white',            emoji: '🍫' },
  // American Diner ingredients
  { id: 'patty',           name: 'Beef Patty',      color: 'bg-red-800 text-white',              emoji: '🥩' },
  { id: 'bun',             name: 'Sesame Bun',      color: 'bg-amber-200',                       emoji: '🍔' },
  { id: 'fries',           name: 'French Fries',    color: 'bg-yellow-300',                      emoji: '🍟' },
  { id: 'pizza-dough',     name: 'Pizza Dough',     color: 'bg-amber-100',                       emoji: '🫓' },
  { id: 'pepperoni',       name: 'Pepperoni',       color: 'bg-red-700 text-white',              emoji: '🍖' },
  { id: 'cola',            name: 'Soda',            color: 'bg-stone-600 text-white',            emoji: '🥤' },
  // Sunset Mocktail Bar ingredients
  { id: 'passionfruit',    name: 'Passionfruit',    color: 'bg-yellow-300',                      emoji: '💛' },
  { id: 'mango',           name: 'Mango',           color: 'bg-amber-300',                       emoji: '🥭' },
  { id: 'grenadine',       name: 'Grenadine',       color: 'bg-red-400 text-white',              emoji: '🍒' },
  { id: 'pineapple',       name: 'Pineapple',       color: 'bg-yellow-200',                      emoji: '🍍' },
  { id: 'ginger',          name: 'Ginger',          color: 'bg-amber-200',                       emoji: '🫚' },
  { id: 'lime',            name: 'Lime',            color: 'bg-lime-300',                        emoji: '🍋' },
  { id: 'watermelon',      name: 'Watermelon',      color: 'bg-red-300',                         emoji: '🍉' },
  { id: 'dragon-fruit',    name: 'Dragon Fruit',    color: 'bg-fuchsia-300',                     emoji: '🐉' },
  { id: 'rose-syrup',      name: 'Rose Syrup',      color: 'bg-rose-300',                        emoji: '🌹' },
  { id: 'hibiscus',        name: 'Hibiscus',        color: 'bg-pink-400 text-white',             emoji: '🌺' },
  { id: 'crushed-ice',     name: 'Crushed Ice',     color: 'bg-cyan-100 border border-cyan-200', emoji: '🧊' },
  { id: 'boba',            name: 'Boba',            color: 'bg-stone-800 text-white',            emoji: '🧋' },
  { id: 'agave',           name: 'Agave',           color: 'bg-emerald-200',                     emoji: '🌵' },
  { id: 'butterfly-pea',   name: 'Butterfly Pea',   color: 'bg-violet-400 text-white',           emoji: '🦋' },
  { id: 'soda-water',      name: 'Soda Water',      color: 'bg-sky-100 border border-sky-200',   emoji: '🫧' },
  { id: 'espresso',        name: 'Espresso',        color: 'bg-stone-700 text-white',            emoji: '☕' },
  // Cosmic Café ingredients
  { id: 'stardust',          name: 'Stardust',          color: 'bg-violet-200',                       emoji: '✨' },
  { id: 'moon-cheese',       name: 'Moon Cheese',       color: 'bg-yellow-100',                       emoji: '🌙' },
  { id: 'galaxy-swirl',      name: 'Galaxy Swirl',      color: 'bg-purple-500 text-white',            emoji: '🌀' },
  { id: 'meteorite-crumble', name: 'Meteorite Crumble', color: 'bg-stone-500 text-white',             emoji: '☄️' },
  { id: 'nebula-cream',      name: 'Nebula Cream',      color: 'bg-fuchsia-200',                      emoji: '🌌' },
  { id: 'cosmic-berry',      name: 'Cosmic Berry',      color: 'bg-indigo-300',                       emoji: '🫐' },
  { id: 'starfruit',         name: 'Starfruit',         color: 'bg-yellow-300',                       emoji: '⭐' },
  { id: 'space-honey',       name: 'Space Honey',       color: 'bg-amber-400 text-white',             emoji: '🍯' },
  { id: 'rocket-pepper',     name: 'Rocket Pepper',     color: 'bg-red-500 text-white',               emoji: '🚀' },
  { id: 'aurora-jelly',      name: 'Aurora Jelly',      color: 'bg-emerald-300',                      emoji: '🟢' },
  // Campfire Kitchen ingredients
  { id: 'marshmallow',       name: 'Marshmallow',       color: 'bg-white border border-gray-200',     emoji: '🤍' },
  { id: 'graham-cracker',    name: 'Graham Cracker',    color: 'bg-amber-200',                        emoji: '🍪' },
  { id: 'maple-syrup',       name: 'Maple Syrup',       color: 'bg-amber-600 text-white',             emoji: '🍁' },
  { id: 'bacon',             name: 'Bacon',             color: 'bg-red-300',                           emoji: '🥓' },
  { id: 'cornbread',         name: 'Cornbread',         color: 'bg-yellow-200',                        emoji: '🍞' },
  { id: 'campfire-smoke',    name: 'Campfire Smoke',    color: 'bg-gray-400 text-white',               emoji: '💨' },
  { id: 'pine-nuts',         name: 'Pine Nuts',         color: 'bg-amber-100',                         emoji: '🌲' },
  { id: 'wild-berry',        name: 'Wild Berry',        color: 'bg-purple-400 text-white',             emoji: '🍇' },
  { id: 'cast-iron-butter',  name: 'Cast Iron Butter',  color: 'bg-yellow-400',                        emoji: '🧈' },
  { id: 'firewood-honey',    name: 'Firewood Honey',    color: 'bg-orange-600 text-white',             emoji: '🔥' },
  // Zen Garden ingredients
  { id: 'sesame',            name: 'Sesame',            color: 'bg-amber-100',                         emoji: '🫘' },
  { id: 'yuzu',              name: 'Yuzu',              color: 'bg-yellow-300',                        emoji: '🍊' },
  { id: 'bamboo-shoot',      name: 'Bamboo Shoot',      color: 'bg-lime-200',                          emoji: '🎋' },
  { id: 'edamame',           name: 'Edamame',           color: 'bg-green-400 text-white',              emoji: '🫛' },
  { id: 'wasabi',            name: 'Wasabi',            color: 'bg-green-600 text-white',              emoji: '🟢' },
  { id: 'pickled-ginger',    name: 'Pickled Ginger',    color: 'bg-pink-200',                          emoji: '🩷' },
  { id: 'umeboshi',          name: 'Umeboshi',          color: 'bg-red-300',                           emoji: '🔴' },
  { id: 'dashi',             name: 'Dashi',             color: 'bg-amber-100',                         emoji: '🥣' },
  { id: 'seaweed',           name: 'Seaweed',           color: 'bg-green-700 text-white',              emoji: '🌿' },
  { id: 'rice-vinegar',      name: 'Rice Vinegar',      color: 'bg-gray-100',                          emoji: '🍶' },
  // Candy Shop ingredients
  { id: 'cotton-candy',      name: 'Cotton Candy',      color: 'bg-pink-300',                          emoji: '🍭' },
  { id: 'sprinkles',         name: 'Sprinkles',         color: 'bg-yellow-200',                        emoji: '🎉' },
  { id: 'gummy-bears',       name: 'Gummy Bears',       color: 'bg-green-300',                         emoji: '🧸' },
  { id: 'caramel',           name: 'Caramel',           color: 'bg-amber-400',                         emoji: '🤎' },
  { id: 'bubblegum',         name: 'Bubblegum',         color: 'bg-pink-400 text-white',               emoji: '🫧' },
  { id: 'rock-candy',        name: 'Rock Candy',        color: 'bg-cyan-200',                          emoji: '💎' },
  { id: 'jelly-bean',        name: 'Jelly Bean',        color: 'bg-red-300',                           emoji: '🫘' },
  { id: 'frosting',          name: 'Frosting',          color: 'bg-white border border-pink-200',      emoji: '🎂' },
  { id: 'wafer',             name: 'Wafer',             color: 'bg-amber-200',                         emoji: '🧇' },
  { id: 'pop-rocks',         name: 'Pop Rocks',         color: 'bg-orange-400 text-white',             emoji: '💥' },
  // Ocean Breeze ingredients
  { id: 'sea-salt',          name: 'Sea Salt',          color: 'bg-blue-100',                          emoji: '🧂' },
  { id: 'crab',              name: 'Crab',              color: 'bg-red-200',                           emoji: '🦀' },
  { id: 'kelp',              name: 'Kelp',              color: 'bg-green-600 text-white',              emoji: '🌿' },
  { id: 'ocean-jelly',       name: 'Ocean Jelly',       color: 'bg-cyan-300',                          emoji: '🪼' },
  { id: 'coral-sugar',       name: 'Coral Sugar',       color: 'bg-rose-200',                          emoji: '🪸' },
  { id: 'sand-cookie',       name: 'Sand Cookie',       color: 'bg-amber-200',                         emoji: '🏖️' },
  { id: 'pearl-tapioca',     name: 'Pearl Tapioca',     color: 'bg-white border border-gray-300',      emoji: '🦪' },
  { id: 'driftwood-smoke',   name: 'Driftwood Smoke',   color: 'bg-stone-400 text-white',              emoji: '🪵' },
  { id: 'lemon',             name: 'Lemon',             color: 'bg-yellow-300',                        emoji: '🍋' },
  { id: 'seafoam',           name: 'Seafoam',           color: 'bg-teal-200',                          emoji: '🌊' },
];

export const RECIPES: Recipe[] = [
  // Regular Dishes
  {
    id: 'sushi',
    name: 'Classic Sushi Roll',
    ingredients: ['rice', 'fish', 'nori'],
    points: 100,
    timeLimit: 30,
    category: 'food'
  },
  {
    id: 'spicy-roll',
    name: 'Spicy Tuna Roll',
    ingredients: ['rice', 'fish', 'sauce'],
    points: 120,
    timeLimit: 35,
    category: 'food'
  },
  {
    id: 'california',
    name: 'California Roll',
    ingredients: ['rice', 'nori', 'shrimp'],
    points: 110,
    timeLimit: 30,
    category: 'food'
  },
  {
    id: 'veggie-roll',
    name: 'Vegetable Roll',
    ingredients: ['rice', 'nori', 'vegetables'],
    points: 90,
    timeLimit: 25,
    category: 'food'
  },
  {
    id: 'cheese-roll',
    name: 'Cheese Roll',
    ingredients: ['rice', 'nori', 'cheese'],
    points: 100,
    timeLimit: 30,
    category: 'food'
  },
  {
    id: 'ramen',
    name: 'Classic Ramen',
    ingredients: ['noodles', 'egg', 'sauce'],
    points: 150,
    timeLimit: 40,
    category: 'food'
  },
  {
    id: 'miso-ramen',
    name: 'Miso Ramen',
    ingredients: ['noodles', 'miso', 'vegetables'],
    points: 160,
    timeLimit: 45,
    category: 'food'
  },
  {
    id: 'shrimp-ramen',
    name: 'Shrimp Ramen',
    ingredients: ['noodles', 'shrimp', 'sauce'],
    points: 170,
    timeLimit: 45,
    category: 'food'
  },
  {
    id: 'veggie-ramen',
    name: 'Vegetable Ramen',
    ingredients: ['noodles', 'vegetables', 'tofu'],
    points: 140,
    timeLimit: 35,
    category: 'food'
  },
  {
    id: 'rice-bowl',
    name: 'Classic Rice Bowl',
    ingredients: ['rice', 'egg', 'sauce'],
    points: 80,
    timeLimit: 25,
    category: 'food'
  },
  {
    id: 'chicken-bowl',
    name: 'Chicken Rice Bowl',
    ingredients: ['rice', 'chicken', 'sauce'],
    points: 100,
    timeLimit: 30,
    category: 'food'
  },
  {
    id: 'tofu-bowl',
    name: 'Tofu Rice Bowl',
    ingredients: ['rice', 'tofu', 'vegetables'],
    points: 90,
    timeLimit: 25,
    category: 'food'
  },
  {
    id: 'miso-soup',
    name: 'Classic Miso Soup',
    ingredients: ['miso', 'tofu', 'vegetables'],
    points: 120,
    timeLimit: 35,
    category: 'food'
  },
  {
    id: 'seafood-miso',
    name: 'Seafood Miso Soup',
    ingredients: ['miso', 'shrimp', 'vegetables'],
    points: 140,
    timeLimit: 40,
    category: 'food'
  },
  {
    id: 'katsu',
    name: 'Chicken Katsu',
    ingredients: ['chicken', 'sauce', 'rice'],
    points: 160,
    timeLimit: 45,
    category: 'food'
  },
  {
    id: 'tempura',
    name: 'Shrimp Tempura',
    ingredients: ['shrimp', 'vegetables', 'sauce'],
    points: 140,
    timeLimit: 40,
    category: 'food'
  },
  {
    id: 'udon',
    name: 'Classic Udon',
    ingredients: ['noodles', 'vegetables', 'tofu'],
    points: 110,
    timeLimit: 35,
    category: 'food'
  },
  {
    id: 'poke',
    name: 'Poke Bowl',
    ingredients: ['rice', 'fish', 'vegetables'],
    points: 130,
    timeLimit: 30,
    category: 'food'
  },
  {
    id: 'okonomiyaki',
    name: 'Okonomiyaki',
    ingredients: ['egg', 'vegetables', 'sauce'],
    points: 140,
    timeLimit: 45,
    category: 'food'
  },
  {
    id: 'yakisoba',
    name: 'Yakisoba',
    ingredients: ['noodles', 'vegetables', 'chicken'],
    points: 120,
    timeLimit: 40,
    category: 'food'
  },
  {
    id: 'tamago-sushi',
    name: 'Tamago Sushi',
    ingredients: ['rice', 'nori', 'egg'],
    points: 95,
    timeLimit: 25,
    category: 'food'
  },
  {
    id: 'teriyaki-bowl',
    name: 'Teriyaki Bowl',
    ingredients: ['rice', 'chicken', 'honey'],
    points: 115,
    timeLimit: 30,
    category: 'food'
  },

  // Desserts
  {
    id: 'matcha-mochi',
    name: 'Matcha Mochi',
    ingredients: ['matcha', 'mochi-flour', 'red-bean'],
    points: 180,
    timeLimit: 50,
    category: 'dessert'
  },
  {
    id: 'fruit-mochi',
    name: 'Fruit Mochi',
    ingredients: ['mochi-flour', 'cream', 'fruit'],
    points: 160,
    timeLimit: 45,
    category: 'dessert'
  },
  {
    id: 'coconut-mochi',
    name: 'Coconut Mochi',
    ingredients: ['mochi-flour', 'coconut', 'cream'],
    points: 170,
    timeLimit: 45,
    category: 'dessert'
  },
  {
    id: 'lychee-mochi',
    name: 'Lychee Mochi',
    ingredients: ['mochi-flour', 'lychee', 'cream'],
    points: 175,
    timeLimit: 45,
    category: 'dessert'
  },
  {
    id: 'matcha-parfait',
    name: 'Matcha Parfait',
    ingredients: ['matcha', 'cream', 'fruit'],
    points: 170,
    timeLimit: 35,
    category: 'dessert'
  },
  {
    id: 'red-bean-parfait',
    name: 'Red Bean Parfait',
    ingredients: ['red-bean', 'cream', 'matcha'],
    points: 150,
    timeLimit: 40,
    category: 'dessert'
  },
  {
    id: 'fruit-parfait',
    name: 'Fresh Fruit Parfait',
    ingredients: ['fruit', 'cream', 'honey'],
    points: 160,
    timeLimit: 35,
    category: 'dessert'
  },
  {
    id: 'lychee-parfait',
    name: 'Lychee Parfait',
    ingredients: ['lychee', 'cream', 'fruit'],
    points: 165,
    timeLimit: 35,
    category: 'dessert'
  },
  {
    id: 'honey-matcha-mochi',
    name: 'Honey Matcha Mochi',
    ingredients: ['matcha', 'mochi-flour', 'honey'],
    points: 188,
    timeLimit: 50,
    category: 'dessert'
  },

  // Drinks
  {
    id: 'boba-tea',
    name: 'Brown Sugar Boba Tea',
    ingredients: ['tapioca', 'tea', 'brown-sugar'],
    points: 140,
    timeLimit: 45,
    category: 'drink'
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    ingredients: ['matcha', 'cream', 'honey'],
    points: 130,
    timeLimit: 40,
    category: 'drink'
  },
  {
    id: 'fruit-tea',
    name: 'Fresh Fruit Tea',
    ingredients: ['tea', 'fruit', 'honey'],
    points: 120,
    timeLimit: 35,
    category: 'drink'
  },
  {
    id: 'coconut-tea',
    name: 'Coconut Milk Tea',
    ingredients: ['tea', 'coconut', 'honey'],
    points: 125,
    timeLimit: 35,
    category: 'drink'
  },
  {
    id: 'lychee-tea',
    name: 'Lychee Bubble Tea',
    ingredients: ['tea', 'lychee', 'tapioca'],
    points: 135,
    timeLimit: 40,
    category: 'drink'
  },
  {
    id: 'mint-lychee-tea',
    name: 'Mint Lychee Tea',
    ingredients: ['tea', 'mint', 'lychee'],
    points: 130,
    timeLimit: 35,
    category: 'drink'
  },

  // VIP Recipes
  {
    id: 'truffle-sushi',
    name: 'Truffle Sushi Deluxe',
    ingredients: ['rice', 'fish', 'truffle'],
    points: 250,
    timeLimit: 45,
    vipOnly: true,
    category: 'vip'
  },
  {
    id: 'luxury-ramen',
    name: 'Luxury Truffle Ramen',
    ingredients: ['noodles', 'truffle', 'egg'],
    points: 280,
    timeLimit: 50,
    vipOnly: true,
    category: 'vip'
  },
  {
    id: 'royal-poke',
    name: 'Royal Poke Bowl',
    ingredients: ['rice', 'fish', 'truffle', 'sauce'],
    points: 300,
    timeLimit: 55,
    vipOnly: true,
    category: 'vip'
  },
  {
    id: 'deluxe-matcha',
    name: 'Deluxe Matcha Paradise',
    ingredients: ['matcha', 'cream', 'truffle', 'honey'],
    points: 320,
    timeLimit: 50,
    vipOnly: true,
    category: 'vip'
  },

  // Ultra VIP Golden Drinks (Emperor exclusive)
  {
    id: 'imperial-sunrise',
    name: '👑 Imperial Sunrise Elixir',
    ingredients: ['tea', 'honey', 'gold-leaf', 'lychee', 'mint'],
    points: 1000,
    timeLimit: 45,
    vipOnly: true,
    category: 'vip'
  },
  {
    id: 'royal-matcha',
    name: '👑 Royal Matcha Dynasty',
    ingredients: ['matcha', 'cream', 'gold-leaf', 'honey', 'coconut'],
    points: 1000,
    timeLimit: 40,
    vipOnly: true,
    category: 'vip'
  },
  {
    id: 'golden-fruit',
    name: '👑 Golden Fruit Nectar',
    ingredients: ['fruit', 'honey', 'gold-leaf', 'tea', 'coconut'],
    points: 1000,
    timeLimit: 35,
    vipOnly: true,
    category: 'vip'
  },
  {
    id: 'emperors-boba',
    name: '👑 Emperor\'s Boba Dream',
    ingredients: ['tapioca', 'tea', 'gold-leaf', 'brown-sugar', 'cream'],
    points: 1000,
    timeLimit: 45,
    vipOnly: true,
    category: 'vip'
  },
  {
    id: 'celestial-brew',
    name: '👑 Celestial Golden Brew',
    ingredients: ['tea', 'lychee', 'gold-leaf', 'mint', 'honey'],
    points: 1000,
    timeLimit: 40,
    vipOnly: true,
    category: 'vip'
  },

  // Sakura Theme Recipes (unlocked with theme-sakura)
  {
    id: 'sakura-mochi',
    name: 'Sakura Mochi',
    ingredients: ['mochi-flour', 'sakura', 'cream'],
    points: 200,
    timeLimit: 50,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'sakura-latte',
    name: 'Sakura Latte',
    ingredients: ['matcha', 'sakura', 'honey'],
    points: 160,
    timeLimit: 40,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'cherry-blossom-parfait',
    name: 'Cherry Blossom Parfait',
    ingredients: ['fruit', 'sakura', 'cream'],
    points: 185,
    timeLimit: 45,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'sakura-tea',
    name: 'Sakura Tea',
    ingredients: ['tea', 'sakura', 'honey'],
    points: 145,
    timeLimit: 35,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'sakura-bubble-tea',
    name: 'Sakura Bubble Tea',
    ingredients: ['tapioca', 'tea', 'sakura'],
    points: 150,
    timeLimit: 40,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'spring-mochi-platter',
    name: 'Spring Mochi Platter',
    ingredients: ['mochi-flour', 'sakura', 'white-chocolate'],
    points: 195,
    timeLimit: 50,
    theme: 'sakura',
    category: 'sakura'
  },

  // Night Theme Recipes (unlocked with theme-night)
  {
    id: 'decaf-mint-tea',
    name: 'Decaffeinated Mint Tea',
    ingredients: ['tea', 'mint', 'chamomile'],
    points: 130,
    timeLimit: 35,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'lavender-latte',
    name: 'Lavender Dream Latte',
    ingredients: ['lavender', 'cream', 'honey'],
    points: 160,
    timeLimit: 40,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'midnight-hot-chocolate',
    name: 'Midnight Hot Chocolate',
    ingredients: ['dark-chocolate', 'cream', 'honey'],
    points: 155,
    timeLimit: 40,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'chamomile-moon-tea',
    name: 'Chamomile Moon Tea',
    ingredients: ['chamomile', 'honey', 'tea'],
    points: 125,
    timeLimit: 35,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'starlight-cookies',
    name: 'Starlight Cookies',
    ingredients: ['dark-chocolate', 'mochi-flour', 'cream'],
    points: 175,
    timeLimit: 50,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'nighttime-parfait',
    name: 'Nighttime Parfait',
    ingredients: ['dark-chocolate', 'cream', 'lavender'],
    points: 170,
    timeLimit: 45,
    theme: 'night',
    category: 'night'
  },

  // More Sakura Theme Recipes
  {
    id: 'spring-ramen',
    name: 'Spring Blossom Ramen',
    ingredients: ['noodles', 'egg', 'sakura'],
    points: 155,
    timeLimit: 45,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'hanami-bento',
    name: 'Hanami Bento',
    ingredients: ['rice', 'vegetables', 'sakura'],
    points: 120,
    timeLimit: 30,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'sakura-milk-tea',
    name: 'Sakura Milk Tea',
    ingredients: ['tea', 'cream', 'sakura'],
    points: 145,
    timeLimit: 35,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'sakura-coconut-mochi',
    name: 'Sakura Coconut Mochi',
    ingredients: ['mochi-flour', 'coconut', 'sakura'],
    points: 178,
    timeLimit: 48,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'cherry-blossom-soda',
    name: 'Cherry Blossom Soda',
    ingredients: ['lychee', 'sakura', 'honey'],
    points: 138,
    timeLimit: 35,
    theme: 'sakura',
    category: 'sakura'
  },
  {
    id: 'sakura-rice-pudding',
    name: 'Sakura Rice Pudding',
    ingredients: ['rice', 'cream', 'sakura'],
    points: 130,
    timeLimit: 35,
    theme: 'sakura',
    category: 'sakura'
  },

  // More Night Theme Recipes
  {
    id: 'moonlight-matcha',
    name: 'Moonlight Matcha',
    ingredients: ['matcha', 'lavender', 'honey'],
    points: 155,
    timeLimit: 40,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'dream-bubble-tea',
    name: 'Dream Bubble Tea',
    ingredients: ['tapioca', 'lavender', 'cream'],
    points: 150,
    timeLimit: 40,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'midnight-mochi',
    name: 'Midnight Mochi',
    ingredients: ['mochi-flour', 'dark-chocolate', 'lavender'],
    points: 185,
    timeLimit: 50,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'sleepy-cat-soup',
    name: 'Sleepy Cat Soup',
    ingredients: ['miso', 'tofu', 'chamomile'],
    points: 130,
    timeLimit: 35,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'stargazer-tea',
    name: 'Stargazer Tea',
    ingredients: ['tea', 'dark-chocolate', 'mint'],
    points: 128,
    timeLimit: 35,
    theme: 'night',
    category: 'night'
  },
  {
    id: 'night-bloom-parfait',
    name: 'Night Bloom Parfait',
    ingredients: ['cream', 'fruit', 'lavender'],
    points: 165,
    timeLimit: 40,
    theme: 'night',
    category: 'night'
  },

  // American Diner Theme Recipes (unlocked with theme-american)
  {
    id: 'cheeseburger',
    name: 'Classic Cheeseburger',
    ingredients: ['patty', 'bun', 'cheese'],
    points: 140,
    timeLimit: 35,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'double-burger',
    name: 'Double Bacon Burger',
    ingredients: ['patty', 'bun', 'sauce'],
    points: 150,
    timeLimit: 40,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'veggie-burger',
    name: 'Veggie Burger',
    ingredients: ['bun', 'vegetables', 'cheese'],
    points: 120,
    timeLimit: 30,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken Sandwich',
    ingredients: ['chicken', 'bun', 'sauce'],
    points: 130,
    timeLimit: 35,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'classic-fries',
    name: 'Classic Loaded Fries',
    ingredients: ['fries', 'sauce', 'cheese'],
    points: 100,
    timeLimit: 25,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Veggie Fries',
    ingredients: ['fries', 'cheese', 'vegetables'],
    points: 115,
    timeLimit: 30,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'pepperoni-pizza',
    name: 'Pepperoni Pizza',
    ingredients: ['pizza-dough', 'pepperoni', 'cheese'],
    points: 160,
    timeLimit: 45,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'veggie-pizza',
    name: 'Garden Veggie Pizza',
    ingredients: ['pizza-dough', 'vegetables', 'cheese'],
    points: 145,
    timeLimit: 40,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'bbq-pizza',
    name: 'BBQ Chicken Pizza',
    ingredients: ['pizza-dough', 'chicken', 'sauce'],
    points: 155,
    timeLimit: 45,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'chocolate-shake',
    name: 'Chocolate Milkshake',
    ingredients: ['cream', 'dark-chocolate', 'cola'],
    points: 152,
    timeLimit: 40,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'strawberry-shake',
    name: 'Strawberry Milkshake',
    ingredients: ['cream', 'fruit', 'cola'],
    points: 148,
    timeLimit: 38,
    theme: 'american',
    category: 'american'
  },
  {
    id: 'vanilla-shake',
    name: 'Vanilla Milkshake',
    ingredients: ['cream', 'honey', 'cola'],
    points: 140,
    timeLimit: 35,
    theme: 'american',
    category: 'american'
  },

  // Sunset / Meow-Meow Mocktail Bar Recipes (unlocked with theme-sunset)
  {
    id: 'sunset-spritzer',
    name: 'Sunset Spritzer',
    ingredients: ['grenadine', 'mango', 'soda-water'],
    points: 160,
    timeLimit: 40,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'purrfect-punch',
    name: 'Purrfect Punch',
    ingredients: ['passionfruit', 'pineapple', 'watermelon', 'lime'],
    points: 155,
    timeLimit: 40,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'catnip-cooler',
    name: 'Catnip Cooler',
    ingredients: ['mint', 'ginger', 'agave', 'soda-water'],
    points: 145,
    timeLimit: 35,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'twilight-tiki',
    name: 'Twilight Tiki',
    ingredients: ['pineapple', 'coconut', 'mango', 'crushed-ice'],
    points: 160,
    timeLimit: 40,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'meow-meow-mai-tai',
    name: 'Meow-Meow Mai Tai',
    ingredients: ['passionfruit', 'mango', 'grenadine', 'pineapple'],
    points: 180,
    timeLimit: 45,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'golden-paw-fizz',
    name: 'Golden Paw Fizz',
    ingredients: ['honey', 'ginger', 'lychee', 'soda-water'],
    points: 140,
    timeLimit: 35,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'dragon-kiss',
    name: 'Dragon Kiss',
    ingredients: ['dragon-fruit', 'rose-syrup', 'lime', 'soda-water'],
    points: 150,
    timeLimit: 40,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'blossom-bliss',
    name: 'Blossom Bliss',
    ingredients: ['sakura', 'lavender', 'honey', 'boba'],
    points: 155,
    timeLimit: 40,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'calico-colada',
    name: 'Calico Colada',
    ingredients: ['pineapple', 'coconut', 'fruit', 'crushed-ice'],
    points: 165,
    timeLimit: 40,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'hibiscus-whisker-sour',
    name: 'Hibiscus Whisker Sour',
    ingredients: ['hibiscus', 'lychee', 'lime', 'grenadine'],
    points: 135,
    timeLimit: 35,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'furozen-meowjito',
    name: 'Fur-ozen Meow-jito',
    ingredients: ['mint', 'lime', 'crushed-ice', 'agave'],
    points: 170,
    timeLimit: 45,
    theme: 'sunset',
    category: 'sunset'
  },
  {
    id: 'espresso-purrtini',
    name: 'Espresso Purr-tini',
    ingredients: ['espresso', 'honey', 'coconut', 'crushed-ice'],
    points: 175,
    timeLimit: 45,
    theme: 'sunset',
    category: 'sunset'
  },

  // ─── Cosmic Café Recipes ──────────────────────────────────────────────────
  { id: 'galaxy-swirl-latte',     name: 'Galaxy Swirl Latte',        ingredients: ['galaxy-swirl', 'nebula-cream', 'space-honey'],           points: 160, timeLimit: 40, theme: 'cosmic', category: 'cosmic' },
  { id: 'nebula-parfait',         name: 'Nebula Parfait',            ingredients: ['nebula-cream', 'cosmic-berry', 'stardust'],               points: 185, timeLimit: 45, theme: 'cosmic', category: 'cosmic' },
  { id: 'cosmic-crumble',         name: 'Cosmic Crumble',            ingredients: ['meteorite-crumble', 'space-honey', 'nebula-cream'],       points: 175, timeLimit: 45, theme: 'cosmic', category: 'cosmic' },
  { id: 'starlight-mochi',        name: 'Starlight Mochi',           ingredients: ['mochi-flour', 'stardust', 'aurora-jelly'],                points: 190, timeLimit: 50, theme: 'cosmic', category: 'cosmic' },
  { id: 'meteor-stir-fry',        name: 'Meteor Stir-Fry',           ingredients: ['rocket-pepper', 'starfruit', 'moon-cheese'],              points: 145, timeLimit: 35, theme: 'cosmic', category: 'cosmic' },
  { id: 'aurora-borealis-tea',    name: 'Aurora Borealis Tea',       ingredients: ['aurora-jelly', 'tea', 'space-honey'],                     points: 140, timeLimit: 35, theme: 'cosmic', category: 'cosmic' },
  { id: 'starfruit-fizz',         name: 'Starfruit Fizz',            ingredients: ['starfruit', 'soda-water', 'stardust'],                    points: 135, timeLimit: 35, theme: 'cosmic', category: 'cosmic' },
  { id: 'moon-cheese-toast',      name: 'Moon Cheese Toast',         ingredients: ['moon-cheese', 'cream', 'rocket-pepper'],                  points: 130, timeLimit: 30, theme: 'cosmic', category: 'cosmic' },
  { id: 'supernova-sundae',       name: 'Supernova Sundae',          ingredients: ['cosmic-berry', 'nebula-cream', 'meteorite-crumble'],      points: 195, timeLimit: 50, theme: 'cosmic', category: 'cosmic' },
  { id: 'milky-way-smoothie',     name: 'Milky Way Smoothie',        ingredients: ['galaxy-swirl', 'cosmic-berry', 'cream'],                  points: 155, timeLimit: 40, theme: 'cosmic', category: 'cosmic' },
  { id: 'asteroid-rice-bowl',     name: 'Asteroid Rice Bowl',        ingredients: ['rice', 'rocket-pepper', 'moon-cheese'],                   points: 125, timeLimit: 30, theme: 'cosmic', category: 'cosmic' },
  { id: 'constellation-cake',     name: 'Constellation Cake',        ingredients: ['stardust', 'aurora-jelly', 'nebula-cream', 'cream'],      points: 200, timeLimit: 50, theme: 'cosmic', category: 'cosmic' },

  // ─── Campfire Kitchen Recipes ─────────────────────────────────────────────
  { id: 'classic-smores',         name: "Classic S'mores",           ingredients: ['marshmallow', 'graham-cracker', 'dark-chocolate'],         points: 170, timeLimit: 40, theme: 'campfire', category: 'campfire' },
  { id: 'campfire-cocoa',         name: 'Campfire Cocoa',            ingredients: ['dark-chocolate', 'marshmallow', 'cream'],                  points: 150, timeLimit: 40, theme: 'campfire', category: 'campfire' },
  { id: 'trail-mix-bowl',         name: 'Trail Mix Bowl',            ingredients: ['pine-nuts', 'wild-berry', 'honey'],                        points: 120, timeLimit: 30, theme: 'campfire', category: 'campfire' },
  { id: 'maple-bacon-pancakes',   name: 'Maple Bacon Pancakes',      ingredients: ['maple-syrup', 'bacon', 'cast-iron-butter'],                points: 165, timeLimit: 45, theme: 'campfire', category: 'campfire' },
  { id: 'fireside-stew',          name: 'Fireside Stew',             ingredients: ['campfire-smoke', 'vegetables', 'cast-iron-butter'],        points: 140, timeLimit: 35, theme: 'campfire', category: 'campfire' },
  { id: 'pine-nut-granola',       name: 'Pine Nut Granola',          ingredients: ['pine-nuts', 'firewood-honey', 'maple-syrup'],              points: 135, timeLimit: 35, theme: 'campfire', category: 'campfire' },
  { id: 'smoky-cornbread',        name: 'Smoky Cornbread',           ingredients: ['cornbread', 'cast-iron-butter', 'campfire-smoke'],         points: 125, timeLimit: 30, theme: 'campfire', category: 'campfire' },
  { id: 'wild-berry-crumble',     name: 'Wild Berry Crumble',        ingredients: ['wild-berry', 'graham-cracker', 'firewood-honey'],          points: 155, timeLimit: 40, theme: 'campfire', category: 'campfire' },
  { id: 'marshmallow-toast',      name: 'Toasted Marshmallow Stack', ingredients: ['marshmallow', 'firewood-honey', 'graham-cracker'],         points: 145, timeLimit: 35, theme: 'campfire', category: 'campfire' },
  { id: 'campfire-chai',          name: 'Campfire Chai',             ingredients: ['tea', 'campfire-smoke', 'firewood-honey'],                  points: 130, timeLimit: 35, theme: 'campfire', category: 'campfire' },
  { id: 'lumberjack-breakfast',   name: 'Lumberjack Breakfast',      ingredients: ['bacon', 'egg', 'maple-syrup', 'cornbread'],                points: 190, timeLimit: 50, theme: 'campfire', category: 'campfire' },
  { id: 'stargazer-smores',       name: "Stargazer S'mores",         ingredients: ['marshmallow', 'wild-berry', 'dark-chocolate', 'cream'],    points: 200, timeLimit: 50, theme: 'campfire', category: 'campfire' },

  // ─── Zen Garden Recipes ───────────────────────────────────────────────────
  { id: 'zen-matcha-bowl',        name: 'Zen Matcha Bowl',           ingredients: ['matcha', 'sesame', 'dashi'],                               points: 145, timeLimit: 35, theme: 'zen', category: 'zen' },
  { id: 'stone-garden-soup',      name: 'Stone Garden Soup',         ingredients: ['dashi', 'tofu', 'seaweed'],                                points: 130, timeLimit: 35, theme: 'zen', category: 'zen' },
  { id: 'bamboo-steam-buns',      name: 'Bamboo Steam Buns',         ingredients: ['bamboo-shoot', 'mochi-flour', 'sesame'],                   points: 160, timeLimit: 40, theme: 'zen', category: 'zen' },
  { id: 'yuzu-miso-soup',         name: 'Yuzu Miso Soup',            ingredients: ['yuzu', 'miso', 'edamame'],                                 points: 140, timeLimit: 35, theme: 'zen', category: 'zen' },
  { id: 'wasabi-rice-bowl',       name: 'Wasabi Rice Bowl',          ingredients: ['rice', 'wasabi', 'pickled-ginger'],                         points: 125, timeLimit: 30, theme: 'zen', category: 'zen' },
  { id: 'sesame-mochi',           name: 'Sesame Mochi',              ingredients: ['sesame', 'mochi-flour', 'honey'],                          points: 170, timeLimit: 45, theme: 'zen', category: 'zen' },
  { id: 'edamame-zen-salad',      name: 'Edamame Zen Salad',         ingredients: ['edamame', 'rice-vinegar', 'seaweed'],                       points: 115, timeLimit: 30, theme: 'zen', category: 'zen' },
  { id: 'umeboshi-rice',          name: 'Umeboshi Rice',             ingredients: ['rice', 'umeboshi', 'sesame'],                               points: 120, timeLimit: 30, theme: 'zen', category: 'zen' },
  { id: 'yuzu-honey-tea',         name: 'Yuzu Honey Tea',            ingredients: ['yuzu', 'honey', 'tea'],                                    points: 135, timeLimit: 35, theme: 'zen', category: 'zen' },
  { id: 'bamboo-matcha-latte',    name: 'Bamboo Matcha Latte',       ingredients: ['matcha', 'bamboo-shoot', 'cream'],                          points: 150, timeLimit: 40, theme: 'zen', category: 'zen' },
  { id: 'zen-garden-parfait',     name: 'Zen Garden Parfait',        ingredients: ['matcha', 'sesame', 'cream', 'yuzu'],                        points: 195, timeLimit: 50, theme: 'zen', category: 'zen' },
  { id: 'tranquil-dashi-noodles', name: 'Tranquil Dashi Noodles',    ingredients: ['noodles', 'dashi', 'bamboo-shoot', 'seaweed'],              points: 180, timeLimit: 45, theme: 'zen', category: 'zen' },

  // ─── Candy Shop Recipes ───────────────────────────────────────────────────
  { id: 'cotton-candy-cloud',     name: 'Cotton Candy Cloud',        ingredients: ['cotton-candy', 'cream', 'sprinkles'],                       points: 160, timeLimit: 40, theme: 'candy', category: 'candy' },
  { id: 'gummy-bear-sundae',      name: 'Gummy Bear Sundae',         ingredients: ['gummy-bears', 'frosting', 'sprinkles'],                     points: 170, timeLimit: 45, theme: 'candy', category: 'candy' },
  { id: 'sprinkle-explosion',     name: 'Sprinkle Explosion Cake',   ingredients: ['sprinkles', 'frosting', 'wafer'],                           points: 185, timeLimit: 45, theme: 'candy', category: 'candy' },
  { id: 'caramel-crunch',         name: 'Caramel Crunch Bowl',       ingredients: ['caramel', 'wafer', 'cream'],                                points: 145, timeLimit: 35, theme: 'candy', category: 'candy' },
  { id: 'bubblegum-shake',        name: 'Bubblegum Shake',           ingredients: ['bubblegum', 'cream', 'pop-rocks'],                          points: 155, timeLimit: 40, theme: 'candy', category: 'candy' },
  { id: 'rock-candy-tea',         name: 'Rock Candy Tea',            ingredients: ['rock-candy', 'tea', 'honey'],                               points: 130, timeLimit: 35, theme: 'candy', category: 'candy' },
  { id: 'jelly-bean-parfait',     name: 'Jelly Bean Parfait',        ingredients: ['jelly-bean', 'cream', 'caramel'],                            points: 165, timeLimit: 40, theme: 'candy', category: 'candy' },
  { id: 'pop-rocks-soda',         name: 'Pop Rocks Soda',            ingredients: ['pop-rocks', 'soda-water', 'cotton-candy'],                   points: 140, timeLimit: 35, theme: 'candy', category: 'candy' },
  { id: 'frosted-wafer-stack',    name: 'Frosted Wafer Stack',       ingredients: ['wafer', 'frosting', 'caramel', 'sprinkles'],                 points: 200, timeLimit: 50, theme: 'candy', category: 'candy' },
  { id: 'gummy-mochi',            name: 'Gummy Mochi',               ingredients: ['gummy-bears', 'mochi-flour', 'cotton-candy'],                points: 175, timeLimit: 45, theme: 'candy', category: 'candy' },
  { id: 'candy-cane-cocoa',       name: 'Candy Cane Cocoa',          ingredients: ['rock-candy', 'dark-chocolate', 'cream'],                     points: 150, timeLimit: 40, theme: 'candy', category: 'candy' },
  { id: 'sugar-rush-rice',        name: 'Sugar Rush Rice Crispy',    ingredients: ['rice', 'caramel', 'marshmallow'],                            points: 135, timeLimit: 35, theme: 'candy', category: 'candy' },

  // ─── Ocean Breeze Recipes ─────────────────────────────────────────────────
  { id: 'ocean-jelly-parfait',    name: 'Ocean Jelly Parfait',       ingredients: ['ocean-jelly', 'coral-sugar', 'cream'],                       points: 165, timeLimit: 40, theme: 'ocean', category: 'ocean' },
  { id: 'seafoam-latte',          name: 'Seafoam Latte',             ingredients: ['seafoam', 'cream', 'sea-salt'],                              points: 145, timeLimit: 35, theme: 'ocean', category: 'ocean' },
  { id: 'coastal-crab-roll',      name: 'Coastal Crab Roll',         ingredients: ['crab', 'rice', 'seaweed'],                                   points: 160, timeLimit: 40, theme: 'ocean', category: 'ocean' },
  { id: 'pearl-tea',              name: 'Pearl Tea',                 ingredients: ['pearl-tapioca', 'tea', 'coral-sugar'],                        points: 140, timeLimit: 35, theme: 'ocean', category: 'ocean' },
  { id: 'driftwood-smoked-fish',  name: 'Driftwood Smoked Fish',     ingredients: ['fish', 'driftwood-smoke', 'lemon'],                           points: 155, timeLimit: 40, theme: 'ocean', category: 'ocean' },
  { id: 'kelp-noodle-bowl',       name: 'Kelp Noodle Bowl',          ingredients: ['kelp', 'noodles', 'sea-salt'],                                points: 130, timeLimit: 35, theme: 'ocean', category: 'ocean' },
  { id: 'sand-cookie-tower',      name: 'Sand Cookie Tower',         ingredients: ['sand-cookie', 'coral-sugar', 'coconut'],                      points: 150, timeLimit: 40, theme: 'ocean', category: 'ocean' },
  { id: 'ocean-breeze-smoothie',  name: 'Ocean Breeze Smoothie',     ingredients: ['seafoam', 'lemon', 'coconut'],                                points: 135, timeLimit: 35, theme: 'ocean', category: 'ocean' },
  { id: 'tide-pool-soup',         name: 'Tide Pool Soup',            ingredients: ['crab', 'kelp', 'dashi'],                                      points: 170, timeLimit: 45, theme: 'ocean', category: 'ocean' },
  { id: 'seaside-mochi',          name: 'Seaside Mochi',             ingredients: ['mochi-flour', 'sea-salt', 'ocean-jelly'],                      points: 175, timeLimit: 45, theme: 'ocean', category: 'ocean' },
  { id: 'lemon-shrimp-bowl',      name: 'Lemon Shrimp Bowl',         ingredients: ['shrimp', 'lemon', 'rice', 'sea-salt'],                         points: 185, timeLimit: 45, theme: 'ocean', category: 'ocean' },
  { id: 'coral-reef-cake',        name: 'Coral Reef Cake',           ingredients: ['coral-sugar', 'sand-cookie', 'ocean-jelly', 'cream'],           points: 200, timeLimit: 50, theme: 'ocean', category: 'ocean' },
];
