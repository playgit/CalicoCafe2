# CLAUDE.md - Calico Café Game

## Project Overview

**Calico Café** is a time-management cooking game built with React and TypeScript. Players run a cat-themed café, fulfilling orders from various cat customers by combining ingredients to create dishes, drinks, and desserts. The game features a scoring system, VIP customers, special characters with unique requirements, and a shop system for unlockables.

### Key Game Mechanics
- **3-minute timed gameplay** with order management (max 3 concurrent orders)
- **Points-based scoring** with penalties for wrong/missed orders
- **VIP customers** that offer double points but tighter time limits
- **Special customers** with unique ingredient requirements
- **Currency system** (coins) earned based on score for shop purchases
- **LocalStorage persistence** for high scores, coins, and unlocked items

---

## Tech Stack

### Core Technologies
- **React 18.3.1** - UI framework
- **TypeScript 5.5.3** - Type safety
- **Vite 5.4.2** - Build tool and dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.344.0** - Icon library

### Development Tools
- **ESLint 9.9.1** - Code linting (TypeScript + React rules)
- **PostCSS 8.4.35** - CSS processing
- **Autoprefixer 10.4.18** - CSS vendor prefixing

---

## Directory Structure

```
CalicoCafe2/
├── src/
│   ├── components/        # React components
│   │   ├── HomeScreen.tsx    # Main menu/landing screen
│   │   ├── Kitchen.tsx       # Ingredient selection & cooking
│   │   ├── Order.tsx         # Individual order display
│   │   ├── ScoreBoard.tsx    # Score & high score display
│   │   ├── Shop.tsx          # In-game shop for unlockables
│   │   └── Timer.tsx         # Game countdown timer
│   ├── data/             # Static game data
│   │   ├── customers.ts      # Cat customer definitions
│   │   ├── recipes.ts        # Recipe & ingredient definitions
│   │   └── shop.ts           # Shop item definitions
│   ├── types/            # TypeScript type definitions
│   │   └── game.ts           # Core game types
│   ├── utils/            # Utility functions
│   │   └── feedback.ts       # User feedback message generation
│   ├── App.tsx           # Root component & game state management
│   ├── main.tsx          # React entry point
│   └── index.css         # Global styles (Tailwind imports)
├── .bolt/                # StackBlitz configuration
├── public/               # Static assets (if any)
├── index.html            # HTML entry point
├── package.json          # Dependencies & scripts
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind customization
├── tsconfig.json         # TypeScript configuration
└── eslint.config.js      # ESLint rules
```

---

## Key Files and Their Responsibilities

### `/src/App.tsx` (Main Game Controller)
**Central game state manager** - Handles all game logic, state, and coordination between components.

**State Management:**
- `score`, `highScore` - Scoring system
- `timeLeft` - Game timer (180 seconds)
- `orders` - Active customer orders (max 3)
- `gameOver`, `firstOrderCompleted` - Game flow states
- `coins`, `unlockedItems` - Shop system data
- `showHome`, `showAbout`, `showShop` - Screen navigation

**Key Functions:**
- `handleOrderComplete()` - Process successful orders (+points, VIP 2x multiplier)
- `handleWrongOrder()` - Apply penalties (-points, -5s time)
- `handleGameOver()` - Calculate coin rewards, update high score
- `startNewGame()` - Reset game state
- Order generation logic (every 4s after first order completed)

**Important Patterns:**
- LocalStorage for persistence (high score, coins, unlocked items)
- Two main timers: game countdown (1s interval) + order generation (4s interval)
- Order timeout handling with penalties (-50 regular, -100 VIP)

---

### `/src/components/Kitchen.tsx` (Core Gameplay)
**The primary interaction component** where players select ingredients and cook orders.

**Features:**
- Dynamic ingredient limits (4 regular, 6 with VIP orders present)
- Special customer logic:
  - **Inspector Pawsworth**: Only accepts drinks/desserts (200 pts)
  - **Neko**: Requires 2-4 pink/white/red ingredients (150 pts)
  - **Emperor Meowximilian**: Accepts golden elixirs (ultra-VIP)
- Recipe matching algorithm (exact ingredient match)
- Wrong order penalty calculation (min 50, or 10pts per ingredient)

**AI Development Notes:**
- When adding new special customers, extend the conditional logic in `handleCook()`
- Ingredient validation is handled via arrays (see `NEKO_ALLOWED_INGREDIENTS`)
- Consider feedback timing (3s timeout for messages)

---

### `/src/types/game.ts` (Type Definitions)
**Core TypeScript interfaces** - Always reference these when adding features.

```typescript
interface Recipe {
  id: string;
  name: string;
  ingredients: string[];  // References INGREDIENTS.id
  points: number;
  timeLimit: number;      // In seconds
  vipOnly?: boolean;      // Accessible only to VIP customers
}

interface CatCustomer {
  id: string;
  name: string;
  image: string;          // Unsplash URLs
  personality: string;
  color: string;          // Tailwind bg- class
  isVIP?: boolean;        // Doubles points, tighter time limits
  isSpecial?: boolean;    // Has custom requirements
  description?: string;   // Displayed in UI
}

interface Order {
  id: string;             // Random generated
  recipe: Recipe;
  timeLeft: number;       // Decrements each second
  completed: boolean;
  customer: CatCustomer;
  isVIP?: boolean;        // For quick checks
}
```

---

### `/src/data/recipes.ts` (Game Content)
**~45 recipes** across categories:
- **Regular Dishes**: Sushi rolls, ramen, rice bowls (80-170 pts)
- **Desserts**: Mochi, parfaits (150-180 pts)
- **Drinks**: Boba tea, matcha latte, fruit tea (120-140 pts)
- **VIP Recipes**: Truffle dishes (250-320 pts, `vipOnly: true`)
- **Ultra VIP**: Golden drinks (1000 pts, Emperor exclusive)

**~30 ingredients** with Tailwind color classes for visual representation.

**Naming Convention:**
- Recipe IDs: lowercase-with-hyphens (e.g., `'truffle-sushi'`)
- Ingredient IDs: lowercase-with-hyphens (e.g., `'gold-leaf'`)

---

### `/src/data/customers.ts` (Character Definitions)
**12 unique cat customers** with distinct personalities:

**Regular Customers:**
- Whiskers, Mittens, Socks, Luna, Mochi, Nori, Ginger, Shadow

**Special Customers:**
- **Duchess** (VIP): Double points, 80% time limit
- **Inspector Pawsworth**: Only drinks/desserts
- **Emperor Meowximilian**: Only golden ultra-VIP drinks
- **Neko**: Only 2-4 pink/white/red ingredients

**Image Sources:** All use Unsplash with auto-format & crop (92x92px)

---

## Development Workflows

### Running the Project

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Adding New Features

#### Adding a New Recipe
1. Open `/src/data/recipes.ts`
2. Add ingredient(s) to `INGREDIENTS` array if needed
3. Add recipe to `RECIPES` array:
   ```typescript
   {
     id: 'unique-id',
     name: 'Display Name',
     ingredients: ['ingredient-id-1', 'ingredient-id-2'],
     points: 150,
     timeLimit: 40,
     vipOnly: false  // Optional
   }
   ```
4. Test in-game by selecting the ingredient combination

#### Adding a New Customer
1. Open `/src/data/customers.ts`
2. Add to `CAT_CUSTOMERS` array:
   ```typescript
   {
     id: 'unique-id',
     name: 'Customer Name',
     image: 'https://images.unsplash.com/...',  // Cat photo
     personality: 'Personality trait',
     color: 'bg-color-100',  // Tailwind class
     isVIP: false,  // Optional
     isSpecial: false,  // Optional - requires custom logic
     description: 'Optional flavor text'
   }
   ```
3. If `isSpecial: true`, add handling logic in `/src/components/Kitchen.tsx` `handleCook()`

#### Adding a New Component
1. Create file in `/src/components/ComponentName.tsx`
2. Follow existing patterns:
   ```typescript
   import React from 'react';
   import { Icon } from 'lucide-react';

   interface ComponentNameProps {
     // Props with TypeScript types
   }

   export default function ComponentName({ props }: ComponentNameProps) {
     return (
       <div className="bg-white rounded-xl shadow-md p-4">
         {/* Tailwind-styled content */}
       </div>
     );
   }
   ```
3. Import in parent component (usually `App.tsx`)

---

## Coding Conventions

### TypeScript
- **Strict typing** - Avoid `any`, use interfaces from `/src/types/game.ts`
- **Explicit return types** for non-trivial functions
- **Prop interfaces** for all components (suffix with `Props`)
- **Optional chaining** for potentially undefined values (`order?.customer`)

### React Patterns
- **Functional components** with hooks (no class components)
- **State colocation** - Keep state in `App.tsx` for game-wide, in components for local UI
- **Effect cleanup** - Always return cleanup functions for intervals/timers:
  ```typescript
  useEffect(() => {
    const timer = setInterval(() => { /* ... */ }, 1000);
    return () => clearInterval(timer);
  }, [dependencies]);
  ```

### Styling (Tailwind CSS)
- **Utility-first** - Compose styles with Tailwind classes
- **Color scheme**: Orange/amber primary (`orange-600`, `amber-50`), white cards
- **Responsive**: Use `lg:` prefix for large screens (e.g., `lg:col-span-2`)
- **Animations**: Available in `tailwind.config.js` (`spin-slow`, `bounce-slow`)
- **Consistent spacing**: Use 4/6/8 units for padding/gaps (`p-4`, `gap-6`)

### File Organization
- **One component per file** (default exports)
- **Named exports for data** (`RECIPES`, `INGREDIENTS`, `CAT_CUSTOMERS`)
- **Group imports**: React → External libs → Internal components → Data → Types

### Naming Conventions
- **Components**: PascalCase (`Kitchen.tsx`, `ScoreBoard.tsx`)
- **Functions**: camelCase (`handleOrderComplete`, `startNewGame`)
- **Constants**: UPPER_SNAKE_CASE (`RECIPES`, `CAT_CUSTOMERS`)
- **Types/Interfaces**: PascalCase (`Recipe`, `CatCustomer`, `Order`)
- **CSS Classes**: Tailwind utilities (no custom classes unless necessary)

---

## State Management Patterns

### LocalStorage Usage
The app persists three values:
```typescript
// Read on mount
const [highScore, setHighScore] = useState(() => {
  const saved = localStorage.getItem('highScore');
  return saved ? parseInt(saved, 10) : 0;
});

// Write on change
useEffect(() => {
  localStorage.setItem('highScore', highScore.toString());
}, [highScore]);
```

**Stored Keys:**
- `'highScore'` - Integer
- `'coins'` - Integer
- `'unlockedItems'` - JSON array of strings

### Timer Management
Two separate intervals run during gameplay:

1. **Game Timer** (1s interval):
   - Decrements `timeLeft`
   - Decrements all `orders[].timeLeft`
   - Handles order timeouts
   - Triggers game over at 0

2. **Order Generation** (4s interval):
   - Only starts after `firstOrderCompleted === true`
   - Stops if `orders.length >= 3`
   - Filters busy customers from pool
   - Applies customer-specific recipe filters

---

## Testing Considerations

### Manual Testing Checklist
When making changes, test these scenarios:

**Basic Gameplay:**
- [ ] Orders generate correctly after first completion
- [ ] Correct recipes award proper points
- [ ] Wrong recipes apply penalties
- [ ] Timer reaches 0 and triggers game over
- [ ] High score updates when beaten
- [ ] Coins awarded based on final score

**VIP Customers (Duchess, Emperor):**
- [ ] VIP orders double points when completed
- [ ] VIP orders have 80% time limit
- [ ] VIP presence increases max ingredients to 6
- [ ] Emperor only orders golden drinks (👑 emoji in name)

**Special Customers:**
- [ ] Inspector Pawsworth only accepts drinks/desserts
- [ ] Neko validates pink/white/red ingredients
- [ ] Special customers show descriptions
- [ ] Wrong submissions to special customers apply penalties

**Edge Cases:**
- [ ] Multiple orders timing out simultaneously
- [ ] Clearing ingredients works correctly
- [ ] Shop purchases deduct coins properly
- [ ] Unlocked items persist across sessions
- [ ] Game state resets properly on new game

---

## Common Pitfalls & Solutions

### Issue: Orders not generating
**Cause:** `firstOrderCompleted` is still `false`
**Solution:** Complete (or timeout) the first order to trigger the generation interval

### Issue: VIP customer not appearing
**Cause:** Random selection from customer pool
**Solution:** VIP customers (Duchess, Emperor) have same spawn chance as regulars. Filter logic in `App.tsx:57-79` determines available customers.

### Issue: Recipe not matching in Kitchen
**Cause:** Ingredient order matters for array comparison
**Solution:** Current implementation checks if all recipe ingredients exist in selected ingredients (order-independent). Ensure `recipe.ingredients.every(ing => selectedIngredients.includes(ing))` logic is preserved.

### Issue: Timer desyncs between orders
**Cause:** Multiple intervals updating state
**Solution:** Single interval in `App.tsx:126-152` updates both game timer and all order timers. Don't create separate intervals per order.

### Issue: LocalStorage data corruption
**Cause:** Invalid JSON parsing
**Solution:** Always use fallback values:
```typescript
const saved = localStorage.getItem('unlockedItems');
return saved ? JSON.parse(saved) : [];  // Fallback to []
```

---

## Performance Considerations

### Current Optimizations
- Single shared timer interval (not per-order timers)
- Customer filtering done at generation time (not on every render)
- Feedback messages auto-clear after 3s (prevents memory leaks)

### Potential Improvements
- **React.memo()** - Memoize `Order` components (currently re-render on every timer tick)
- **useMemo()** - Cache filtered customer/recipe arrays
- **useCallback()** - Memoize event handlers passed to children
- **Code splitting** - Lazy load `Shop` and `HomeScreen` components

---

## External Dependencies

### Lucide React (Icons)
Used icons: `Cat`, `Coffee`, `Utensils`, `Trash2`, `Clock`, `Trophy`, `Coins`

**Usage Pattern:**
```typescript
import { IconName } from 'lucide-react';
<IconName className="w-5 h-5 text-orange-600" />
```

### Unsplash (Customer Images)
All customer images use Unsplash's dynamic API:
```
https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&w=92&h=92
```
- `auto=format` - Optimized format (WebP if supported)
- `fit=crop` - Center crop
- `w=92&h=92` - 92x92px dimensions

**Note:** No API key required for basic usage, but consider rate limits for production.

---

## AI Assistant Guidelines

### When Adding Features
1. **Always update types first** - Modify `/src/types/game.ts` before implementation
2. **Test with existing data** - Verify changes don't break current recipes/customers
3. **Consider persistence** - Will the feature need LocalStorage? Update `App.tsx` accordingly
4. **Maintain game balance** - Keep point values, time limits, and penalties balanced
5. **Preserve timer integrity** - Don't add new intervals; extend existing ones

### When Debugging
1. **Check React DevTools** - Inspect state in `App` component
2. **Console log orders** - `console.log(orders)` in `App.tsx` effects
3. **Verify LocalStorage** - Check browser DevTools → Application → LocalStorage
4. **Test special customers** - Ensure custom logic in `Kitchen.tsx` handles edge cases
5. **Validate recipe matching** - Log `selectedIngredients` vs `recipe.ingredients`

### When Refactoring
1. **Extract game logic to hooks** - Consider `useGameTimer`, `useOrderGeneration` custom hooks
2. **Create context for game state** - Reduce prop drilling from `App` to deeply nested components
3. **Separate business logic** - Move scoring calculations to `/src/utils/scoring.ts`
4. **Type safety first** - Never sacrifice type safety for convenience
5. **Test after every change** - The game has many interconnected states

### Code Review Checklist
- [ ] TypeScript types are explicit (no `any`)
- [ ] Effects have proper dependency arrays
- [ ] Timers/intervals are cleaned up
- [ ] LocalStorage reads have fallbacks
- [ ] Tailwind classes follow existing color scheme
- [ ] Component props are documented with interfaces
- [ ] No console.log statements in production code
- [ ] ESLint passes without errors/warnings

---

## Build and Deployment

### Production Build
```bash
npm run build
```
Output: `/dist` directory (git-ignored)

### Vite Configuration
See `/vite.config.ts`:
- React plugin enabled
- Standard Vite defaults (no custom config currently)

### Deployment Checklist
- [ ] Run `npm run lint` - Fix all errors
- [ ] Run `npm run build` - Verify successful build
- [ ] Test production build locally: `npm run preview`
- [ ] Ensure environment variables are set (none currently)
- [ ] Verify all assets load correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test responsive layouts (mobile, tablet, desktop)

### Recommended Hosting Platforms
- **Vercel** - Auto-detects Vite, zero config
- **Netlify** - Drag-and-drop `/dist` folder
- **GitHub Pages** - Add `base: '/repo-name/'` to `vite.config.ts`
- **StackBlitz** - Already configured (see README.md)

---

## Future Enhancement Ideas

### Gameplay
- **Power-ups**: Time freeze, auto-complete, ingredient multiplier
- **Difficulty levels**: Easy (4 min), Medium (3 min), Hard (2 min)
- **Achievements**: Unlock badges for milestones
- **Endless mode**: No timer, see how many orders you can complete
- **Daily challenges**: Special ingredient/customer restrictions

### Technical
- **Sound effects**: React Howler for audio (cooking, success, failure)
- **Animations**: Framer Motion for smoother transitions
- **Leaderboard**: Firebase for global high scores
- **Analytics**: Track player behavior, popular recipes
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

### Content
- **More recipes**: 100+ recipes across 10 categories
- **Seasonal ingredients**: Time-limited special items
- **Customer backstories**: Unlock lore through achievements
- **Cafe upgrades**: Visual theme changes from shop purchases
- **Mini-games**: Side activities for bonus coins

---

## Questions or Issues?

### For Developers
- Check ESLint output for code quality issues
- Review TypeScript errors in IDE
- Test game flow manually in dev mode

### For AI Assistants
- Reference this file before making changes
- Ask for clarification on game mechanics if unclear
- Propose changes that align with existing patterns
- Update this document when adding new conventions

---

**Last Updated:** 2025-11-18
**Version:** 1.0
**Maintainer:** AI-assisted development (Claude Code)
