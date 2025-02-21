import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "#8ab8ff",
        light: {
          url: "#1a0dab",
          text: "#081b33",
          background: "#ededed",
          card: "#ededed",
        },
        dark: {
          url: "#8ab4f8",
          text: "#ededed",
          background: "#081b33",
          card: "#152642",
        },
        custom: {
          red: {
            100: "#ffa6b0",
            300: "#ff7383",
            500: "#f2495c",
            700: "#e02f44",
            900: "#c4162a",
          },
          orange: {
            100: "#ffcb7d",
            300: "#ffb357",
            500: "#ff9830",
            700: "#ff780a",
            900: "#fa6400",
          },
          yellow: {
            100: "#fff899",
            300: "#ffee52",
            500: "#fade2a",
            700: "#f2cc0c",
            900: "#e0b400",
          },
          green: {
            100: "#c8f2c2",
            300: "#96d98d",
            500: "#73bf69",
            700: "#56a64b",
            900: "#37872d",
          },
          blue: {
            100: "#c0d8ff",
            300: "#8ab8ff",
            500: "#5794f2",
            700: "#3274d9",
            900: "#1f60c4",
          },
          purple: {
            100: "#deb6f2",
            300: "#ca95e5",
            500: "#b877d9",
            700: "#a352cc",
            900: "#8f3bb8",
          },
          brown: {
            100: "#EBBB8F",
            300: "#DB9C60",
            500: "#BD7839",
            700: "#9E5A1B",
            900: "#7A4615",
          },
          gray: {
            100: "#EDEDED",
            300: "#CFD1D6",
            500: "#B2B5C0",
            700: "#9499A9",
            900: "#767D92",
          },
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        roboto: ['var("--font-roboto")'],
        raleway: ['var("--font-raleway")'],
      },
    },
  },
  plugins: [animate],
};
export default config;
