// ============================================================
// Category definitions — single source of truth
// ============================================================

import type { CategoryInfo } from '../types/nyt';

export const CATEGORIES: CategoryInfo[] = [
  { key: 'home',       label: 'Home',       emoji: '🏠' },
  { key: 'world',      label: 'World',      emoji: '🌍' },
  { key: 'politics',   label: 'Politics',   emoji: '🏛️' },
  { key: 'technology', label: 'Tech',       emoji: '💻' },
  { key: 'science',    label: 'Science',    emoji: '🔬' },
  { key: 'health',     label: 'Health',     emoji: '🩺' },
  { key: 'arts',       label: 'Arts',       emoji: '🎭' },
  { key: 'business',   label: 'Business',   emoji: '💼' },
  { key: 'travel',     label: 'Travel',     emoji: '✈️' },
  { key: 'style',      label: 'Style',      emoji: '👗' },
];
