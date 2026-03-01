import { INGREDIENTS, RECIPES } from '../data/recipes';

// Deterministic adjectives — selected by hashing ingredient set so the same combo always gets the same name
const ADJECTIVES = ['Dreamy', 'Cozy', 'Secret', "Purr-fect", 'Golden', 'Classic', 'Fancy', 'Special', "Meow's Own", 'Mystery'];

function deterministicAdj(ingredients: string[]): string {
  const hash = ingredients.slice().sort().join('').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ADJECTIVES[hash % ADJECTIVES.length];
}

// --- Dubious combo detection ---

// Savory ingredients — meats, vegetables, savory condiments
const SAVORY_INGREDIENTS = new Set([
  'fish', 'chicken', 'shrimp', 'patty', 'pepperoni',  // meats
  'nori', 'vegetables',                                 // vegetables
  'miso', 'sauce',                                      // savory sauces
]);

// Sweet and drink ingredients — anything from the sweet or drink bucket
const SWEET_OR_DRINK = new Set([
  'matcha', 'red-bean', 'honey', 'fruit', 'lychee', 'coconut',
  'sakura', 'white-chocolate', 'lavender', 'dark-chocolate', 'mint',
  'tapioca', 'tea', 'brown-sugar', 'cola', 'chamomile',
]);

const FLORALS = new Set(['lavender', 'chamomile', 'sakura']);

// Pure sunset/mocktail ingredients (not already in SWEET_OR_DRINK)
const SUNSET_ONLY = new Set([
  'passionfruit', 'mango', 'grenadine', 'pineapple', 'ginger', 'lime',
  'watermelon', 'dragon-fruit', 'rose-syrup', 'hibiscus', 'crushed-ice',
  'boba', 'agave', 'butterfly-pea', 'soda-water', 'espresso',
]);

const DUBIOUS_NAMES = [
  "A Questionable Creation",
  "Chef's Regrettable Experiment",
  "The Lab Accident",
  "Whiskers' Worst Nightmare",
  "Don't Ask What's In It",
  "A Brave Culinary Risk",
  "Something Went Wrong",
  "Hmm… That's Unusual",
  "An Acquired Taste",
  "The Suspicious Special",
  "What Did We Make?",
  "Caf\u00e9's Mystery Plate",
  "An Unconventional Choice",
  "The Bold Misadventure",
  "Even The Chef Is Confused",
];

const DUBIOUS_MOCKTAIL_NAMES = [
  "A Cocktail Crime",
  "Fish Juice... On Purpose?",
  "The Bartender Is Crying",
  "Surf & Slurp Surprise",
  "Tropical Disaster",
  "Why Is There Meat In My Drink?",
  "That's Not How You Make A Mocktail",
  "An Unfortunate Pour",
  "The Health Inspector Would Like A Word",
  "Savory Sunset Mistake",
];

let dubiousIdx = 0;
let dubiousMocktailIdx = 0;

type DubiousType = false | 'general' | 'mocktail';

function isDubious(ids: string[]): DubiousType {
  const hasSavory       = ids.some(id => SAVORY_INGREDIENTS.has(id));
  const hasSunset       = ids.some(id => SUNSET_ONLY.has(id));
  const hasSweetOrDrink = ids.some(id => SWEET_OR_DRINK.has(id));
  // Savory + sunset mocktail ingredients = cocktail crime
  if (hasSavory && hasSunset) return 'mocktail';
  if (hasSavory && hasSweetOrDrink) return 'general';
  // cheese + fruit + floral → weird
  const set = new Set(ids);
  if (set.has('cheese') && set.has('fruit') && ids.some(id => FLORALS.has(id))) return 'general';
  return false;
}

function getDubiousName(type: 'general' | 'mocktail', usedNames?: Set<string>): string {
  const pool = type === 'mocktail' ? DUBIOUS_MOCKTAIL_NAMES : DUBIOUS_NAMES;
  const idx = type === 'mocktail' ? dubiousMocktailIdx : dubiousIdx;
  for (let i = 0; i < pool.length; i++) {
    const candidate = pool[(idx + i) % pool.length];
    if (!usedNames?.has(candidate)) {
      if (type === 'mocktail') dubiousMocktailIdx = (idx + i + 1) % pool.length;
      else dubiousIdx = (idx + i + 1) % pool.length;
      return candidate;
    }
  }
  // All pool entries used — append #2
  const name = pool[idx % pool.length] + ' #2';
  if (type === 'mocktail') dubiousMocktailIdx = (idx + 1) % pool.length;
  else dubiousIdx = (idx + 1) % pool.length;
  return name;
}

// Signature pair table — sorted ingredient IDs joined by '|' → dish name template
// {adj} is replaced with the deterministic adjective
const SIGNATURE_PAIRS = new Map<string, string>([
  // Dairy + sweet
  ['cheese|cream',             '{adj} Cheesecake'],
  ['cream|white-chocolate',    'White Choc Cream Puff'],
  ['cream|dark-chocolate',     'Chocolate Mousse'],
  ['cream|fruit',              'Fruit & Cream Delight'],
  ['cream|honey',              'Honey Cream Sweet'],
  ['cream|matcha',             'Matcha Cream Latte'],
  ['cream|lavender',           'Lavender Cream Dream'],
  ['cream|red-bean',           'Red Bean Cream Mochi'],
  ['cream|lychee',             'Lychee Cream Parfait'],
  ['cream|coconut',            'Coconut Cream Treat'],
  // Japanese sweets
  ['matcha|mochi-flour',       'Matcha Mochi'],
  ['red-bean|mochi-flour',     'Red Bean Mochi'],
  ['coconut|mochi-flour',      'Coconut Mochi'],
  ['lychee|mochi-flour',       'Lychee Mochi'],
  ['mochi-flour|sakura',       'Sakura Mochi'],
  ['matcha|fruit',             'Matcha Fruit Parfait'],
  ['dark-chocolate|honey',     'Chocolate Honey Drizzle'],
  ['white-chocolate|sakura',   'Sakura White Choc Cake'],
  ['lavender|honey',           'Lavender Honey Sweet'],
  ['honey|sakura',             'Cherry Blossom Sweet'],
  ['fruit|sakura',             'Spring Blossom Treat'],
  // Drinks — boba / tea
  ['tapioca|tea',              'Bubble Tea'],
  ['brown-sugar|tapioca',      'Brown Sugar Boba'],
  ['lychee|tea',               'Lychee Tea'],
  ['mint|tea',                 'Mint Tea'],
  ['honey|tea',                'Honey Tea'],
  ['sakura|tea',               'Sakura Tea'],
  ['chamomile|tea',            'Chamomile Blend'],
  ['lavender|tea',             'Lavender Tea'],
  ['coconut|tea',              'Coconut Tea'],
  ['dark-chocolate|tea',       'Dark Choc Tea Fusion'],
  ['matcha|tea',               'Double Matcha Blend'],
  ['fruit|tea',                'Fruit Tea'],
  // Matcha drinks
  ['cream|matcha',             'Matcha Latte'],
  ['honey|matcha',             'Honey Matcha'],
  // Luxury
  ['gold-leaf|tea',            'Golden Elixir'],
  ['gold-leaf|honey',          'Imperial Honey Brew'],
  ['gold-leaf|matcha',         'Royal Matcha'],
  ['gold-leaf|lychee',         'Celestial Lychee Potion'],
  ['truffle|noodles',          'Truffle Noodle Broth'],
  ['truffle|rice',             'Truffle Rice Bowl'],
  ['truffle|egg',              'Truffle Egg Delicacy'],
  // Grain + protein
  ['fish|rice',                '{adj} Fish Bowl'],
  ['chicken|rice',             '{adj} Chicken Bowl'],
  ['egg|rice',                 'Egg Fried Rice'],
  ['rice|tofu',                'Tofu Rice Bowl'],
  ['rice|shrimp',              'Shrimp Rice Bowl'],
  ['rice|vegetables',          'Veggie Rice Bowl'],
  ['noodles|egg',              'Egg Noodle Soup'],
  ['miso|noodles',             'Miso Noodle Broth'],
  ['noodles|shrimp',           'Shrimp Noodle Soup'],
  ['chicken|noodles',          '{adj} Chicken Ramen'],
  // Sushi-ish
  ['fish|nori',                'Fish & Nori Roll'],
  ['nori|rice',                'Rice Nori Wrap'],
  ['egg|nori',                 'Tamago Roll'],
  // Tofu & soup
  ['miso|tofu',                'Miso Tofu Soup'],
  ['tofu|vegetables',          'Tofu Veggie Bowl'],
  // Burgers / Diner
  ['bun|patty',                '{adj} Burger'],
  ['bun|chicken',              'Chicken Sandwich'],
  ['cheese|patty',             'Cheeseburger'],
  ['cheese|pizza-dough',       'Cheese Pizza'],
  ['pepperoni|pizza-dough',    '{adj} Pepperoni Pizza'],
  // Sides / drinks diner
  ['cheese|fries',             'Cheese Fries'],
  ['fries|sauce',              'Loaded Fries'],
  ['cola|cream',               'Cream Soda Float'],
  ['cola|fruit',               'Fruit Soda'],
  // Mocktail / Sunset pairs
  ['grenadine|mango',          'Sunset Spritz'],
  ['lime|mint',                'Meow-jito'],
  ['mango|pineapple',          'Tropical Purrfection'],
  ['coconut|pineapple',        'Calico Colada'],
  ['dragon-fruit|rose-syrup',  'Dragon Kiss'],
  ['hibiscus|lime',            'Hibiscus Whisker Sour'],
  ['agave|ginger',             'Ginger Smash'],
  ['espresso|honey',           'Espresso Purr-tini'],
  ['crushed-ice|watermelon',   'Watermelon Slushie'],
  ['butterfly-pea|soda-water', 'Mystic Blue Fizz'],
  ['lychee|passionfruit',      'Tropical Bliss'],
  ['grenadine|soda-water',     'Shirley Whiskers'],
  ['boba|mango',               'Mango Boba Shake'],
  ['agave|lime',               'Agave Lime Cooler'],
  ['coconut|mango',            'Mango Coconut Dream'],
  ['ginger|lime',              'Ginger-Lime Zing'],
  ['hibiscus|sakura',          'Blossom Sunset'],
  ['crushed-ice|espresso',     'Iced Espresso'],
  ['lavender|lychee',          'Lavender Lychee Fizz'],
  ['passionfruit|pineapple',   '{adj} Punch'],
]);

// Ingredient → semantic bucket for dominant-category fallback
type Bucket = 'protein' | 'starch' | 'sweet' | 'drink' | 'dairy' | 'veggie' | 'luxury' | 'mocktail';

const INGREDIENT_BUCKETS: Record<string, Bucket> = {
  fish: 'protein', chicken: 'protein', shrimp: 'protein', egg: 'protein',
  patty: 'protein', tofu: 'protein', pepperoni: 'protein',
  rice: 'starch', noodles: 'starch', 'mochi-flour': 'starch', bun: 'starch',
  'pizza-dough': 'starch', fries: 'starch',
  vegetables: 'veggie', nori: 'veggie', miso: 'veggie', sauce: 'veggie',
  cream: 'dairy', cheese: 'dairy',
  matcha: 'sweet', 'red-bean': 'sweet', honey: 'sweet', fruit: 'sweet',
  lychee: 'sweet', coconut: 'sweet', sakura: 'sweet', 'white-chocolate': 'sweet',
  lavender: 'sweet', 'dark-chocolate': 'sweet', mint: 'sweet',
  tapioca: 'drink', tea: 'drink', 'brown-sugar': 'drink', cola: 'drink', chamomile: 'drink',
  'gold-leaf': 'luxury', truffle: 'luxury',
  // Sunset / Mocktail ingredients
  passionfruit: 'mocktail', mango: 'mocktail', grenadine: 'mocktail',
  pineapple: 'mocktail', ginger: 'mocktail', lime: 'mocktail',
  watermelon: 'mocktail', 'dragon-fruit': 'mocktail', 'rose-syrup': 'mocktail',
  hibiscus: 'mocktail', 'crushed-ice': 'mocktail', boba: 'mocktail',
  agave: 'mocktail', 'butterfly-pea': 'mocktail', 'soda-water': 'mocktail',
  espresso: 'mocktail',
};

const FALLBACK_NAMES: Record<Bucket | 'mixed', string[]> = {
  protein:  ['{adj} Protein Bowl', 'Chef\'s Meat Special', 'Savory Protein Plate'],
  starch:   ['{adj} Grain Bowl', 'Hearty Carb Medley', 'Warm Comfort Bowl'],
  sweet:    ['{adj} Sweet Treat', 'Dessert Surprise', 'Sugar Dream Plate'],
  drink:    ['Mystery Brew', 'Café Signature Blend', '{adj} Secret Potion'],
  dairy:    ['{adj} Creamy Delight', 'Rich Dairy Creation', 'Silky Smooth Treat'],
  veggie:   ['Garden Medley', 'Fresh Veggie Bowl', 'Seasonal Greens Plate'],
  luxury:   ['Imperial Creation', 'Golden Masterpiece', 'Royal Indulgence'],
  mocktail: ['{adj} Mocktail', 'Sunset Sipper', 'Tropical Mystery Drink', '{adj} Fizzy Creation'],
  mixed:    ['{adj} Fusion Creation', 'Cat Caf\u00e9 Mystery', 'Chef\'s Surprise Plate'],
};

function buildPairKey(a: string, b: string): string {
  return [a, b].sort().join('|');
}

function pickFallback(bucket: Bucket | 'mixed', ingredients: string[]): string {
  const options = FALLBACK_NAMES[bucket];
  const hash = ingredients.slice().sort().join('').split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const template = options[hash % options.length];
  return template.replace('{adj}', deterministicAdj(ingredients));
}

export function nameDish(ingredientIds: string[], usedNames?: Set<string>): string {
  if (ingredientIds.length === 0) return 'Empty Plate';

  if (ingredientIds.length === 1) {
    const ingredient = INGREDIENTS.find(i => i.id === ingredientIds[0]);
    return `${ingredient?.name ?? ingredientIds[0]} Surprise`;
  }

  // 1. Exact recipe match
  const sortedInput = ingredientIds.slice().sort();
  const exactMatch = RECIPES.find(r => {
    if (r.ingredients.length !== ingredientIds.length) return false;
    return r.ingredients.slice().sort().join(',') === sortedInput.join(',');
  });
  if (exactMatch) return exactMatch.name;

  // 2. Dubious combo detection — incompatible ingredient categories
  const dubious = isDubious(ingredientIds);
  if (dubious) return getDubiousName(dubious, usedNames);

  // Compute dominant bucket for category-gating of pair lookup
  const bucketCounts: Partial<Record<Bucket, number>> = {};
  for (const id of ingredientIds) {
    const b = INGREDIENT_BUCKETS[id];
    if (b) bucketCounts[b] = (bucketCounts[b] ?? 0) + 1;
  }
  const dominant: Bucket | 'mixed' = Object.keys(bucketCounts).length === 0
    ? 'mixed'
    : (Object.entries(bucketCounts) as [Bucket, number][]).sort((a, b) => b[1] - a[1])[0][0];

  // 3. Signature pair lookup — category-gated so cross-category pairs don't mismatch
  const sorted = ingredientIds.slice().sort();
  for (let i = 0; i < sorted.length - 1; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const key = buildPairKey(sorted[i], sorted[j]);
      if (SIGNATURE_PAIRS.has(key)) {
        const bucketA = INGREDIENT_BUCKETS[sorted[i]];
        const bucketB = INGREDIENT_BUCKETS[sorted[j]];
        // Skip if neither ingredient in the pair belongs to the dominant category
        if (dominant !== 'mixed' && bucketA !== dominant && bucketB !== dominant) continue;

        const template = SIGNATURE_PAIRS.get(key)!;
        const baseName = template.replace('{adj}', deterministicAdj(ingredientIds));
        const used = new Set([sorted[i], sorted[j]]);
        const extras = ingredientIds
          .filter(id => !used.has(id))
          .map(id => INGREDIENTS.find(i => i.id === id)?.name ?? id);
        let result = extras.length > 0 ? `${baseName} with ${extras.join(' & ')}` : baseName;
        if (usedNames?.has(result)) result = result + ' #2';
        return result;
      }
    }
  }

  // 4. Category-dominant fallback
  let result = pickFallback(dominant, ingredientIds);
  if (usedNames?.has(result)) result = result + ' #2';
  return result;
}
