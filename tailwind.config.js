/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx,ts,tsx}"],
   theme: {
      extend: {
         colors: {
            "dark-4": "#17171A",
            "dark-3": "#222226",
            "dark-2": "#242528",
            "dark-1": "#4C4E54",
            "hover-1": "hsla(0,0%,100%,0.1)",
            "overlay-1": "rgba(0,0,0,0.1)",
            "overlay-2": "rgba(0,0,0,0.3)",
            "overlay-3": "rgba(0,0,0,0.5)",
            "overlay-4": "rgba(0,0,0,0.7)",
            "overlay-5": "rgba(0,0,0,0.8)",
         },
         textColor: {
            primary: "rgb(20, 184, 166)",
            secondary: "hsla(0,0%,100%,0.5)",
         },
      },
   },
   plugins: [],
};
