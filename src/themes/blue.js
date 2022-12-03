import { themeDefault } from "./base";
import { createTheme } from "./utils";

const blueTheme = createTheme({
   ...themeDefault,
   contrastColor: "rgba(20,20,20,0.8)",
   hoverTooltip: "hsla(0,0%,100%,0.3)",
   dandelionPrimary: "#3b68ef", //

   bgPrimary: "#173b45", //
   bgLayout: "#0f1a2e", //
   bgSidebar: "hsla(0,0%,100%,0.05)",
   bgAlpha: "hsla(0,0%,100%,0.1)",
   bgContrast: "rgba(254,255,255,0.4)",
   bgContrast1: "#feffff",
   bgLoading: "hsla(0,0%,100%,0.1)",
   bgNoContent: "hsla(0,0%,100%,0.1)",
   bgBoxItem: "hsla(0,0%,100%,0.1)",
   bgPlayer: "#111f3b", //
   bgAlphaLayout: "rgba(16,31,63,0.8)", //
   bgTabActive: "hsla(0,0%,100%,0.3)",
   bgLinearGradient: "linear-gradient(180deg,#1b2f5a,#182e5d)", //
   bgProcessbar: "hsla(0,0%,100%,0.3)",
   bgArtistLayout: "rgba(16,31,63,0.8)",

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
   textLinkHover: "#0daf94", //

   borderPrimary: "hsla(0,0%,100%,0.1)",
   borderSecondary: "hsla(0,0%,100%,0.05)",
   borderBox: "hsla(0,0%,100%,0.2)",
   borderQueue: "transparent",
   borderPlayer: "hsla(0,0%,100%,0.1)",

   shadowMainBox: "rgba(66,66,66,0.4)",
   boxShadowQueue:
      "0 1px 0 rgba(0,0,0,0.3),0 1px 6px rgba(0,0,0,0.3),inset 0 1px 1px rgba(25,255,255,0.05)",
});

export default blueTheme;
