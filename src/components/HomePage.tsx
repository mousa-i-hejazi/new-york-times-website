// ============================================================
// HomePage — main content layout with articles grid
// ============================================================

import ArticleCard from './ArticleCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import type { Article } from '../types/nyt';

interface HomePageProps {
  articles: Article[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  isSearchMode: boolean;
  searchQuery: string;
}

export default function HomePage({
  articles,
  loading,
  error,
  onRetry,
  isSearchMode,
  searchQuery,
}: HomePageProps) {
  // ── Loading state ──────────────────────────────────────────────────────
  if (loading) {
    return <LoadingSpinner message={isSearchMode ? `Searching "${searchQuery}"…` : 'Loading stories…'} />;
  }

  // ── Error state ────────────────────────────────────────────────────────
  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  // ── Empty state ────────────────────────────────────────────────────────
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="font-display text-6xl text-ink/10 tracking-widest">∅</div>
        <h3 className="font-display tracking-widest text-ink-muted text-lg">NO STORIES FOUND</h3>
        {isSearchMode && (
          <p className="font-sans text-ink-muted/70 text-sm">
            Try a different keyword or browse a category.
          </p>
        )}
      </div>
    );
  }

  // ── Search results layout ──────────────────────────────────────────────
  if (isSearchMode) {
    return (
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6 pb-4 border-b-2 border-ink">
          <p className="font-sans text-ink-muted text-sm">
            <span className="font-display tracking-widest text-ink text-lg mr-2">
              {articles.length}
            </span>
            results for <span className="font-serif italic">"{searchQuery}"</span>
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, i) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant={i === 0 ? 'featured' : 'standard'}
            />
          ))}
        </div>
      </div>
    );
  }

  // ── Normal layout ──────────────────────────────────────────────────────
  // Destructure articles into layout zones
  const [hero, ...rest] = articles;
  const featured = rest.slice(0, 3);      // 3 featured cards below hero
  const mainGrid = rest.slice(3, 9);      // 6 articles in main grid
  const sidebarTop = rest.slice(9, 14);   // 5 list items in sidebar
  const bottomGrid = rest.slice(14, 20);  // 6 more articles
  const editorsPicks = rest.slice(20, 24); // 4 compact picks

  return (
    <main>
      {/* ── Hero ── */}
      {hero && (
        <section>
          <ArticleCard article={hero} variant="hero" />
        </section>
      )}

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* ── Featured trio ── */}
        {featured.length > 0 && (
          <section className="py-8 border-b border-ink/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((article) => (
                <ArticleCard key={article.id} article={article} variant="featured" />
              ))}
            </div>
          </section>
        )}

        {/* ── Main content + sidebar ── */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 border-b border-ink/10">
          {/* Main grid */}
          <div className="lg:col-span-2">
            <h2 className="font-display tracking-widest text-ink text-xs mb-5 flex items-center gap-3">
              <span className="w-6 h-0.5 bg-accent-red inline-block" />
              LATEST STORIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {mainGrid.map((article) => (
                <ArticleCard key={article.id} article={article} variant="standard" />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          {sidebarTop.length > 0 && (
            <aside className="lg:col-span-1 lg:border-l lg:border-ink/10 lg:pl-8">
              <h2 className="font-display tracking-widest text-ink text-xs mb-5 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-accent-red inline-block" />
                ALSO IN THE NEWS
              </h2>
              <div>
                {sidebarTop.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="list" />
                ))}
              </div>
            </aside>
          )}
        </div>

        {/* ── Editor's picks strip ── */}
        {editorsPicks.length > 0 && (
          <section className="py-8 border-b border-ink/10">
            <h2 className="font-display tracking-widest text-ink text-xs mb-5 flex items-center gap-3">
              <span className="w-6 h-0.5 bg-accent-gold inline-block" />
              EDITORS' PICKS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {editorsPicks.map((article) => (
                <ArticleCard key={article.id} article={article} variant="compact" />
              ))}
            </div>
          </section>
        )}

        {/* ── Bottom grid ── */}
        {bottomGrid.length > 0 && (
          <section className="py-8">
            <h2 className="font-display tracking-widest text-ink text-xs mb-5 flex items-center gap-3">
              <span className="w-6 h-0.5 bg-accent-blue inline-block" />
              MORE STORIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bottomGrid.map((article) => (
                <ArticleCard key={article.id} article={article} variant="standard" />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
