/** @type {import('tailwindcss').Config} */
export default {
  content: ["./entrypoints/**/*.{html,tsx,ts}", "./ui/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        modalBg: "#F9FAFB",
      },
      keyframes: {
        "pop-in": {
          from: { scale: "0" },
          to: { scale: "1" },
        },
      },
      animation: {
        "pop-in": "pop-in 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
