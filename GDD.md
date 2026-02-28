# Calico Café — Game Design Document

> **Purpose:** Living reference for improving and extending the game. Each section links to the relevant source files so you can jump straight to the code.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Screen Flow & Navigation](#2-screen-flow--navigation)
3. [Game Loop](#3-game-loop)
4. [Timer System](#4-timer-system)
5. [Order System](#5-order-system)
6. [Ingredient Selection & Cooking](#6-ingredient-selection--cooking)
7. [Scoring & Coins](#7-scoring--coins)
8. [Customers](#8-customers)
9. [Recipes & Ingredients](#9-recipes--ingredients)
10. [Shop](#10-shop)
11. [Feedback System](#11-feedback-system)
12. [UI Layout Reference](#12-ui-layout-reference)
13. [Known Gaps & Improvement Targets](#13-known-gaps--improvement-targets)

---

## 1. Overview

**Genre:** Casual time-management / café simulation
**Platform:** Browser SPA (React 18 + TypeScript + Vite + Tailwind CSS)
**Backend:** None — all state is in-memory; persistence via `localStorage`
**Session length:** 3 minutes per game

### Core Loop
```
Start game → Orders appear → Select ingredients → Cook → Earn points
         ↑_______________________________________________|
                        (repeat until timer hits 0)
```

### localStorage Keys
| Key | Type | Purpose |
|-----|------|---------|
| `highScore` | number | Best score ever achieved |
| `coins` | number | Accumulated currency for Shop |
| `unlockedItems` | JSON string (string[]) | IDs of purchased Shop items |

**Source files:**
- [src/App.tsx](src/App.tsx) — all game state & logic
- [src/types/game.ts](src/types/game.ts) — TypeScript interfaces
- [src/data/](src/data/) — static game data

---

## 2. Screen Flow & Navigation

```
                    ┌──────────────┐
                    │  Home Screen │  (HomeScreen.tsx)
                    └──────┬───────┘
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         [Play]        [Shop]      [How to Play]
              │            │            │
              ▼            ▼            ▼
        Gameplay      Shop Screen   About Screen
        (App.tsx)    (Shop.tsx)   (HomeScreen.tsx)
              │
              ▼
        Game Over overlay
        (inline in App.tsx)
              │
        ┌─────┴──────┐
        ▼            ▼
   Play Again     Quit → Home
```

### Routing State (all in `App.tsx`)
| Variable | Type | Controls |
|----------|------|---------|
| `showHome` | boolean | Home / gameplay visibility |
| `showAbout` | boolean | About panel inside HomeScreen |
| `showShop` | boolean | Shop panel |
| `gameOver` | boolean | Game-over overlay |

Screens are shown by conditional rendering — there is no router library.

**Source files:**
- [src/App.tsx](src/App.tsx) — routing state + callbacks
- [src/components/HomeScreen.tsx](src/components/HomeScreen.tsx) — Home + About
- [src/components/Shop.tsx](src/components/Shop.tsx) — Shop

---

## 3. Game Loop

### Timeline
```
game start
  │
  ├─ timeLeft = 180 s
  ├─ score = 0, orders = []
  ├─ Generate FIRST order immediately
  └─ Start main 1-second tick interval
         │
         │ (player completes first order)
         ▼
  Start 4-second order-generation interval
         │
         ├── Every 1 s → decrement timeLeft + all order timers
         ├── Every 4 s → generate new order if < 3 active
         └── On order timeout → remove order, apply penalty
         │
         ▼  (timeLeft = 0)
  Game Over → calculate coins → show overlay
```

### Play Again Reset
All state returns to initial values: `score=0`, `timeLeft=180`, `orders=[]`, `gameOver=false`, `firstOrderCompleted=false`.

**Source files:**
- [src/App.tsx](src/App.tsx) — `useEffect` with `setInterval` for main tick and order generation

---

## 4. Timer System

### Main Game Timer
- **Starting value:** 180 seconds (3 minutes)
- **Tick:** −1 s every 1 000 ms via `setInterval`
- **End condition:** `timeLeft <= 0` → sets `gameOver = true`

### Per-Order Timers
Each order carries its own `timeLeft` countdown derived from the recipe:

| Customer type | Formula | Example (recipe limit 40 s) |
|---------------|---------|----------------------------|
| Regular | `recipe.timeLimit` | 40 s |
| VIP | `Math.floor(recipe.timeLimit * 0.8)` | 32 s |

When an order timer hits 0 the order is removed and a penalty is applied (see §7).

### Timer Penalties
| Event | Main timer penalty |
|-------|--------------------|
| Wrong cook | −5 seconds |

**Source files:**
- [src/App.tsx](src/App.tsx) — main timer `useEffect`, order-timer decrement, penalty application
- [src/types/game.ts](src/types/game.ts) — `Order.timeLeft` field
- [src/data/recipes.ts](src/data/recipes.ts) — `Recipe.timeLimit` values

---

## 5. Order System

### Capacity & Generation
- **Max simultaneous orders:** 3
- **First order:** Generated immediately on game start
- **Subsequent orders:** Generated every **4 seconds** — but only after the first order is completed (`firstOrderCompleted = true`)
- **Customer uniqueness:** A customer can have at most 1 active order at a time

### Order Object (`Order` interface)
```ts
interface Order {
  id: string           // unique order ID
  customer: CatCustomer
  recipe: Recipe
  timeLeft: number     // countdown in seconds
  isVIP: boolean       // drives 2× point multiplier
}
```

### Order Expiry
When `order.timeLeft <= 0`:
1. Order is removed from the active queue
2. Score penalty applied (see §7)

**Source files:**
- [src/App.tsx](src/App.tsx) — order generation logic, timeout handling
- [src/types/game.ts](src/types/game.ts) — `Order`, `Recipe`, `CatCustomer` interfaces
- [src/data/customers.ts](src/data/customers.ts) — customer pool for generation
- [src/data/recipes.ts](src/data/recipes.ts) — recipe pool

---

## 6. Ingredient Selection & Cooking

**Source files:**
- [src/components/Kitchen.tsx](src/components/Kitchen.tsx) — all selection + matching logic

### Ingredient Selection UI
- 26 ingredients displayed in a **2-column grid**
- Each ingredient is a button with a color-coded background
- Clicking adds the ingredient to `selectedIngredients: string[]`
- Buttons become disabled (opacity-50, cursor-not-allowed) when the cap is reached
- A **trash icon** button appears when any ingredient is selected, clearing the array

### Ingredient Cap
| Condition | Max ingredients |
|-----------|----------------|
| No VIP order active | 4 |
| Any VIP order active | 6 |

### Cooking (handleCook) — Priority Order
When the player presses **Cook**, the function checks in this order:

1. **Inspector Pawsworth** order active?
   - Valid if selected ingredients exactly match any recipe whose name contains `"Tea"`, `"Latte"`, `"Mochi"`, or `"Parfait"`
   - Awards **200 pts** fixed; otherwise penalty

2. **Neko** order active?
   - Valid if 2–4 ingredients, all from the allowed list (see §8)
   - Awards **150 pts** fixed; otherwise penalty

3. **Regular / VIP orders**
   - Searches `currentOrders` for a recipe whose ingredient set exactly matches `selectedIngredients` (order-independent, count-sensitive)
   - Awards `recipe.points` (×2 if `order.isVIP`); otherwise penalty

### Match Logic
```
match = selectedIngredients.length === recipe.ingredients.length
     && every selectedIngredient is in recipe.ingredients
```

---

## 7. Scoring & Coins

**Source files:**
- [src/App.tsx](src/App.tsx) — score state, penalty calls, coin calculation

### Points Earned
| Situation | Points |
|-----------|--------|
| Regular recipe match | `recipe.points` |
| VIP recipe match | `recipe.points × 2` |
| Inspector Pawsworth (valid drink/dessert) | 200 (fixed) |
| Neko (valid pink/white/red combo) | 150 (fixed) |
| Emperor Meowximilian golden drink | 1 000 (fixed, ×2 VIP = 2 000) |

Score is clamped: `Math.max(0, newScore)` — never goes negative.

### Penalties
| Event | Score penalty |
|-------|--------------|
| Wrong cook | `−min(50, selectedIngredients.length × 10)` |
| Order timeout — regular customer | −50 pts |
| Order timeout — VIP customer | −100 pts |
| Wrong cook | −5 s from **main timer** |

### Coin Rewards (awarded on game over)
| Final score | Coins earned |
|-------------|-------------|
| < 1 000 | 1 |
| ≥ 1 000 | 2 |
| ≥ 1 500 | 3 |
| ≥ 2 000 | 4 |

### High Score
Updated to `localStorage` whenever `currentScore > highScore`.

---

## 8. Customers

**Source files:**
- [src/data/customers.ts](src/data/customers.ts) — customer data
- [src/components/Kitchen.tsx](src/components/Kitchen.tsx) — cooking logic per customer
- [src/components/Order.tsx](src/components/Order.tsx) — card rendering per customer

### Customer Table

| ID | Name | Type | Color | VIP | Order Timer | Points | Special Rule |
|----|------|------|-------|-----|-------------|--------|-------------|
| whiskers | Whiskers | Regular | Orange | No | `timeLimit` | recipe pts | None |
| mittens | Mittens | Regular | Gray | No | `timeLimit` | recipe pts | None |
| socks | Socks | Regular | Yellow | No | `timeLimit` | recipe pts | None |
| luna | Luna | Regular | Purple | No | `timeLimit` | recipe pts | None |
| mochi | Mochi | Regular | Pink | No | `timeLimit` | recipe pts | None |
| nori | Nori | Regular | Green | No | `timeLimit` | recipe pts | None |
| ginger | Ginger | Regular | Amber | No | `timeLimit` | recipe pts | None |
| shadow | Shadow | Regular | Slate | No | `timeLimit` | recipe pts | None |
| duchess | Duchess | VIP | Indigo | Yes | `timeLimit × 0.8` | recipe pts ×2 | None beyond VIP |
| inspector | Inspector Pawsworth | Special | Blue | No | `timeLimit` | 200 fixed | Drinks & desserts only |
| emperor | Emperor Meowximilian | Special VIP | Gold | Yes | `timeLimit × 0.8` | 1 000 fixed (×2=2 000) | 5 golden drinks only |
| neko | Neko | Special | Pink | No | `timeLimit` | 150 fixed | Pink/white/red combos |

### Special Customer Details

**Inspector Pawsworth**
- Recipe must contain `"Tea"` or `"Latte"` (drinks) OR `"Mochi"` or `"Parfait"` (desserts) in its name
- Any valid drink/dessert combination awards 200 pts regardless of specific recipe
- Card UI: blue-50 background, 🧐 badge, Coffee + IceCream icons

**Emperor Meowximilian**
- Only accepts 5 specific golden drink recipes (see §9 Emperor Recipes)
- All contain the `gold-leaf` ingredient
- Is also VIP → timer ×0.8, points ×2 (2 000 total)
- Card UI: gold gradient background, crown icon

**Neko**
- Allowed ingredients: `shrimp`, `sauce`, `rice`, `tofu`, `red-bean`, `mochi-flour`, `cream`, `fruit`, `lychee`, `coconut`
- Requires 2–4 ingredients; all must be from the allowed list
- Card UI: pink-50 background, 💝 badge, Heart icon

---

## 9. Recipes & Ingredients

**Source files:**
- [src/data/recipes.ts](src/data/recipes.ts) — all recipe and ingredient data

### Ingredients (26 total)

| ID | Display Name | Color |
|----|-------------|-------|
| fish | Fish | orange |
| rice | Rice | yellow |
| nori | Nori | green |
| egg | Egg | yellow |
| sauce | Sauce | red |
| noodles | Noodles | yellow |
| tofu | Tofu | white/gray |
| chicken | Chicken | amber |
| vegetables | Vegetables | green |
| shrimp | Shrimp | pink |
| miso | Miso | amber |
| tea | Black Tea | brown |
| tapioca | Tapioca Pearls | gray |
| matcha | Matcha | green |
| mochi-flour | Mochi Flour | white |
| red-bean | Red Bean | red |
| cream | Cream | white |
| fruit | Fresh Fruit | pink/red |
| gold-leaf | Gold Leaf | yellow/gold |
| truffle | Black Truffle | gray |
| cheese | Cheese | yellow |
| brown-sugar | Brown Sugar | brown |
| lychee | Lychee | pink |
| coconut | Coconut | white |
| honey | Honey | amber |
| mint | Fresh Mint | green |

---

### Regular Dishes (20 recipes) — available to all regular customers

| Name | Ingredients | Points | Time (s) |
|------|------------|--------|----------|
| Classic Sushi Roll | fish, rice, nori | 90 | 25 |
| Spicy Tuna Roll | fish, rice, nori, sauce | 100 | 30 |
| California Roll | shrimp, rice, nori, vegetables | 110 | 30 |
| Vegetable Roll | vegetables, rice, nori | 80 | 25 |
| Cheese Sushi | cheese, rice, nori | 90 | 25 |
| Classic Ramen | noodles, miso, egg, vegetables | 140 | 35 |
| Miso Ramen | noodles, miso, tofu, vegetables | 150 | 40 |
| Shrimp Ramen | noodles, shrimp, egg, sauce | 160 | 40 |
| Vegetable Ramen | noodles, vegetables, tofu, miso | 130 | 35 |
| Classic Rice Bowl | rice, egg, sauce | 80 | 25 |
| Chicken Rice Bowl | rice, chicken, egg, sauce | 100 | 30 |
| Tofu Rice Bowl | rice, tofu, sauce, vegetables | 90 | 25 |
| Miso Soup | miso, tofu, nori | 120 | 35 |
| Seafood Miso Soup | miso, shrimp, fish, tofu | 140 | 40 |
| Chicken Katsu | chicken, egg, sauce | 120 | 35 |
| Shrimp Tempura | shrimp, egg, sauce | 110 | 30 |
| Classic Udon | noodles, egg, sauce, vegetables | 130 | 35 |
| Poke Bowl | fish, rice, vegetables, sauce | 150 | 40 |
| Okonomiyaki | egg, vegetables, sauce, cheese | 160 | 45 |
| Yakisoba | noodles, chicken, vegetables, sauce | 170 | 45 |

---

### Desserts (8 recipes) — also accepted by Inspector Pawsworth

| Name | Ingredients | Points | Time (s) |
|------|------------|--------|----------|
| Matcha Mochi | matcha, mochi-flour, red-bean | 160 | 45 |
| Fruit Mochi | mochi-flour, fruit, cream | 170 | 45 |
| Coconut Mochi | mochi-flour, coconut, honey | 165 | 45 |
| Lychee Mochi | mochi-flour, lychee, cream | 180 | 50 |
| Matcha Parfait | matcha, cream, red-bean | 160 | 40 |
| Red Bean Parfait | red-bean, cream, mochi-flour | 150 | 35 |
| Fruit Parfait | fruit, cream, honey | 155 | 35 |
| Lychee Parfait | lychee, cream, coconut | 170 | 40 |

---

### Drinks (5 recipes) — also accepted by Inspector Pawsworth

| Name | Ingredients | Points | Time (s) |
|------|------------|--------|----------|
| Brown Sugar Boba Tea | tea, tapioca, brown-sugar, cream | 140 | 45 |
| Matcha Latte | matcha, cream, honey | 130 | 40 |
| Fresh Fruit Tea | tea, fruit, honey | 120 | 35 |
| Coconut Milk Tea | tea, coconut, cream, tapioca | 125 | 35 |
| Lychee Bubble Tea | tea, lychee, tapioca, honey | 135 | 40 |

---

### VIP Recipes (4 recipes) — Duchess receives these at ×2 points

| Name | Ingredients | Points | Time (s) | VIP Total |
|------|------------|--------|----------|-----------|
| Truffle Sushi Deluxe | truffle, fish, rice, nori, gold-leaf | 250 | 45 | 500 |
| Luxury Truffle Ramen | truffle, noodles, miso, egg, gold-leaf | 280 | 50 | 560 |
| Royal Poke Bowl | fish, rice, truffle, vegetables, gold-leaf | 300 | 55 | 600 |
| Deluxe Matcha Paradise | matcha, cream, truffle, gold-leaf, honey | 320 | 50 | 640 |

---

### Emperor Recipes (5 recipes) — Emperor Meowximilian only, always ×2

| Name | Ingredients | Points | Time (s) | Total (×2 VIP) |
|------|------------|--------|----------|----------------|
| Imperial Sunrise Elixir | tea, honey, gold-leaf, lychee, mint | 1 000 | 45 | 2 000 |
| Royal Matcha Dynasty | matcha, cream, gold-leaf, honey, coconut | 1 000 | 40 | 2 000 |
| Golden Fruit Nectar | fruit, honey, gold-leaf, tea, coconut | 1 000 | 35 | 2 000 |
| Emperor's Boba Dream | tapioca, tea, gold-leaf, brown-sugar, cream | 1 000 | 45 | 2 000 |
| Celestial Golden Brew | tea, lychee, gold-leaf, mint, honey | 1 000 | 40 | 2 000 |

---

## 10. Shop

**Source files:**
- [src/data/shop.ts](src/data/shop.ts) — item definitions
- [src/components/Shop.tsx](src/components/Shop.tsx) — purchase UI
- [src/App.tsx](src/App.tsx) — `unlockedItems` state + purchase handler

### Shop Items

| ID | Name | Type | Cost | Effect | Status |
|----|------|------|------|--------|--------|
| theme-sakura | Sakura Theme | Theme | 2 coins | Cherry blossom visual theme | Visual only |
| theme-night | Night Mode | Theme | 2 coins | Nighttime visual theme | Visual only |
| boost-time | Time Extension | Boost | 3 coins | +30 s added at game start | ⚠️ Purchased but NOT applied |
| boost-points | Point Multiplier | Boost | 4 coins | ×1.5 points on all recipes | ⚠️ Purchased but NOT applied |
| deco-golden | Golden Spatula | Decoration | 3 coins | Golden cooking sparkle effect | Visual only |
| deco-lucky | Lucky Cat Statue | Decoration | 2 coins | Lucky cat decoration | Visual only |

> ⚠️ **Boost items** are recorded in `unlockedItems` when purchased but their effects are not read anywhere in the current gameplay code. Implementing them requires checking `unlockedItems` in `App.tsx`.

### Purchase Rules
- Each item can only be bought once (button disabled after unlock)
- Coins deducted immediately on purchase
- Purchase is prevented if `coins < item.cost`

---

## 11. Feedback System

**Source files:**
- [src/utils/feedback.ts](src/utils/feedback.ts) — message pools
- [src/components/Kitchen.tsx](src/components/Kitchen.tsx) — display logic

### Success Message Format
```
"{SUCCESS_MESSAGE} A {ADJECTIVE} {recipeName} {TASTE_DESCRIPTION}!"
```

**SUCCESS_MESSAGES pool (10):**
Purr-fectly cooked!, Meow-velous creation!, Paw-sitively delicious!, Fur-bulous dish!,
Cat-tastic cooking!, Whisker-licking good!, Tail-wagging tasty!, Purr-emium quality!,
Claw-some work!, Feline-tastic flavor!

**ADJECTIVES pool (15):**
delightful, interesting, unique, creative, surprising, questionable, peculiar, unusual,
mysterious, bewildering, extraordinary, remarkable, distinctive, exceptional, innovative

**TASTE_DESCRIPTIONS pool (10):**
"with a subtle blend of flavors", "bursting with umami", "perfectly balanced",
"with an elegant presentation", "that melts in your mouth", "with amazing texture",
"that exceeds expectations", "with harmonious ingredients",
"that's comfort food at its best", "with authentic taste"

### Failure Message Format
```
"Oops! Your {adjective} creation of {ingredientNames} didn't quite work out... (-10 points per ingredient)"
```
Ingredient IDs are resolved to display names via the `INGREDIENTS` lookup array.

### Display Behavior
| Property | Value |
|----------|-------|
| Duration | 3 000 ms then auto-cleared |
| Success style | `bg-green-100 text-green-800` |
| Failure style | `bg-red-100 text-red-800` |
| Position | Centered banner above the ingredient grid |
| CSS | `transition-all` for smooth appearance |

---

## 12. UI Layout Reference

### Gameplay Screen
```
┌─────────────────────────────────────────────────┐
│  Score: 0         ⏱ 180s        High: 0         │  ← App.tsx header
├───────────────────┬─────────────────────────────┤
│  ORDER PANEL      │  KITCHEN                    │
│  (Order.tsx)      │  (Kitchen.tsx)              │
│                   │                             │
│  [Order Card 1]   │  Feedback banner (if any)   │
│  [Order Card 2]   │                             │
│  [Order Card 3]   │  ┌─ Ingredient Grid ──────┐ │
│                   │  │  [Btn] [Btn]            │ │
│                   │  │  [Btn] [Btn]  × 13 rows │ │
│                   │  └────────────────────────┘ │
│                   │                             │
│                   │  Cooking Station (selected) │
│                   │  [🗑️]                       │
│                   │  [ingredient chips...]      │
│                   │                             │
│                   │  [Cook] button              │
└───────────────────┴─────────────────────────────┘
```

### Order Card Variants

| Customer type | Border | Background | Badge |
|--------------|--------|-----------|-------|
| Regular | 1px gray-200 | customer.color tint | None |
| VIP (Duchess / Emperor) | 2px yellow-400 | yellow-50 → amber-50 gradient | 👑 Crown icon |
| Inspector Pawsworth | gray-200 | blue-50 | 🧐 emoji |
| Neko | gray-200 | pink-50 | 💝 emoji |

### Color Tokens
| Usage | Tailwind class |
|-------|---------------|
| Primary / buttons | `orange-500`, `orange-600` |
| Accents / backgrounds | `amber-50`, `amber-500` |
| VIP highlights | `yellow-400`, `yellow-500` |
| Inspector theme | `blue-50` |
| Neko theme | `pink-50`, `pink-500` |
| Success feedback | `green-100`, `green-800` |
| Failure feedback | `red-100`, `red-800` |
| Disabled states | `gray-200`, `gray-500` |

---

## 13. Known Gaps & Improvement Targets

These are areas where the code is incomplete or where new features would have the most impact.

### 🔴 Unimplemented — Code exists, effect missing
| Gap | Where to fix |
|-----|-------------|
| `boost-time` (+30 s) purchased but ignored | Read `unlockedItems` in [src/App.tsx](src/App.tsx) and add to initial `timeLeft` |
| `boost-points` (×1.5) purchased but ignored | Wrap score increments in [src/App.tsx](src/App.tsx) with a multiplier check |
| `theme-sakura` and `theme-night` have no theme switching code | Add conditional Tailwind class root in [src/App.tsx](src/App.tsx) |

### 🟡 Partial / Inconsistent
| Gap | Details |
|-----|---------|
| Emperor Meowximilian golden drinks | Described in About screen but `handleCook` in [src/components/Kitchen.tsx](src/components/Kitchen.tsx) has no Emperor-specific branch — falls through to regular matching |
| Difficulty scaling | No scaling whatsoever — order generation speed, recipe pool, and timer pressure are constant for the entire 3-minute session |
| VIP max-ingredient cap | Cap changes from 4→6 dynamically, but there's no visual indicator telling the player why they suddenly have more slots |

### 🟢 Low-hanging improvements
| Idea | Suggested location |
|------|--------------------|
| Sound effects (success / failure / timer warning) | New `src/utils/audio.ts`, called from Kitchen.tsx and App.tsx |
| Difficulty ramp (increase order frequency or reduce timers over time) | [src/App.tsx](src/App.tsx) order-generation interval |
| Tutorial / first-time overlay | [src/components/HomeScreen.tsx](src/components/HomeScreen.tsx) or new `Tutorial.tsx` |
| More customers / recipes | [src/data/customers.ts](src/data/customers.ts), [src/data/recipes.ts](src/data/recipes.ts) |
| Combo/streak bonus (consecutive correct orders) | [src/App.tsx](src/App.tsx) score logic |
| Visual animation on correct order | [src/components/Kitchen.tsx](src/components/Kitchen.tsx) or CSS keyframes |
| Per-session statistics (orders served, missed, accuracy) | [src/App.tsx](src/App.tsx) game-over state |
