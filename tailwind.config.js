/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(152, 60%, 18%)",
          foreground: "hsl(60, 30%, 96%)",
        },
        accent: {
          DEFAULT: "hsl(45, 80%, 55%)",
          foreground: "hsl(152, 60%, 12%)",
        },
        background: "hsl(60, 20%, 98%)",
        foreground: "hsl(152, 30%, 10%)",
        secondary: {
          DEFAULT: "hsl(152, 20%, 94%)",
          foreground: "hsl(152, 30%, 10%)",
        },
        muted: {
          DEFAULT: "hsl(152, 15%, 92%)",
          foreground: "hsl(152, 20%, 40%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(152, 30%, 10%)",
        },
        border: "hsl(152, 15%, 88%)",
        destructive: {
          DEFAULT: "hsl(0, 84%, 60%)",
          foreground: "hsl(0, 0%, 100%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};