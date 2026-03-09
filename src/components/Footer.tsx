// ============================================================
// Footer — site footer with links and attribution
// ============================================================

import { CATEGORIES } from '../constants/categories';
import type { NewsCategory } from '../types/nyt';

interface FooterProps {
  onCategoryChange: (cat: NewsCategory) => void;
}

export default function Footer({ onCategoryChange }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper-warm mt-16">
      {/* Newsletter strip */}
      <div className="border-b border-paper-warm/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl tracking-widest text-paper">
              STAY INFORMED
            </h3>
            <p className="font-sans text-paper-warm/60 text-sm mt-1">
              Real journalism from The New York Times.
            </p>
          </div>
          <a
            href="https://www.nytimes.com/subscription"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 font-display tracking-widest text-sm px-8 py-3 border border-paper-warm/30 text-paper-warm hover:bg-paper-warm hover:text-ink transition-colors duration-200"
          >
            SUBSCRIBE TO NYT
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="font-display text-2xl tracking-widest text-paper leading-none">
            THE DAILY BRIEF
          </h2>
          <p className="font-serif italic text-paper-warm/50 text-xs mt-2">
            Powered by The New York Times API
          </p>
          <p className="font-sans text-paper-warm/40 text-xs mt-4 leading-relaxed">
            An open-source news reader built with React 19, TypeScript, Vite, and Tailwind CSS.
          </p>
        </div>

        {/* Sections */}
        <div>
          <h4 className="font-display tracking-widest text-paper-warm/50 text-xs mb-4">SECTIONS</h4>
          <ul className="space-y-2">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <li key={cat.key}>
                <button
                  onClick={() => onCategoryChange(cat.key)}
                  className="font-sans text-paper-warm/70 text-sm hover:text-paper transition-colors"
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display tracking-widest text-paper-warm/50 text-xs mb-4">MORE</h4>
          <ul className="space-y-2">
            {CATEGORIES.slice(6).map((cat) => (
              <li key={cat.key}>
                <button
                  onClick={() => onCategoryChange(cat.key)}
                  className="font-sans text-paper-warm/70 text-sm hover:text-paper transition-colors"
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Credits */}
        <div>
          <h4 className="font-display tracking-widest text-paper-warm/50 text-xs mb-4">BUILT WITH</h4>
          <ul className="space-y-2 font-sans text-paper-warm/70 text-sm">
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>Tailwind CSS</li>
            <li>
              <a
                href="https://developer.nytimes.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-paper transition-colors"
              >
                NYT API ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-paper-warm/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-sans text-paper-warm/30">
          <span>© {year} The Daily Brief. Not affiliated with The New York Times Company.</span>
          <span>
            Data provided by{' '}
            <a
              href="https://developer.nytimes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper-warm/60 transition-colors underline"
            >
              The New York Times API
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
