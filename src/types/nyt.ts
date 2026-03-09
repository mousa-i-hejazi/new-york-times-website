// ============================================================
// NYT API Type Definitions
// ============================================================

/**
 * Represents a multimedia item attached to an article (image, video, etc.)
 */
export interface NYTMultimedia {
  url: string;
  format: string;
  height: number;
  width: number;
  type: string;
  subtype: string;
  caption: string;
  copyright: string;
}

/**
 * Represents a single article from the NYT Top Stories API
 */
export interface NYTArticle {
  section: string;
  subsection: string;
  title: string;
  abstract: string;
  url: string;
  uri: string;
  byline: string;
  item_type: string;
  updated_date: string;
  created_date: string;
  published_date: string;
  material_type_facet: string;
  kicker: string;
  des_facet: string[];
  org_facet: string[];
  per_facet: string[];
  geo_facet: string[];
  multimedia: NYTMultimedia[] | null;
  short_url: string;
}

/**
 * Top Stories API response shape
 */
export interface NYTTopStoriesResponse {
  status: string;
  copyright: string;
  section: string;
  last_updated: string;
  num_results: number;
  results: NYTArticle[];
}

/**
 * Article search result item
 */
export interface NYTSearchDoc {
  _id: string;
  headline: { main: string; kicker?: string };
  abstract: string;
  web_url: string;
  pub_date: string;
  byline: { original: string };
  section_name: string;
  multimedia: Array<{ url: string; subtype: string }>;
  snippet: string;
}

/**
 * Article search API response shape
 */
export interface NYTSearchResponse {
  status: string;
  copyright: string;
  response: {
    docs: NYTSearchDoc[];
    meta: { hits: number; offset: number; time: number };
  };
}

/**
 * Available news categories / sections
 */
export type NewsCategory =
  | 'home'
  | 'world'
  | 'politics'
  | 'technology'
  | 'science'
  | 'health'
  | 'sports'
  | 'arts'
  | 'business'
  | 'travel'
  | 'style';

export interface CategoryInfo {
  key: NewsCategory;
  label: string;
  emoji: string;
}

/**
 * Unified article shape used across the app (normalised from both API endpoints)
 */
export interface Article {
  id: string;
  title: string;
  abstract: string;
  url: string;
  byline: string;
  publishedDate: string;
  section: string;
  imageUrl: string | null;
  imageCaption: string;
  isLarge?: boolean; // used to flag hero/featured cards
}
