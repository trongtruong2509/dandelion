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
         },
         textColor: {
            secondary: "hsla(0,0%,100%,0.5)",
         },
      },
   },
   plugins: [],
};
