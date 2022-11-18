import { themeDefault } from "./base";
import { createTheme } from "./utils";

const pinkLightTheme = createTheme({
   ...themeDefault,
   dandelionPrimary: "#b72479", //
   bgLayout: "#f9dbdb", //
   bgPlayer: "#f9c6c5", //
   bgPrimary: "#fde8e8", //
   bgSidebar: "hsla(0,0%,100%,0.3)",
   bgAlphaLayout: "rgba(115,23,23,0.8)", //
   //    bgLinearGradient: "linear-gradient(180deg,#941c1c,#961919)", //
   bgBoxItem: "hsla(0,0%,100%,0.3)", //
   bgTabActive: "hsla(0,0%,100%,0.3)", //
   bgArtistLayout: "rgba(249,219,219,0.8)", //

   textSecondary: "#696969", //
   textItemHover: "#b72479", //
   textLinkHover: "#b72479", //
});

export default pinkLightTheme;
