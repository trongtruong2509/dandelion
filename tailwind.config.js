/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         backgroundColor: {
            primary: "var(--bg-primary)",
            "primary-light": "var(--bg-primary-light)",
            // "primary-lighter": "var(--bg-primary-lighter)",
            "primary-dark": "var(--bg-primary-dark)",
            // "primary-darker": "var(--bg-primary-darker)",
         },
         colors: {
            // primary: "rgb(20, 184, 166)",
            primary: "var(--theme-primary)",
            "dark-4": "#17171A",
            "dark-3": "#222226",
            "dark-2": "#242528",
            "dark-1": "#4C4E54",
            "hover-1": "hsla(0,0%,100%,0.1)",
            "hover-2": "hsla(0,0%,100%,0.2)",
            "hover-3": "hsla(0,0%,100%,0.3)",
            "hover-4": "hsla(0,0%,100%,0.4)",
            "hover-5": "hsla(0,0%,100%,0.5)",
            "hover-6": "hsla(0,0%,100%,0.6)",
            "hover-7": "hsla(0,0%,100%,0.7)",
            "hover-8": "hsla(0,0%,100%,0.8)",
            "overlay-1": "rgba(0,0,0,0.1)",
            "overlay-2": "rgba(0,0,0,0.3)",
            "overlay-3": "rgba(0,0,0,0.5)",
            "overlay-4": "rgba(0,0,0,0.7)",
            "overlay-5": "rgba(0,0,0,0.8)",
            "alpha": "rgba(0,0,0,0.05)",
         },
         textColor: {
            primary: "var(--text-primary)",
            // secondary: "hsla(0,0%,100%,0.5)",
            secondary: "var(--text-secondary)",
            // navigation: "var(--text-navigation)",
            "white-custom": "#ffffff",
         },
         width: {
            '13': '3.25rem',
            '15': '3.75rem'
         },
         height: {
            '13': '3.25rem',
            '15': '3.75rem'
         }
      },
      screens: {
         sm: "640px",
         // => @media (min-width: 640px) { ... }

         md: "768px",
         // => @media (min-width: 768px) { ... }

         lg: "1024px",
         // => @media (min-width: 1024px) { ... }

         xl: "1280px",
         // => @media (min-width: 1280px) { ... }

         "2xl": "1540px",
         // => @media (min-width: 1536px) { ... }
      },
   },
   plugins: [],
};
