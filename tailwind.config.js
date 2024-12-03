/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sophisticated color palette
        'syncly-primary': '#1A365D',      // Deep navy blue
        'syncly-secondary': '#2C5282',    // Slightly lighter navy
        'syncly-accent': '#4299E1',       // Bright yet elegant blue
        'syncly-background': '#F7FAFC',   // Soft, light gray-blue
        'syncly-text': '#2D3748',         // Dark slate gray
        'syncly-muted': '#718096'         // Soft gray for secondary text
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
};
