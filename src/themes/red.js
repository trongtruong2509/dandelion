import { themeDefault } from "./base";
import { createTheme } from "./utils";

const redTheme = createTheme({
   ...themeDefault,
   contrastColor: "rgba(20,20,20,0.8)",
   hoverTooltip: "hsla(0,0%,100%,0.3)",
   dandelionPrimary: "#ca4954", //

   bgLayout: "#2e0f10", //
   bgPlayer: "#3b1113", //
   bgPrimary: "#522325", //
   bgAlphaLayout: "rgba(115,23,23,0.8)", //
   bgLinearGradient: "linear-gradient(180deg,#941c1c,#961919)", //
   bgSidebar: "hsla(0,0%,100%,0.05)",
   bgAlpha: "hsla(0,0%,100%,0.1)",
   bgContrast: "rgba(254,255,255,0.4)",
   bgContrast1: "#feffff",
   bgLoading: "hsla(0,0%,100%,0.1)",
   bgNoContent: "hsla(0,0%,100%,0.1)",
   bgBoxItem: "hsla(0,0%,100%,0.1)",
   bgTabActive: "hsla(0,0%,100%,0.3)",
   bgProcessbar: "hsla(0,0%,100%,0.3)",
   bgArtistLayout: "rgba(115,23,23,0.8)",

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
   textLinkHover: "#f2636f", //

   borderPrimary: "hsla(0,0%,100%,0.1)",
   borderSecondary: "hsla(0,0%,100%,0.05)",
   borderBox: "hsla(0,0%,100%,0.2)",
   borderQueue: "transparent",
   borderPlayer: "hsla(0,0%,100%,0.1)",

   shadowMainBox: "rgba(66,66,66,0.4)",
   boxShadowQueue:
      "0 1px 0 rgba(0,0,0,0.3),0 1px 6px rgba(0,0,0,0.3),inset 0 1px 1px rgba(25,255,255,0.05)",
});

export default redTheme;
