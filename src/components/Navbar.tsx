// ============================================================
// Navbar — top bar with logo, category nav, search & date
// ============================================================

import { useState, useRef, useEffect } from 'react';
import type { NewsCategory } from '../types/nyt';
import { CATEGORIES } from '../constants/categories';

interface NavbarProps {
  activeCategory: NewsCategory;
  onCategoryChange: (cat: NewsCategory) => void;
  onSearch: (query: string) => void;
  isSearchMode: boolean;
  onClearSearch: () => void;
}

export default function Navbar({
  activeCategory,
  onCategoryChange,
  onSearch,
  isSearchMode,
  onClearSearch,
}: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when it opens
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Format today's date for display
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
      setSearchOpen(false);
    }
  }

  function handleClearSearch() {
    setSearchValue('');
    setSearchOpen(false);
    onClearSearch();
  }

  return (
    <header className="sticky top-0 z-50 bg-paper border-b-2 border-ink shadow-sm">
      {/* Top bar: date + tagline */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-ink text-paper-warm text-xs font-sans tracking-widest uppercase">
        <span className="opacity-70">{today}</span>
        <span className="opacity-50 italic font-serif normal-case tracking-normal text-sm">
          All the news that's fit to read
        </span>
        <span className="opacity-70">New York Times Top Stories</span>
      </div>

      {/* Main navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
        {/* Hamburger menu (mobile) */}
        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="font-display text-3xl md:text-4xl tracking-wider text-ink leading-none">
            THE DAILY BRIEF
          </h1>
          <span className="hidden md:block font-serif italic text-xs text-ink-muted mt-0.5 tracking-wide">
            Powered by The New York Times
          </span>
        </div>

        {/* Search area */}
        <div className="flex items-center gap-3">
          {isSearchMode && (
            <button
              onClick={handleClearSearch}
              className="hidden md:flex items-center gap-1.5 text-xs font-sans text-accent-red border border-accent-red px-3 py-1.5 hover:bg-accent-red hover:text-white transition-colors duration-200"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear search
            </button>
          )}

          {searchOpen ? (
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search articles…"
                className="w-44 md:w-64 border-b-2 border-ink bg-transparent font-sans text-sm px-1 py-1 focus:outline-none focus:border-accent-red transition-colors"
              />
              <button type="submit" className="p-1 text-ink hover:text-accent-red transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-1 text-ink-muted hover:text-ink transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-ink hover:text-accent-red transition-colors"
              aria-label="Open search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category navigation — desktop */}
      <nav className="hidden md:flex items-center gap-0 border-t border-ink/10 overflow-x-auto scrollbar-hide px-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              onCategoryChange(cat.key);
              if (isSearchMode) onClearSearch();
            }}
            className={`flex-shrink-0 font-display tracking-widest text-sm px-4 py-3 border-b-2 transition-all duration-200 ${
              activeCategory === cat.key && !isSearchMode
                ? 'border-accent-red text-accent-red'
                : 'border-transparent text-ink-muted hover:text-ink hover:border-ink/30'
            }`}
          >
            {cat.label.toUpperCase()}
          </button>
        ))}
      </nav>

      {/* Category navigation — mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden border-t border-ink/10 bg-paper-warm">
          <div className="grid grid-cols-3 gap-px bg-ink/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => {
                  onCategoryChange(cat.key);
                  setMenuOpen(false);
                  if (isSearchMode) onClearSearch();
                }}
                className={`flex flex-col items-center gap-1 py-3 text-xs font-display tracking-wider transition-colors ${
                  activeCategory === cat.key && !isSearchMode
                    ? 'bg-ink text-paper'
                    : 'bg-paper text-ink-muted hover:bg-paper-warm'
                }`}
              >
                <span className="text-lg">{cat.emoji}</span>
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
