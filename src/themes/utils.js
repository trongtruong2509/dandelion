export function applyTheme(theme) {
   // console.log("[theme]", theme);

   const root = document.documentElement;
   Object.keys(theme).forEach((cssVar) => {
      root.style.setProperty(cssVar, theme[cssVar]);
   });
}

export function createTheme(theme) {
   return {
      "--white": theme.white,
      "--black": theme.black,
      "--yellow": theme.yellow,
      "--blue": theme.blue,
      "--green": theme.green,
      "--red": theme.red,
      "--gray": theme.gray,
      "--dark-alpha-10": theme.darkAlpha10,
      "--dark-alpha-50": theme.darkAlpha50,
      "--dark-alpha-70": theme.darkAlpha70,
      "--dark-alpha-80": theme.darkAlpha80,
      "--contrast-color": theme.contrastColor,
      "--hover-tooltip": theme.hoverTooltip,
      "--dandelion": theme.dandelionPrimary,

      "--primary-bg": theme.bgPrimary,
      "--layout-bg": theme.bgLayout,
      "--sidebar-bg": theme.bgSidebar,
      "--alpha-bg": theme.bgAlpha,
      "--background-tooltip": theme.bgTooltip,
      "--contrast-bg": theme.bgContrast,
      "--contrast-bg-1": theme.bgContrast1,
      "--loading-bg": theme.bgLoading,
      "--no-content-bg": theme.bgNoContent,
      "--box-item-bg": theme.bgBoxItem,
      "--player-bg": theme.bgPlayer,
      "--alpha-layout-bg": theme.bgAlphaLayout,
      "--tab-active-bg": theme.bgTabActive,
      "--progressbar-bg": theme.bgProcessbar,
      "--linear-gradient-bg": theme.bgLinearGradient,
      "--artist-layout-bg": theme.bgArtistLayout,

      "--text-primary": theme.textPrimary,
      "--text-secondary": theme.textSecondary,
      "--text-muted": theme.textMuted,
      "--text-placeholder": theme.textPlaceholder,
      "--search-text": theme.searchText,
      "--setting-icon-text": theme.textSettingIcon,
      "--navigation-text": theme.textNavigation,
      "--sidebar-title": theme.textSidebarTitle,
      "--player-text": theme.textPlayer,
      "--text-item-hover": theme.textItemHover,
      "--link-text-hover": theme.textLinkHover,

      "--border-primary": theme.borderPrimary,
      "--border-secondary": theme.borderSecondary,
      "--border-box": theme.borderBox,
      "--queue-border": theme.borderQueue,
      "--border-player": theme.borderPlayer,

      "--main-box-shadow": theme.shadowMainBox,
      "--box-shadow-queue": theme.boxShadowQueue,
   };
}

// :root, [data-theme=green-light], [data-theme=light], [data-theme=pink-light], [data-theme=yellow] {
//     --playing-mix-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing-purple.gif);
//     --img-playing: url(data:image/gif;base64,R0lGODlhZABkALMPAGVlZcjIyHZ2diwsLPr6+nd3dxcXF8nJyRoaGnBwcC0tLSkpKfv7+2ZmZhQUFP///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAzIDc5LjE2NDUyNywgMjAyMC8xMC8xNS0xNzo0ODozMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjMzlkNTBmNS1jZjdjLTRhNmUtOTEwOC04ZDNhOTcwYjM0MGUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTY3NEJEQUYwMTk5MTFFQzg1MjFDMTZCMDgzNTBGMTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTY3NEJEQUUwMTk5MTFFQzg1MjFDMTZCMDgzNTBGMTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjEgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5YmM4MzFiOC1jZDUwLTRjNWQtYTAwZi01NWZlNjA4YTFhYmQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5NDQ5NzIxOC1hYjA5LTMzNDctYjhiZC0yOTc5MDlk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);

//     --empty-podcast-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/record-light.svg);
//     --empty-episode-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/episode-empty.png);
//     --empty-song-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-fav-song.png);
//     --empty-mv-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv.png);
//     --empty-album-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-album.png);
//     --empty-upload-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-upload.png);
// }
