/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 0 28px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
