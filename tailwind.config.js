/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

  ],
  theme: {
    extend: {
    /* screens: {
        'xs': '320px', 
        'sm': '375px', 
        'md': '414px', 
        'lg': '480px',
        'tablet-sm': '600px', 
        'tablet-md': '768px', 
        'tablet-lg': '834px', 
        'desktop-sm': '1280px',
        'desktop-md': '1366px', 
        'desktop-lg': '1440px', 
        'desktop-xl': '1920px', 
        'desktop-2xl': '2560px', 
        'desktop-3xl': '3840px', 
      },*/
      screens: {
    /*    'max-834': { 'max': '834px' }, // This creates a max-width media query
        'max-480': { 'max': '480px' },
       
        'max-768': { 'min': '479px' },
        'min-835': { 'min': '835px' },*/
       // 'max-480': { 'max': '480px' },
       // 'min-479': { 'min': '600px' },
        //'min-835': { 'min': '835px' },
        'max-480': { 'max': '480px' },
        'min-481-max-834': { 'min': '481px', 'max': '834px' },
        'min-835': { 'min': '835px' },
      },
    },
  },
  plugins: [],
}