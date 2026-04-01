/**
 * Centralized theme configuration — replaces scattered ternary chains across components.
 * Keyed by the activeTheme string stored in state/localStorage.
 */

export interface ThemeConfig {
  // App.tsx themeClasses (passed as prop to many components)
  bg: string;
  header: string;
  card: string;
  text: string;
  subtext: string;

  // HomeScreen accent colors
  accentBtn: string;
  accentText: string;
  iconColor: string;
  bgIcon: string;
  earColor: string;       // hex for cat ear CSS borders
  whiskerColor: string;   // Tailwind bg class for whisker lines
  pawColor: string;       // Tailwind bg class for paw dots

  // HomeScreen stats panel
  statsBg: string;
  statsBorder: string;

  // HomeScreen about panel
  aboutBg: string;
  aboutBorder: string;

  // Shop accent colors
  shopAccentText: string;
  shopAccentHover: string;
  shopCardBorder: string;
  shopCardUnlockedBg: string;

  // RecipeBook outer theming
  tabActive: string;
  tabInactive: string;
  rbAccentText: string;
  rbAccentHover: string;

  // Kitchen theming
  kitchenTitle: string;
  kitchenIcon: string;
  kitchenTabActive: string;
  kitchenTabInactive: string;
  cookBtnActive: string;
  cookBtnLabel: string;
  cookBtnEmptyLabel: string;
  stationTitle: string;
  stationBorder: string;
  stationEmptyText: string;

  // CreativeMode accent
  cmAccentBtn: string;
  cmAccentText: string;

  // Header button (in-game)
  headerBtn: string;

  // Per-theme recipe card styling (RecipeBook)
  recipeCardClass: string;
  recipeNameColor: string;
  recipeBadge: string;        // e.g. '🌸 Sakura'
  recipeBadgeColor: string;   // Tailwind text color for badge

  // Lock banner in RecipeBook
  lockBanner: { bg: string; border: string; text: string; message: string };

  // Shop active/activate button per theme item
  shopActiveLabel: string;
  shopActiveBg: string;
  shopActivateBtn: string;

  // Dark theme flag
  isDark: boolean;
}

const DEFAULT: ThemeConfig = {
  bg: 'bg-amber-50',
  header: 'bg-orange-600',
  card: 'bg-white',
  text: 'text-gray-800',
  subtext: 'text-gray-600',

  accentBtn: 'bg-orange-600 hover:bg-orange-700',
  accentText: 'text-orange-600',
  iconColor: 'text-orange-600',
  bgIcon: 'text-orange-200',
  earColor: '#ea580c',
  whiskerColor: 'bg-orange-300',
  pawColor: 'bg-orange-200',

  statsBg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
  statsBorder: 'border-yellow-100',
  aboutBg: 'bg-orange-50',
  aboutBorder: 'border-orange-100',

  shopAccentText: 'text-orange-600',
  shopAccentHover: 'hover:text-orange-800',
  shopCardBorder: 'border-amber-200 hover:border-amber-300',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-orange-600 text-white',
  tabInactive: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  rbAccentText: 'text-orange-600',
  rbAccentHover: 'hover:text-orange-800',

  kitchenTitle: 'Kitchen',
  kitchenIcon: 'text-orange-600',
  kitchenTabActive: 'bg-orange-600 text-white shadow-sm',
  kitchenTabInactive: 'bg-amber-50 text-amber-700 hover:bg-amber-100',
  cookBtnActive: 'bg-orange-600 text-white hover:bg-orange-700 shadow-sm hover:shadow-md ring-2 ring-orange-300',
  cookBtnLabel: '🍳 Cook!',
  cookBtnEmptyLabel: 'Add ingredients to cook',
  stationTitle: 'Cooking Station',
  stationBorder: 'border-orange-200',
  stationEmptyText: '✨ Pick ingredients to start cooking!',

  cmAccentBtn: 'bg-orange-600 hover:bg-orange-700',
  cmAccentText: 'text-orange-600',

  headerBtn: 'bg-orange-700 hover:bg-orange-800',

  recipeCardClass: 'border-amber-100 bg-white hover:shadow-md',
  recipeNameColor: 'text-gray-800',
  recipeBadge: '',
  recipeBadgeColor: '',
  lockBanner: { bg: '', border: '', text: '', message: '' },

  shopActiveLabel: '🍳 Active',
  shopActiveBg: 'bg-orange-100 text-orange-700',
  shopActivateBtn: 'bg-orange-600 hover:bg-orange-700',

  isDark: false,
};

const SAKURA: ThemeConfig = {
  bg: 'bg-pink-50',
  header: 'bg-rose-400',
  card: 'bg-white',
  text: 'text-gray-800',
  subtext: 'text-gray-600',

  accentBtn: 'bg-rose-400 hover:bg-rose-500',
  accentText: 'text-rose-500',
  iconColor: 'text-rose-400',
  bgIcon: 'text-rose-200',
  earColor: '#fb7185',
  whiskerColor: 'bg-rose-300',
  pawColor: 'bg-rose-300',

  statsBg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
  statsBorder: 'border-yellow-100',
  aboutBg: 'bg-rose-50',
  aboutBorder: 'border-rose-100',

  shopAccentText: 'text-rose-500',
  shopAccentHover: 'hover:text-rose-700',
  shopCardBorder: 'border-amber-200 hover:border-amber-300',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-rose-400 text-white',
  tabInactive: 'bg-pink-100 text-rose-600 hover:bg-pink-200',
  rbAccentText: 'text-rose-500',
  rbAccentHover: 'hover:text-rose-700',

  kitchenTitle: 'Kitchen',
  kitchenIcon: 'text-rose-500',
  kitchenTabActive: 'bg-rose-400 text-white shadow-sm',
  kitchenTabInactive: 'bg-pink-50 text-rose-600 hover:bg-pink-100',
  cookBtnActive: 'bg-rose-400 text-white hover:bg-rose-500 shadow-sm hover:shadow-md ring-2 ring-rose-300',
  cookBtnLabel: '🍳 Cook!',
  cookBtnEmptyLabel: 'Add ingredients to cook',
  stationTitle: 'Cooking Station',
  stationBorder: 'border-rose-200',
  stationEmptyText: '🌸 Pick ingredients to start cooking!',

  cmAccentBtn: 'bg-rose-400 hover:bg-rose-500',
  cmAccentText: 'text-rose-500',

  headerBtn: 'bg-rose-500 hover:bg-rose-600',

  recipeCardClass: 'border-pink-200 bg-pink-50',
  recipeNameColor: 'text-rose-700',
  recipeBadge: '🌸 Sakura',
  recipeBadgeColor: 'text-rose-400',
  lockBanner: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-rose-600', message: '🔒 Unlock <strong>Sakura Theme</strong> in the Shop (2 coins) to play this mode!' },

  shopActiveLabel: '🌸 Active',
  shopActiveBg: 'bg-pink-100 text-rose-600',
  shopActivateBtn: 'bg-rose-400 hover:bg-rose-500',

  isDark: false,
};

const NIGHT: ThemeConfig = {
  bg: 'bg-slate-900',
  header: 'bg-indigo-900',
  card: 'bg-slate-800',
  text: 'text-gray-100',
  subtext: 'text-gray-400',

  accentBtn: 'bg-indigo-600 hover:bg-indigo-700',
  accentText: 'text-indigo-400',
  iconColor: 'text-indigo-400',
  bgIcon: 'text-indigo-800',
  earColor: '#4338ca',
  whiskerColor: 'bg-indigo-400',
  pawColor: 'bg-indigo-400',

  statsBg: 'bg-indigo-900',
  statsBorder: 'border-indigo-700',
  aboutBg: 'bg-indigo-900',
  aboutBorder: 'border-indigo-700',

  shopAccentText: 'text-indigo-400',
  shopAccentHover: 'hover:text-indigo-300',
  shopCardBorder: 'border-slate-600',
  shopCardUnlockedBg: 'bg-slate-700 border-slate-600',

  tabActive: 'bg-indigo-600 text-white',
  tabInactive: 'bg-slate-700 text-indigo-300 hover:bg-slate-600',
  rbAccentText: 'text-indigo-400',
  rbAccentHover: 'hover:text-indigo-300',

  kitchenTitle: 'Kitchen',
  kitchenIcon: 'text-indigo-400',
  kitchenTabActive: 'bg-indigo-600 text-white shadow-sm',
  kitchenTabInactive: 'bg-slate-700 text-indigo-300 hover:bg-slate-600',
  cookBtnActive: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow-md ring-2 ring-indigo-400',
  cookBtnLabel: '🍳 Cook!',
  cookBtnEmptyLabel: 'Add ingredients to cook',
  stationTitle: 'Cooking Station',
  stationBorder: 'border-indigo-400',
  stationEmptyText: '🌙 Pick ingredients to start cooking!',

  cmAccentBtn: 'bg-indigo-600 hover:bg-indigo-700',
  cmAccentText: 'text-indigo-400',

  headerBtn: 'bg-indigo-800 hover:bg-indigo-700',

  recipeCardClass: 'border-indigo-200 bg-indigo-50',
  recipeNameColor: 'text-indigo-700',
  recipeBadge: '🌙 Night',
  recipeBadgeColor: 'text-indigo-400',
  lockBanner: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', message: '🔒 Unlock <strong>Night Mode</strong> in the Shop (2 coins) to play this mode!' },

  shopActiveLabel: '🌙 Active',
  shopActiveBg: 'bg-indigo-100 text-indigo-700',
  shopActivateBtn: 'bg-indigo-600 hover:bg-indigo-700',

  isDark: true,
};

const AMERICAN: ThemeConfig = {
  bg: 'bg-red-50',
  header: 'bg-blue-700',
  card: 'bg-white',
  text: 'text-gray-800',
  subtext: 'text-gray-600',

  accentBtn: 'bg-blue-600 hover:bg-blue-700',
  accentText: 'text-blue-600',
  iconColor: 'text-blue-500',
  bgIcon: 'text-blue-200',
  earColor: '#2563eb',
  whiskerColor: 'bg-blue-300',
  pawColor: 'bg-blue-300',

  statsBg: 'bg-blue-50',
  statsBorder: 'border-blue-100',
  aboutBg: 'bg-blue-50',
  aboutBorder: 'border-blue-100',

  shopAccentText: 'text-blue-600',
  shopAccentHover: 'hover:text-blue-800',
  shopCardBorder: 'border-amber-200 hover:border-amber-300',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-blue-600 text-white',
  tabInactive: 'bg-red-100 text-blue-600 hover:bg-red-200',
  rbAccentText: 'text-blue-600',
  rbAccentHover: 'hover:text-blue-800',

  kitchenTitle: 'Kitchen',
  kitchenIcon: 'text-blue-600',
  kitchenTabActive: 'bg-blue-600 text-white shadow-sm',
  kitchenTabInactive: 'bg-red-50 text-blue-600 hover:bg-red-100',
  cookBtnActive: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md ring-2 ring-blue-300',
  cookBtnLabel: '🍳 Cook!',
  cookBtnEmptyLabel: 'Add ingredients to cook',
  stationTitle: 'Cooking Station',
  stationBorder: 'border-blue-200',
  stationEmptyText: '🍔 Pick ingredients to start cooking!',

  cmAccentBtn: 'bg-blue-600 hover:bg-blue-700',
  cmAccentText: 'text-blue-600',

  headerBtn: 'bg-blue-800 hover:bg-blue-900',

  recipeCardClass: 'border-red-200 bg-red-50',
  recipeNameColor: 'text-blue-700',
  recipeBadge: '🍔 Diner',
  recipeBadgeColor: 'text-blue-500',
  lockBanner: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-blue-600', message: '🔒 Unlock <strong>American Diner</strong> in the Shop (3 coins) to play this mode!' },

  shopActiveLabel: '🍔 Active',
  shopActiveBg: 'bg-blue-100 text-blue-700',
  shopActivateBtn: 'bg-blue-600 hover:bg-blue-700',

  isDark: false,
};

const SUNSET: ThemeConfig = {
  bg: 'bg-gradient-to-b from-orange-100 via-rose-100 to-purple-100',
  header: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-600',
  card: 'bg-white/80 backdrop-blur-sm',
  text: 'text-gray-800',
  subtext: 'text-gray-600',

  accentBtn: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500',
  accentText: 'text-rose-500',
  iconColor: 'text-rose-500',
  bgIcon: 'text-rose-200',
  earColor: '#e11d48',
  whiskerColor: 'bg-rose-300',
  pawColor: 'bg-rose-300',

  statsBg: 'bg-gradient-to-r from-yellow-50 to-amber-50',
  statsBorder: 'border-yellow-100',
  aboutBg: 'bg-rose-50',
  aboutBorder: 'border-rose-100',

  shopAccentText: 'text-rose-500',
  shopAccentHover: 'hover:text-rose-700',
  shopCardBorder: 'border-amber-200 hover:border-amber-300',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white',
  tabInactive: 'bg-orange-50 text-rose-600 hover:bg-rose-100',
  rbAccentText: 'text-rose-500',
  rbAccentHover: 'hover:text-rose-700',

  kitchenTitle: 'Mocktail Bar',
  kitchenIcon: 'text-rose-500',
  kitchenTabActive: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white shadow-sm',
  kitchenTabInactive: 'bg-orange-50 text-rose-600 hover:bg-rose-100',
  cookBtnActive: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500 text-white hover:from-orange-600 hover:via-rose-600 hover:to-purple-600 shadow-sm hover:shadow-md ring-2 ring-rose-300',
  cookBtnLabel: '🍹 Mix!',
  cookBtnEmptyLabel: 'Add ingredients to mix',
  stationTitle: 'Mixing Station',
  stationBorder: 'border-rose-300',
  stationEmptyText: '🍹 Pick ingredients to mix a mocktail!',

  cmAccentBtn: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500',
  cmAccentText: 'text-rose-500',

  headerBtn: 'bg-rose-700 hover:bg-rose-800',

  recipeCardClass: 'border-rose-200 bg-gradient-to-br from-orange-50 to-rose-50',
  recipeNameColor: 'text-rose-600',
  recipeBadge: '🍹 Mocktail',
  recipeBadgeColor: 'text-rose-400',
  lockBanner: { bg: 'bg-orange-50', border: 'border-rose-200', text: 'text-rose-600', message: '🔒 Unlock <strong>Meow-Meow Mocktail Bar</strong> in the Shop (4 coins) to mix these drinks!' },

  shopActiveLabel: '🍹 Active',
  shopActiveBg: 'bg-rose-100 text-rose-600',
  shopActivateBtn: 'bg-gradient-to-r from-orange-500 via-rose-500 to-purple-500',

  isDark: false,
};

// ─── New Themes ─────────────────────────────────────────────────────────────

const COSMIC: ThemeConfig = {
  bg: 'bg-slate-950',
  header: 'bg-gradient-to-r from-purple-800 via-violet-700 to-indigo-800',
  card: 'bg-slate-900/90 backdrop-blur-sm',
  text: 'text-gray-100',
  subtext: 'text-violet-300',

  accentBtn: 'bg-violet-600 hover:bg-violet-700',
  accentText: 'text-violet-400',
  iconColor: 'text-violet-400',
  bgIcon: 'text-violet-900',
  earColor: '#7c3aed',
  whiskerColor: 'bg-violet-400',
  pawColor: 'bg-violet-400',

  statsBg: 'bg-violet-950',
  statsBorder: 'border-violet-800',
  aboutBg: 'bg-violet-950',
  aboutBorder: 'border-violet-800',

  shopAccentText: 'text-violet-400',
  shopAccentHover: 'hover:text-violet-300',
  shopCardBorder: 'border-slate-700',
  shopCardUnlockedBg: 'bg-slate-800 border-slate-700',

  tabActive: 'bg-violet-600 text-white',
  tabInactive: 'bg-slate-800 text-violet-300 hover:bg-slate-700',
  rbAccentText: 'text-violet-400',
  rbAccentHover: 'hover:text-violet-300',

  kitchenTitle: 'Space Kitchen',
  kitchenIcon: 'text-violet-500',
  kitchenTabActive: 'bg-violet-600 text-white shadow-sm',
  kitchenTabInactive: 'bg-slate-800 text-violet-300 hover:bg-slate-700',
  cookBtnActive: 'bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white hover:from-purple-700 hover:via-violet-700 hover:to-indigo-700 shadow-sm hover:shadow-md ring-2 ring-violet-300',
  cookBtnLabel: '🚀 Launch!',
  cookBtnEmptyLabel: 'Add ingredients to launch',
  stationTitle: 'Launch Pad',
  stationBorder: 'border-violet-300',
  stationEmptyText: '🚀 Pick ingredients to explore the cosmos!',

  cmAccentBtn: 'bg-violet-600 hover:bg-violet-700',
  cmAccentText: 'text-violet-400',

  headerBtn: 'bg-violet-800 hover:bg-violet-700',

  recipeCardClass: 'border-violet-200 bg-violet-50',
  recipeNameColor: 'text-violet-700',
  recipeBadge: '🌌 Cosmic',
  recipeBadgeColor: 'text-violet-500',
  lockBanner: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600', message: '🔒 Unlock <strong>Cosmic Café</strong> in the Shop (4 coins) to explore the cosmos!' },

  shopActiveLabel: '🌌 Active',
  shopActiveBg: 'bg-violet-100 text-violet-700',
  shopActivateBtn: 'bg-violet-600 hover:bg-violet-700',

  isDark: true,
};

const CAMPFIRE: ThemeConfig = {
  bg: 'bg-stone-100',
  header: 'bg-gradient-to-r from-amber-800 via-orange-700 to-stone-700',
  card: 'bg-white',
  text: 'text-stone-800',
  subtext: 'text-stone-500',

  accentBtn: 'bg-amber-700 hover:bg-amber-800',
  accentText: 'text-amber-700',
  iconColor: 'text-amber-600',
  bgIcon: 'text-amber-200',
  earColor: '#92400e',
  whiskerColor: 'bg-amber-400',
  pawColor: 'bg-amber-300',

  statsBg: 'bg-amber-50',
  statsBorder: 'border-amber-200',
  aboutBg: 'bg-amber-50',
  aboutBorder: 'border-amber-200',

  shopAccentText: 'text-amber-700',
  shopAccentHover: 'hover:text-amber-900',
  shopCardBorder: 'border-stone-300 hover:border-amber-400',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-amber-700 text-white',
  tabInactive: 'bg-stone-100 text-amber-700 hover:bg-amber-100',
  rbAccentText: 'text-amber-700',
  rbAccentHover: 'hover:text-amber-900',

  kitchenTitle: 'Campfire',
  kitchenIcon: 'text-amber-600',
  kitchenTabActive: 'bg-amber-700 text-white shadow-sm',
  kitchenTabInactive: 'bg-stone-100 text-amber-700 hover:bg-amber-100',
  cookBtnActive: 'bg-gradient-to-r from-amber-700 via-orange-600 to-stone-600 text-white hover:from-amber-800 hover:via-orange-700 hover:to-stone-700 shadow-sm hover:shadow-md ring-2 ring-amber-300',
  cookBtnLabel: '🔥 Roast!',
  cookBtnEmptyLabel: 'Add ingredients to roast',
  stationTitle: 'Fire Pit',
  stationBorder: 'border-amber-300',
  stationEmptyText: '🔥 Toss some ingredients on the fire!',

  cmAccentBtn: 'bg-amber-700 hover:bg-amber-800',
  cmAccentText: 'text-amber-700',

  headerBtn: 'bg-amber-900 hover:bg-amber-800',

  recipeCardClass: 'border-amber-200 bg-amber-50',
  recipeNameColor: 'text-amber-800',
  recipeBadge: '🏕️ Campfire',
  recipeBadgeColor: 'text-amber-600',
  lockBanner: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', message: '🔒 Unlock <strong>Campfire Kitchen</strong> in the Shop (3 coins) to cook by the fire!' },

  shopActiveLabel: '🏕️ Active',
  shopActiveBg: 'bg-amber-100 text-amber-700',
  shopActivateBtn: 'bg-amber-700 hover:bg-amber-800',

  isDark: false,
};

const ZEN: ThemeConfig = {
  bg: 'bg-stone-50',
  header: 'bg-gradient-to-r from-stone-600 via-emerald-700 to-stone-600',
  card: 'bg-white',
  text: 'text-stone-700',
  subtext: 'text-stone-400',

  accentBtn: 'bg-emerald-700 hover:bg-emerald-800',
  accentText: 'text-emerald-700',
  iconColor: 'text-emerald-600',
  bgIcon: 'text-emerald-200',
  earColor: '#047857',
  whiskerColor: 'bg-emerald-300',
  pawColor: 'bg-emerald-200',

  statsBg: 'bg-emerald-50',
  statsBorder: 'border-emerald-200',
  aboutBg: 'bg-emerald-50',
  aboutBorder: 'border-emerald-200',

  shopAccentText: 'text-emerald-700',
  shopAccentHover: 'hover:text-emerald-900',
  shopCardBorder: 'border-stone-300 hover:border-emerald-400',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-emerald-700 text-white',
  tabInactive: 'bg-stone-100 text-emerald-700 hover:bg-emerald-100',
  rbAccentText: 'text-emerald-700',
  rbAccentHover: 'hover:text-emerald-900',

  kitchenTitle: 'Zen Kitchen',
  kitchenIcon: 'text-emerald-600',
  kitchenTabActive: 'bg-emerald-700 text-white shadow-sm',
  kitchenTabInactive: 'bg-stone-50 text-emerald-700 hover:bg-emerald-100',
  cookBtnActive: 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm hover:shadow-md ring-2 ring-emerald-300',
  cookBtnLabel: '🧘 Serve',
  cookBtnEmptyLabel: 'Add ingredients mindfully',
  stationTitle: 'Meditation Plate',
  stationBorder: 'border-emerald-200',
  stationEmptyText: '🧘 Select ingredients with intention...',

  cmAccentBtn: 'bg-emerald-700 hover:bg-emerald-800',
  cmAccentText: 'text-emerald-700',

  headerBtn: 'bg-emerald-800 hover:bg-emerald-700',

  recipeCardClass: 'border-emerald-200 bg-emerald-50',
  recipeNameColor: 'text-emerald-700',
  recipeBadge: '🎋 Zen',
  recipeBadgeColor: 'text-emerald-600',
  lockBanner: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', message: '🔒 Unlock <strong>Zen Garden</strong> in the Shop (3 coins) to find inner peace!' },

  shopActiveLabel: '🎋 Active',
  shopActiveBg: 'bg-emerald-100 text-emerald-700',
  shopActivateBtn: 'bg-emerald-700 hover:bg-emerald-800',

  isDark: false,
};

const CANDY: ThemeConfig = {
  bg: 'bg-gradient-to-b from-pink-100 via-yellow-50 to-cyan-50',
  header: 'bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400',
  card: 'bg-white/90 backdrop-blur-sm',
  text: 'text-pink-800',
  subtext: 'text-pink-400',

  accentBtn: 'bg-pink-500 hover:bg-pink-600',
  accentText: 'text-pink-500',
  iconColor: 'text-pink-400',
  bgIcon: 'text-pink-200',
  earColor: '#ec4899',
  whiskerColor: 'bg-pink-300',
  pawColor: 'bg-pink-300',

  statsBg: 'bg-pink-50',
  statsBorder: 'border-pink-200',
  aboutBg: 'bg-pink-50',
  aboutBorder: 'border-pink-200',

  shopAccentText: 'text-pink-500',
  shopAccentHover: 'hover:text-pink-700',
  shopCardBorder: 'border-pink-200 hover:border-pink-300',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-pink-500 text-white',
  tabInactive: 'bg-pink-50 text-pink-500 hover:bg-pink-100',
  rbAccentText: 'text-pink-500',
  rbAccentHover: 'hover:text-pink-700',

  kitchenTitle: 'Candy Counter',
  kitchenIcon: 'text-pink-500',
  kitchenTabActive: 'bg-pink-500 text-white shadow-sm',
  kitchenTabInactive: 'bg-pink-50 text-pink-500 hover:bg-pink-100',
  cookBtnActive: 'bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 text-white hover:from-pink-600 hover:via-yellow-500 hover:to-cyan-500 shadow-sm hover:shadow-md ring-2 ring-pink-300',
  cookBtnLabel: '🍬 Make!',
  cookBtnEmptyLabel: 'Add ingredients to make candy',
  stationTitle: 'Candy Station',
  stationBorder: 'border-pink-300',
  stationEmptyText: '🍬 Pick sweet ingredients to create candy!',

  cmAccentBtn: 'bg-pink-500 hover:bg-pink-600',
  cmAccentText: 'text-pink-500',

  headerBtn: 'bg-pink-600 hover:bg-pink-700',

  recipeCardClass: 'border-pink-200 bg-pink-50',
  recipeNameColor: 'text-pink-700',
  recipeBadge: '🍭 Candy',
  recipeBadgeColor: 'text-pink-500',
  lockBanner: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-600', message: '🔒 Unlock <strong>Candy Shop</strong> in the Shop (3 coins) to sweeten your world!' },

  shopActiveLabel: '🍭 Active',
  shopActiveBg: 'bg-pink-100 text-pink-600',
  shopActivateBtn: 'bg-pink-500 hover:bg-pink-600',

  isDark: false,
};

const OCEAN: ThemeConfig = {
  bg: 'bg-gradient-to-b from-sky-100 via-cyan-50 to-blue-50',
  header: 'bg-gradient-to-r from-blue-700 via-teal-600 to-blue-700',
  card: 'bg-white/90 backdrop-blur-sm',
  text: 'text-blue-800',
  subtext: 'text-blue-400',

  accentBtn: 'bg-teal-600 hover:bg-teal-700',
  accentText: 'text-teal-600',
  iconColor: 'text-teal-500',
  bgIcon: 'text-blue-200',
  earColor: '#0d9488',
  whiskerColor: 'bg-teal-300',
  pawColor: 'bg-teal-200',

  statsBg: 'bg-sky-50',
  statsBorder: 'border-sky-200',
  aboutBg: 'bg-sky-50',
  aboutBorder: 'border-sky-200',

  shopAccentText: 'text-teal-600',
  shopAccentHover: 'hover:text-teal-800',
  shopCardBorder: 'border-sky-200 hover:border-teal-300',
  shopCardUnlockedBg: 'bg-gray-50 border-gray-200',

  tabActive: 'bg-teal-600 text-white',
  tabInactive: 'bg-sky-50 text-teal-600 hover:bg-sky-100',
  rbAccentText: 'text-teal-600',
  rbAccentHover: 'hover:text-teal-800',

  kitchenTitle: 'Seaside Kitchen',
  kitchenIcon: 'text-teal-600',
  kitchenTabActive: 'bg-teal-600 text-white shadow-sm',
  kitchenTabInactive: 'bg-sky-50 text-teal-600 hover:bg-sky-100',
  cookBtnActive: 'bg-gradient-to-r from-blue-600 via-teal-500 to-blue-600 text-white hover:from-blue-700 hover:via-teal-600 hover:to-blue-700 shadow-sm hover:shadow-md ring-2 ring-teal-300',
  cookBtnLabel: '🌊 Serve!',
  cookBtnEmptyLabel: 'Add ingredients to cook',
  stationTitle: 'Dock Station',
  stationBorder: 'border-teal-200',
  stationEmptyText: '🌊 Catch some ingredients from the sea!',

  cmAccentBtn: 'bg-teal-600 hover:bg-teal-700',
  cmAccentText: 'text-teal-600',

  headerBtn: 'bg-blue-800 hover:bg-blue-700',

  recipeCardClass: 'border-teal-200 bg-sky-50',
  recipeNameColor: 'text-teal-700',
  recipeBadge: '🌊 Ocean',
  recipeBadgeColor: 'text-teal-500',
  lockBanner: { bg: 'bg-sky-50', border: 'border-teal-200', text: 'text-teal-600', message: '🔒 Unlock <strong>Ocean Breeze Café</strong> in the Shop (3 coins) to ride the waves!' },

  shopActiveLabel: '🌊 Active',
  shopActiveBg: 'bg-sky-100 text-teal-700',
  shopActivateBtn: 'bg-teal-600 hover:bg-teal-700',

  isDark: false,
};

export const THEME_CONFIG: Record<string, ThemeConfig> = {
  'default':         DEFAULT,
  'theme-sakura':    SAKURA,
  'theme-night':     NIGHT,
  'theme-american':  AMERICAN,
  'theme-sunset':    SUNSET,
  'theme-cosmic':    COSMIC,
  'theme-campfire':  CAMPFIRE,
  'theme-zen':       ZEN,
  'theme-candy':     CANDY,
  'theme-ocean':     OCEAN,
};

/** Helper: get config for a theme, falling back to default */
export function getThemeConfig(activeTheme: string): ThemeConfig {
  return THEME_CONFIG[activeTheme] ?? THEME_CONFIG['default'];
}

/** Helper: get config for a recipe's theme (keyed by recipe.theme like 'sakura', not 'theme-sakura') */
export function getRecipeThemeConfig(recipeTheme: string): ThemeConfig | undefined {
  return THEME_CONFIG[`theme-${recipeTheme}`];
}
