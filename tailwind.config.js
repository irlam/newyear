/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: "#ff006e",
          blue: "#00f0ff",
          green: "#00ff41",
          purple: "#8338ec",
          yellow: "#ffbe0b",
        },
      },
      boxShadow: {
        neon: "0 0 5px #00f0ff, 0 0 20px #00f0ff",
        "neon-pink": "0 0 5px #ff006e, 0 0 20px #ff006e",
        "neon-green": "0 0 5px #00ff41, 0 0 20px #00ff41",
      },
    },
  },
  plugins: [],
}