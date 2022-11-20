import { themeDefault } from "./base";
import { createTheme } from "./utils";

const pinkTheme = createTheme({
   ...themeDefault,
   contrastColor: "rgba(20,20,20,0.8)",
   hoverTooltip: "hsla(0,0%,100%,0.3)",
   dandelionPrimary: "#ca4974", //

   bgLayout: "#411636", //
   bgPlayer: "#4c1a3f", //
   bgPrimary: "#642654", //
   bgAlphaLayout: "rgba(128,0,100,0.8)", //
   bgLinearGradient: "linear-gradient(96deg,#ff64dc,#d631a1 102%)", //
   bgSidebar: "hsla(0,0%,100%,0.05)",
   bgAlpha: "hsla(0,0%,100%,0.1)",
   bgContrast: "rgba(254,255,255,0.4)",
   bgContrast1: "#feffff",
   bgLoading: "hsla(0,0%,100%,0.1)",
   bgNoContent: "hsla(0,0%,100%,0.1)",
   bgBoxItem: "hsla(0,0%,100%,0.1)",
   bgTabActive: "hsla(0,0%,100%,0.3)",
   bgProcessbar: "hsla(0,0%,100%,0.3)",
   bgArtistLayout: "rgba(128,0,100,0.8)",

   textPrimary: "#fff",
   textSecondary: "hsla(0,0%,100%,0.5)",
   textMuted: "rgba(254,255,255,0.6)",
   textPlaceholder: "#dadada",
   searchText: "#eee",
   textSettingIcon: "#d8d8d8",
   textNavigation: "#dadada",
   textSidebarTitle: "hsla(0,0%,100%,0.7)",
   textPlayer: "#fff",
   textItemHover: "#fff",
   textLinkHover: "#e9638f", //

   borderPrimary: "hsla(0,0%,100%,0.1)",
   borderSecondary: "hsla(0,0%,100%,0.05)",
   borderBox: "hsla(0,0%,100%,0.2)",
   borderQueue: "transparent",
   borderPlayer: "hsla(0,0%,100%,0.1)",

   shadowMainBox: "rgba(66,66,66,0.4)",
   boxShadowQueue:
      "0 1px 0 rgba(0,0,0,0.3),0 1px 6px rgba(0,0,0,0.3),inset 0 1px 1px rgba(25,255,255,0.05)",
});

export default pinkTheme;
