// ============================================================
// ArticleCard — renders a single article in various sizes
// ============================================================

import type { Article } from '../types/nyt';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'featured' | 'standard' | 'compact' | 'list';
}

// Fallback placeholder when no image is available
const PLACEHOLDER_IMAGE = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23F5F3EE'/%3E%3Crect x='350' y='175' width='100' height='100' rx='4' fill='%23D1CFC9'/%3E%3Cpath d='M370 235 l20-30 l15 20 l10-15 l25 25' stroke='%23B0ADA6' stroke-width='2' fill='none'/%3E%3Ccircle cx='385' cy='205' r='8' fill='%23B0ADA6'/%3E%3C/svg%3E`;

/**
 * Formats a date string into a readable short format.
 */
function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/**
 * Formats a section name for display (capitalised).
 */
function formatSection(section: string): string {
  return section
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function ArticleCard({ article, variant = 'standard' }: ArticleCardProps) {
  const { title, abstract, url, byline, publishedDate, section, imageUrl } = article;
  const imgSrc = imageUrl ?? PLACEHOLDER_IMAGE;
  const sectionLabel = formatSection(section || 'News');
  const dateLabel = formatDate(publishedDate);

  // ── HERO variant ────────────────────────────────────────────────────────
  if (variant === 'hero') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block relative overflow-hidden bg-ink-soft aspect-[16/9] md:aspect-[21/9]"
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
          loading="eager"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <span className="inline-block font-display text-accent-gold tracking-widest text-xs md:text-sm mb-3">
            {sectionLabel.toUpperCase()}
          </span>
          <h2 className="font-serif text-white text-2xl md:text-4xl lg:text-5xl leading-tight mb-3 group-hover:text-paper-warm transition-colors">
            {title}
          </h2>
          {abstract && (
            <p className="hidden md:block font-sans text-paper-warm/80 text-sm md:text-base leading-relaxed max-w-3xl line-clamp-2">
              {abstract}
            </p>
          )}
          <div className="flex items-center gap-3 mt-4 text-paper-warm/60 text-xs font-sans">
            {byline && <span>{byline}</span>}
            {byline && <span>·</span>}
            <span>{dateLabel}</span>
          </div>
        </div>
      </a>
    );
  }

  // ── FEATURED variant ────────────────────────────────────────────────────
  if (variant === 'featured') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col bg-paper-card border border-ink/8 overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative overflow-hidden aspect-[3/2]">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 font-display text-[10px] tracking-widest bg-accent-red text-white px-2 py-1">
            {sectionLabel.toUpperCase()}
          </span>
        </div>
        <div className="flex-1 p-4 md:p-5 flex flex-col gap-2">
          <h3 className="font-serif text-ink text-lg md:text-xl leading-snug group-hover:text-accent-red transition-colors line-clamp-3">
            {title}
          </h3>
          {abstract && (
            <p className="font-sans text-ink-muted text-sm leading-relaxed line-clamp-2 flex-1">
              {abstract}
            </p>
          )}
          <div className="flex items-center gap-2 text-ink-muted/70 text-xs font-sans pt-2 border-t border-ink/8">
            {byline && <span className="truncate">{byline}</span>}
            {byline && <span className="flex-shrink-0">·</span>}
            <span className="flex-shrink-0">{dateLabel}</span>
          </div>
        </div>
      </a>
    );
  }

  // ── LIST variant ────────────────────────────────────────────────────────
  if (variant === 'list') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-4 py-4 border-b border-ink/10 last:border-0 hover:bg-paper-warm/50 transition-colors -mx-2 px-2"
      >
        {imageUrl && (
          <div className="flex-shrink-0 w-24 h-16 md:w-28 md:h-20 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <span className="font-display text-[10px] tracking-widest text-accent-red">
            {sectionLabel.toUpperCase()}
          </span>
          <h4 className="font-serif text-ink text-sm md:text-base leading-snug mt-0.5 group-hover:text-accent-red transition-colors line-clamp-2">
            {title}
          </h4>
          <span className="text-ink-muted/60 text-xs font-sans mt-1 block">{dateLabel}</span>
        </div>
      </a>
    );
  }

  // ── COMPACT variant ─────────────────────────────────────────────────────
  if (variant === 'compact') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex gap-3 p-3 bg-paper-card border border-ink/8 hover:border-accent-red/40 hover:shadow-md transition-all duration-200"
      >
        {imageUrl && (
          <div className="flex-shrink-0 w-20 h-14 overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-ink text-sm leading-snug group-hover:text-accent-red transition-colors line-clamp-2">
            {title}
          </h4>
          <span className="text-ink-muted/60 text-[11px] font-sans mt-1 block">{dateLabel}</span>
        </div>
      </a>
    );
  }

  // ── STANDARD variant (default) ──────────────────────────────────────────
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-paper-card border border-ink/8 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full"
    >
      <div className="relative overflow-hidden aspect-video">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-2 left-2 font-display text-[10px] tracking-widest bg-ink/80 text-white px-2 py-0.5">
          {sectionLabel.toUpperCase()}
        </span>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-2">
        <h3 className="font-serif text-ink text-base md:text-lg leading-snug group-hover:text-accent-red transition-colors line-clamp-3">
          {title}
        </h3>
        {abstract && (
          <p className="font-sans text-ink-muted text-xs md:text-sm leading-relaxed line-clamp-2 flex-1">
            {abstract}
          </p>
        )}
        <div className="flex items-center gap-2 text-ink-muted/60 text-xs font-sans pt-2 border-t border-ink/8">
          {byline && <span className="truncate">{byline}</span>}
          {byline && <span className="flex-shrink-0">·</span>}
          <span className="flex-shrink-0">{dateLabel}</span>
        </div>
      </div>
    </a>
  );
}
