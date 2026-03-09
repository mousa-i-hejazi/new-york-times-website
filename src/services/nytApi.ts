// ============================================================
// NYT API Service Module
// All API communication is centralised here for easy maintenance
// ============================================================

import type {
  NYTTopStoriesResponse,
  NYTSearchResponse,
  NYTArticle,
  NYTSearchDoc,
  Article,
  NewsCategory,
} from '../types/nyt';

// Read the API key from Vite environment variables (never hardcoded)
const API_KEY = import.meta.env.VITE_NYT_API_KEY as string;

const BASE_TOP_STORIES = 'https://api.nytimes.com/svc/topstories/v2';
const BASE_SEARCH = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Picks the best image URL from an article's multimedia array.
 * Prefers 'superJumbo' → 'Large' → first available, or null.
 */
function pickImageUrl(multimedia: NYTArticle['multimedia']): string | null {
  if (!multimedia || multimedia.length === 0) return null;
  const formats = ['superJumbo', 'Large Thumbnail', 'mediumThreeByTwo440', 'Normal'];
  for (const fmt of formats) {
    const found = multimedia.find((m) => m.format === fmt);
    if (found) return found.url;
  }
  return multimedia[0].url;
}

/**
 * Normalises a raw NYTArticle into our unified Article shape.
 */
function normaliseArticle(raw: NYTArticle, idx: number): Article {
  return {
    id: raw.uri || `article-${idx}`,
    title: raw.title,
    abstract: raw.abstract,
    url: raw.url,
    byline: raw.byline?.replace(/^By /i, '') ?? '',
    publishedDate: raw.published_date,
    section: raw.section,
    imageUrl: pickImageUrl(raw.multimedia),
    imageCaption: raw.multimedia?.[0]?.caption ?? '',
    isLarge: idx === 0, // first article is the hero
  };
}

/**
 * Normalises a search result doc into our unified Article shape.
 */
function normaliseSearchDoc(doc: NYTSearchDoc, idx: number): Article {
  const imgItem = doc.multimedia?.find((m) => m.subtype === 'xlarge' || m.subtype === 'thumbnail');
  const imageUrl = imgItem ? `https://www.nytimes.com/${imgItem.url}` : null;
  return {
    id: doc._id,
    title: doc.headline.main,
    abstract: doc.abstract || doc.snippet,
    url: doc.web_url,
    byline: doc.byline?.original?.replace(/^By /i, '') ?? '',
    publishedDate: doc.pub_date,
    section: doc.section_name,
    imageUrl,
    imageCaption: '',
    isLarge: idx === 0,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Fetches top stories for the given section.
 * Throws an Error if the request fails.
 */
export async function fetchTopStories(section: NewsCategory): Promise<Article[]> {
  if (!API_KEY) {
    throw new Error(
      'NYT API key is missing. Add VITE_NYT_API_KEY to your .env file.'
    );
  }

  const url = `${BASE_TOP_STORIES}/${section}.json?api-key=${API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`NYT API error: ${res.status} ${res.statusText}`);
  }

  const data: NYTTopStoriesResponse = await res.json();
  return data.results.map(normaliseArticle);
}

/**
 * Searches articles by keyword using the Article Search API.
 * Returns up to 10 results.
 */
export async function searchArticles(query: string): Promise<Article[]> {
  if (!API_KEY) {
    throw new Error(
      'NYT API key is missing. Add VITE_NYT_API_KEY to your .env file.'
    );
  }

  const params = new URLSearchParams({
    q: query,
    'api-key': API_KEY,
    sort: 'relevance',
    page: '0',
  });

  const res = await fetch(`${BASE_SEARCH}?${params}`);

  if (!res.ok) {
    throw new Error(`NYT Search API error: ${res.status} ${res.statusText}`);
  }

  const data: NYTSearchResponse = await res.json();
  return data.response.docs.map(normaliseSearchDoc);
}
