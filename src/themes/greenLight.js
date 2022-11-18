import { themeDefault } from "./base";
import { createTheme } from "./utils";

const greenLightTheme = createTheme({
   ...themeDefault,
   dandelionPrimary: "#0e8080", //
   bgLayout: "#ced9d9", //
   bgPlayer: "#c0d8d8", //
   bgPrimary: "#e0ebeb", //
   bgAlpha: "hsla(0,0%,100%,0.3)",
   bgSidebar: "hsla(0,0%,100%,0.3)",
   bgAlphaLayout: "rgba(115,23,23,0.8)", //
   //    bgLinearGradient: "linear-gradient(180deg,#941c1c,#961919)", //
   bgBoxItem: "hsla(0,0%,100%,0.3)", //
   bgTabActive: "hsla(0,0%,100%,0.3)", //
   bgArtistLayout: "rgba(206,217,217,0.8)", //

   textSecondary: "#696969", //
   textItemHover: "#0f7070", //
   textLinkHover: "#0f7070", //
});

export default greenLightTheme;
