/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        clash: ['"Clash Display Variable"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
        cactus: ['"Cactus Classical Serif"', "serif"],
        playfair: ['"Playfair Display"', "Georgia", "serif"],
        caveat: ['"Caveat"', "cursive"],
      },
      backgroundImage: {
        "hero-pattern": "url('/bg_gradient.png')",
        "custom-gold": "linear-gradient(180deg, #3B2D00 0%, #816D00 100%)",
      },
      colors: {
        yellow: "#FFF200",
      },
    },
  },
  plugins: [],
};
