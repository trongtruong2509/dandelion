/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   mode: "jit",
   theme: {
      extend: {
         backgroundColor: {
            primary: "var(--primary-bg)",
            layout: "var(--layout-bg)",
            sidebar: "var(--sidebar-bg)",
            alpha: "var(--alpha-bg)",
            tooltip: "var(--background-tooltip)",
            contrast: "var(--contrast-bg)",
            "contrast-1": "var(--contrast-bg-1)",
            loading: "var(--loading-bg)",
            "no-content": "var(--no-content-bg)",
            "box-item": "var(--box-item-bg)",
            player: "var(--player-bg)",
            "alpha-layout": "var(--alpha-layout-bg)",
            "tab-active": "var(--tab-active-bg)",
            "linear-gradient": "var(--linear-gradient-bg)",
            progressbar: "var(--progressbar-bg)",
            "artist-layout": "var(--artist-layout-bg)",
         },
         colors: {
            white: "var(--white)",
            black: "var(--black)",
            yellow: "var(--yellow)",
            blue: "var(--blue)",
            green: "var(--green)",
            red: "var(--red)",
            gray: "var(--gray)",
            "dark-alpha-10": "var(--dark-alpha-10)",
            "dark-alpha-50": "var(--dark-alpha-50)",
            "dark-alpha-70": "var(--dark-alpha-70)",
            "dark-alpha-80": "var(--dark-alpha-80)",
            "contrast-color": "var(--contrast-color)",
            "hover-tooltip": "var(--hover-tooltip)",
            dandelion: "var(--dandelion)",
         },
         textColor: {
            primary: "var(--text-primary)",
            secondary: "var(--text-secondary)",
            muted: "var(--text-muted)",
            placeholder: "var(--text-placeholder)",
            search: "var(--search-text)",
            player: "var(--player-text)",
            navigation: "var(--navigation-text)",
            "setting-icon": "var(--setting-icon-text)",
            "sidebar-title": "var(--sidebar-title)",
            "item-hover": "var(--text-item-hover)",
            "link-hover": "var(--link-text-hover)",
         },
         borderColor: {
            primary: "var(--border-primary)",
            secondary: "var(--border-secondary)",
            box: "var(--border-box)",
            queue: "var(--queue-border)",
            player: "var(--border-player)",
         },
         boxShadow: {
            "main-box": "var(--main-box-shadow)",
            queue: "var(--box-shadow-queue)",
         },
         width: {
            13: "3.25rem",
            15: "3.75rem",
         },
         height: {
            13: "3.25rem",
            15: "3.75rem",
         },
         keyframes: {
            spin: {
               "0%": {
                  transform: "rotate(0deg)",
               },
               "100%": {
                  transform: "rotate(360deg)",
               },
            },
            spinoff: {
               "0%": {
                  transform: "rotate(0deg)",
               },
               "100%": {
                  transform: "rotate(1turn)",
               },
            },
         },
      },
      screens: {
         sm: "640px",
         // => @media (min-width: 640px) { ... }

         md: "768px",
         // => @media (min-width: 768px) { ... }

         lg: "1024px",
         // => @media (min-width: 1024px) { ... }

         sxl: "1140px",
         // => @media (min-width: 1140px) { ... }

         xl: "1280px",
         // => @media (min-width: 1280px) { ... }

         "2xl": "1536px",
         // => @media (min-width: 1536px) { ... }
         1600: "1600px",
      },
   },
   plugins: [],
});
