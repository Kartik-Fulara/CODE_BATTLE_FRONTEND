/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,

  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './Components/**/*.{js,ts,jsx,tsx}',
    './Models/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'index-bg': "url('/bg/index-bg.jpg')",
      },
      fontFamily: {
        'battle-bot-italic': ['BATTLE-BOT-ITALIC', 'sans-serif'],
      },
      keyframes: {
        "fadeInOut": {
          "0%": {
            opacity: "0",
            transform: " translateY(-50px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          }  
        }
      },
      screens: {
        'xs': '100px',
      }
    },
  },
  plugins: [],
}
