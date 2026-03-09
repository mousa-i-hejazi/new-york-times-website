// ============================================================
// Custom React hooks for data fetching
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { fetchTopStories, searchArticles } from '../services/nytApi';
import type { Article, NewsCategory } from '../types/nyt';

// ---------------------------------------------------------------------------
// useTopStories
// ---------------------------------------------------------------------------

interface UseTopStoriesResult {
  articles: Article[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Fetches top stories whenever the `section` changes.
 * Provides loading / error states and a manual refetch function.
 */
export function useTopStories(section: NewsCategory): UseTopStoriesResult {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTopStories(section);
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [section]);

  useEffect(() => {
    void load();
  }, [load]);

  return { articles, loading, error, refetch: load };
}

// ---------------------------------------------------------------------------
// useSearch
// ---------------------------------------------------------------------------

interface UseSearchResult {
  results: Article[];
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
  query: string;
  clearResults: () => void;
}

/**
 * Provides search functionality with debounce.
 * Exposes a `search` function that components call, plus result state.
 */
export function useSearch(): UseSearchResult {
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const search = useCallback(async (q: string) => {
    const trimmed = q.trim();
    setQuery(trimmed);
    if (!trimmed) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchArticles(trimmed);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
    setError(null);
  }, []);

  return { results, loading, error, search, query, clearResults };
}
