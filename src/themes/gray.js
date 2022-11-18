import { themeDefault } from "./base";
import { createTheme } from "./utils";

const grayTheme = createTheme({
   ...themeDefault,
   dandelionPrimary: "#644646", //
   bgLayout: "#e5e3df", //
   bgPlayer: "#dedad1", //
   bgPrimary: "#f7f5f3", //
   bgAlphaLayout: "rgba(115,23,23,0.8)", //
   //    bgLinearGradient: "linear-gradient(180deg,#941c1c,#961919)", //
   bgBoxItem: "hsla(0,0%,100%,0.3)", //
   bgTabActive: "hsla(0,0%,100%,0.3)", //
   bgArtistLayout: "rgba(229,227,223,0.8)", //

   textSecondary: "#696969", //
   textItemHover: "#844d4d", //
   textLinkHover: "#844d4d", //
});

export default grayTheme;
