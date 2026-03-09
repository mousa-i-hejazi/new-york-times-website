/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Playfair Display for editorial headlines
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        // DM Sans for clean body text
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        // Bebas Neue for category labels
        display: ['"Bebas Neue"', 'sans-serif'],
      },
      colors: {
        // Flat color names avoid Tailwind DEFAULT key resolution issues
        'ink':        '#0A0A0A',
        'ink-soft':   '#1C1C1E',
        'ink-muted':  '#3A3A3C',
        'paper':      '#FAFAF8',
        'paper-warm': '#F5F3EE',
        'paper-card': '#FFFFFF',
        'accent-red':  '#C8102E',
        'accent-gold': '#B8963E',
        'accent-blue': '#003580',
      },
    },
  },
  plugins: [],
}
