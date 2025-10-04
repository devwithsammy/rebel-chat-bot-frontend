// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content : [
'./src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50: '#f0f0f0',
          100: '#d9d9d9',
          200: '#bfbfbf',
          300: '#969696',
          400: '#5a5a5a',
          500: '#030303', // Your base color
          600: '#020202',
          700: '#010101',
          800: '#000000',
          900: '#000000',
        },
        // accent: {
        //   50: '#f5f3ff',
        //   100: '#ede9fe',
        //   200: '#ddd6fe',
        //   300: '#c4b5fd',
        //   400: '#a78bfa',
        //   500: '#8b5cf6', // Vibrant purple accent
        //   600: '#7c3aed',
        //   700: '#6d28d9',
        //   800: '#5b21b6',
        //   900: '#4c1d95',
        // },
        accent: {
          50:  '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4', // Vibrant cyan/teal accent
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        
      }
    }
  }
}