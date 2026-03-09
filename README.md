# The Daily Brief — NYT News Reader

A fully functional, editorial-style news website built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**, powered by the **New York Times API**.

## Features

- 📰 **Top Stories** — fetches live headlines by category from the NYT Top Stories API
- 🔍 **Search** — full-text article search via the NYT Article Search API
- 🗂️ **10 Categories** — Home, World, Politics, Technology, Science, Health, Arts, Business, Travel, Style
- 🎨 **Editorial design** — Playfair Display serif headlines, breaking news ticker, hero/featured/list card variants
- 📱 **Responsive** — mobile-first design with hamburger menu
- ⚡ **Fast** — Vite build, lazy image loading, minimal bundle
- 🔒 **Secure** — API key loaded from environment variable, never bundled into source

## Quick Start

### 1. Get an NYT API Key

Sign up for a free key at [developer.nytimes.com](https://developer.nytimes.com/get-started).

Enable the following APIs in your app:
- **Top Stories API**
- **Article Search API**

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_NYT_API_KEY=your_actual_api_key_here
```

### 3. Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx        # Sticky top nav with categories + search
│   ├── Footer.tsx        # Site footer with section links
│   ├── ArticleCard.tsx   # Multi-variant card (hero/featured/standard/compact/list)
│   ├── HomePage.tsx      # Main content layout engine
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── hooks/
│   └── useNews.ts        # useTopStories + useSearch custom hooks
├── services/
│   └── nytApi.ts         # All API calls centralised here
├── types/
│   └── nyt.ts            # TypeScript interfaces
├── constants/
│   └── categories.ts     # Category definitions
├── App.tsx               # Root component, state management
└── main.tsx              # Entry point
```

## Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_NYT_API_KEY` | Your NYT API key from developer.nytimes.com |

## Tech Stack

- [React 19](https://react.dev)
- [TypeScript 5](https://typescriptlang.org)
- [Vite 6](https://vitejs.dev)
- [Tailwind CSS 3](https://tailwindcss.com)
- [NYT APIs](https://developer.nytimes.com/apis)
