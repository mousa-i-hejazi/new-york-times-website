// ============================================================
// App — root component, wires together all state and routing
// ============================================================

import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { useTopStories } from './hooks/useNews';
import { searchArticles } from './services/nytApi';
import type { NewsCategory, Article } from './types/nyt';

export default function App() {
  // Active category for the top stories feed
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('home');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Top stories data via custom hook
  const { articles, loading, error, refetch } = useTopStories(activeCategory);

  // ── Handlers ────────────────────────────────────────────────────────────

  const handleCategoryChange = useCallback((cat: NewsCategory) => {
    setActiveCategory(cat);
    setIsSearchMode(false);
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearchMode(true);
    setSearchLoading(true);
    setSearchError(null);
    try {
      const results = await searchArticles(query);
      setSearchResults(results);
    } catch (err) {
      setSearchError(err instanceof Error ? err.message : 'Search failed.');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleClearSearch = useCallback(() => {
    setIsSearchMode(false);
    setSearchQuery('');
    setSearchResults([]);
    setSearchError(null);
  }, []);

  // Derive what to show: search results or top stories
  const displayArticles = isSearchMode ? searchResults : articles;
  const displayLoading = isSearchMode ? searchLoading : loading;
  const displayError = isSearchMode ? searchError : error;
  const handleRetry = isSearchMode
    ? () => { void handleSearch(searchQuery); }
    : refetch;

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={(q) => { void handleSearch(q); }}
        isSearchMode={isSearchMode}
        onClearSearch={handleClearSearch}
      />

      {/* Breaking news ticker — only when not searching */}
      {!isSearchMode && !loading && articles.length > 0 && (
        <div className="bg-accent-red text-white overflow-hidden">
          <div className="flex items-center">
            <span className="flex-shrink-0 font-display tracking-widest text-xs px-4 py-2 bg-ink">
              TRENDING
            </span>
            <div className="overflow-hidden flex-1">
              <div
                className="flex gap-8 whitespace-nowrap py-2 px-4 text-xs font-sans animate-marquee"
                style={{
                  animation: 'marquee 40s linear infinite',
                }}
              >
                {articles.slice(0, 6).map((a, i) => (
                  <a
                    key={a.id}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex-shrink-0"
                  >
                    <span className="opacity-60 mr-2">{i + 1}.</span>
                    {a.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1">
        <HomePage
          articles={displayArticles}
          loading={displayLoading}
          error={displayError}
          onRetry={handleRetry}
          isSearchMode={isSearchMode}
          searchQuery={searchQuery}
        />
      </div>

      <Footer onCategoryChange={handleCategoryChange} />

      {/* Ticker animation keyframes */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
