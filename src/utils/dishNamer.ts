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
  "Café's Mystery Plate",
  "An Unconventional Choice",
  "The Bold Misadventure",
  "Even The Chef Is Confused",
];

let dubiousIdx = 0;

function isDubious(ids: string[]): boolean {
  const hasSavory       = ids.some(id => SAVORY_INGREDIENTS.has(id));
  const hasSweetOrDrink = ids.some(id => SWEET_OR_DRINK.has(id));
  if (hasSavory && hasSweetOrDrink) return true;
  // cheese + fruit + floral → weird
  const set = new Set(ids);
  if (set.has('cheese') && set.has('fruit') && ids.some(id => FLORALS.has(id))) return true;
  return false;
}

function getDubiousName(usedNames?: Set<string>): string {
  for (let i = 0; i < DUBIOUS_NAMES.length; i++) {
    const candidate = DUBIOUS_NAMES[(dubiousIdx + i) % DUBIOUS_NAMES.length];
    if (!usedNames?.has(candidate)) {
      dubiousIdx = (dubiousIdx + i + 1) % DUBIOUS_NAMES.length;
      return candidate;
    }
  }
  // All pool entries used — append #2
  const name = DUBIOUS_NAMES[dubiousIdx % DUBIOUS_NAMES.length] + ' #2';
  dubiousIdx = (dubiousIdx + 1) % DUBIOUS_NAMES.length;
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
]);

// Ingredient → semantic bucket for dominant-category fallback
type Bucket = 'protein' | 'starch' | 'sweet' | 'drink' | 'dairy' | 'veggie' | 'luxury';

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
};

const FALLBACK_NAMES: Record<Bucket | 'mixed', string[]> = {
  protein:  ['{adj} Protein Bowl', 'Chef\'s Meat Special', 'Savory Protein Plate'],
  starch:   ['{adj} Grain Bowl', 'Hearty Carb Medley', 'Warm Comfort Bowl'],
  sweet:    ['{adj} Sweet Treat', 'Dessert Surprise', 'Sugar Dream Plate'],
  drink:    ['Mystery Brew', 'Café Signature Blend', '{adj} Secret Potion'],
  dairy:    ['{adj} Creamy Delight', 'Rich Dairy Creation', 'Silky Smooth Treat'],
  veggie:   ['Garden Medley', 'Fresh Veggie Bowl', 'Seasonal Greens Plate'],
  luxury:   ['Imperial Creation', 'Golden Masterpiece', 'Royal Indulgence'],
  mixed:    ['{adj} Fusion Creation', 'Cat Café Mystery', 'Chef\'s Surprise Plate'],
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
  if (isDubious(ingredientIds)) return getDubiousName(usedNames);

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
