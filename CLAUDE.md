# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (localhost:5173)
npm run build     # TypeScript compile + Vite production build
npm run lint      # ESLint check
npm run preview   # Preview production build locally
```

There are no tests in this project.

## Architecture

**Calico Café** is a single-page React game (TypeScript + Vite + Tailwind CSS). There is no backend — all persistence is via `localStorage` (highScore, coins, unlockedItems).

### Game Flow

`App.tsx` is the root of all game logic and state. It controls which screen is rendered:
- `HomeScreen` → menu/about/shop entry
- Gameplay view → `Order` panel (left) + `Kitchen` (right)
- Game over overlay

State lives entirely in `App.tsx` via `useState`/`useEffect`. The timer loop, order generation, and score calculation all run here.

### Key Data Files

- [src/data/recipes.ts](src/data/recipes.ts) — 40+ recipes and 26 ingredients. A recipe has a `name`, `ingredients[]`, `score`, and optional `category`.
- [src/data/customers.ts](src/data/customers.ts) — 12 cat customers split into regular, VIP (double points, 20% stricter timers), and 3 special customers with unique rules.
- [src/data/shop.ts](src/data/shop.ts) — 6 purchasable items (themes, boosts, decorations).
- [src/types/game.ts](src/types/game.ts) — All TypeScript interfaces: `Order`, `Recipe`, `Ingredient`, `CatCustomer`, `ShopItem`.

### Special Customer Logic

Three customers require custom cooking logic in `Kitchen.tsx`:
1. **Inspector Pawsworth** — only accepts drinks & desserts (exact recipe match required)
2. **Emperor Meowximilian** — only accepts 5 gold-leaf luxury drink recipes (1000 pts each)
3. **Neko** — accepts any combination of pink/white/red ingredients for 150 pts

### Component Responsibilities

| File | Role |
|------|------|
| [src/App.tsx](src/App.tsx) | All game state, timer, order generation, score/coins, screen routing |
| [src/components/Kitchen.tsx](src/components/Kitchen.tsx) | Ingredient selection UI, cooking/matching logic |
| [src/components/Order.tsx](src/components/Order.tsx) | Renders a single active order card with countdown |
| [src/components/HomeScreen.tsx](src/components/HomeScreen.tsx) | Title screen with play/shop/about nav |
| [src/components/Shop.tsx](src/components/Shop.tsx) | Coin spending, item unlock persistence |
| [src/utils/feedback.ts](src/utils/feedback.ts) | Random success/failure feedback message pool |
