/*
[data-theme=blue] {
    --layout-bg: #0f1a2e;
    --player-bg: #111f3b;
    --sidebar-popup-bg: #1d2a49;
    --primary-bg: #173b45;
    --alpha-layout-bg: rgba(16,31,63,0.8);
    --queue-player-popup-bg: #223c75;
    --blur-queue-bg: rgba(16,31,63,0.9019607843137255);
    --dandelion-primary: #158370;
    --link-text-hover: #0daf94;
    --chart-bg-img-alpha: rgba(16,31,63,0.9);
    --chart-box-bg-alpha: hsla(0,0%,100%,0.05);
    --linear-gradient-bg: linear-gradient(180deg,#1b2f5a,#182e5d);
}
[data-theme=blue-light], [data-theme=blue], [data-theme=brown], [data-theme=green], [data-theme=pink], [data-theme=purple], [data-theme=red] {
    --text-placeholder: #dadada;
    --navigation-text: #dadada;
    --sticky-header-box-shadow: rgba(0,0,0,0.1);
    --portal-menu-box-shadow: rgba(0,0,0,0.2);
}

[data-theme=blue-light], [data-theme=blue], [data-theme=brown], [data-theme=dark], [data-theme=green], [data-theme=pink], [data-theme=purple], [data-theme=red] {
    --layout-bg: #1e1e1e;
    --sidebar-bg: hsla(0,0%,100%,0.05);
    --sidebar-popup-bg: #292929;
    --alpha-bg: hsla(0,0%,100%,0.1);
    --contrast-bg: rgba(254,255,255,0.4);
    --contrast-bg-1: #feffff;
    --contrast-color: rgba(20,20,20,0.8);
    --primary-bg: #333;
    --banner-home-dot: #d8d8d8;
    --loading-bg: hsla(0,0%,100%,0.1);
    --loading-bg-animation: hsla(0,0%,100%,0.1);
    --scroll-thumb-bg: hsla(0,0%,100%,0.3);
    --no-content-bg: hsla(0,0%,100%,0.1);
    --box-item-bg: hsla(0,0%,100%,0.1);
    --box-hot-item-bg: rgba(254,255,255,0.05);
    --box-hot-item-bg-hover: rgba(254,255,255,0.1);
    --alpha-layout-bg: rgba(12,3,3,0.8);
    --artist-layout-bg: var(--alpha-layout-bg);
    --tab-active-bg: hsla(0,0%,100%,0.3);
    --queue-player-popup-bg: #2d2f32;
    --kara-lyrics-bg: #1e1e1e;
    --kara-btn-bg: hsla(0,0%,100%,0.1);
    --theme-setting-active: hsla(0,0%,100%,0.15);
    --player-bg: #181818;
    --progressbar-player-bg: hsla(0,0%,100%,0.3);
    --progressbar-active-bg: #fff;
    --select-bg: hsla(0,0%,100%,0.15);
    --text-primary: #fff;
    --text-secondary: hsla(0,0%,100%,0.5);
    --dandelion-primary: #9b4de0;
    --link-text-hover: #c273ed;
    --text-item-hover: #fff;
    --player-text: #fff;
    --text-muted: rgba(254,255,255,0.6);
    --search-text: #eee;
    --text-placeholder: #757575;
    --setting-icon-text: #d8d8d8;
    --navigation-text: #a0a0a0;
    --sidebar-title: hsla(0,0%,100%,0.7);
    --song-item-action: hsla(0,0%,100%,0.5);
    --border-primary: hsla(0,0%,100%,0.1);
    --border-secondary: hsla(0,0%,100%,0.05);
    --border-box: hsla(0,0%,100%,0.2);
    --spotlight-item: #130223;
    --queue-border: transparent;
    --border-player: hsla(0,0%,100%,0.1);
    --main-box-shadow: rgba(66,66,66,0.4);
    --new-release-box-shadow: none;
    --sticky-header-box-shadow: rgba(0,0,0,0.2);
    --notify-box-shadow: rgba(0,0,0,0.6);
    --portal-menu-box-shadow: rgba(0,0,0,0.7);
    --main-text-stroke: #fff;
    --img-banner-artist: url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.52/static/media/bg-dark-artist.291cc2d3.png);
    --image-queue-loader: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/bg-empty-dark.svg);
    --image-queue-video: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/dark-queue-playing-video.svg);
    --playing-mix-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif);
    --img-logo-mp3: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg);
    --empty-podcast-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/record-dark.svg);
    --empty-episode-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/episode-empty-1.png);
    --empty-song-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-fav-song-dark.png);
    --empty-mv-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-mv-dark.png);
    --empty-album-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-album-dark.png);
    --empty-upload-icon: url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/empty-upload-dark.png);
    --box-shadow-queue: 0 1px 0 rgba(0,0,0,0.3),0 1px 6px rgba(0,0,0,0.3),inset 0 1px 1px rgba(25,255,255,0.05);
    --img-playing: url(data:image/gif;base64,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);
    --chart-bg-img-alpha: rgba(30,30,30,0.9);
    --chart-box-bg-alpha: hsla(0,0%,100%,0.05);
    --chart-logo-color: #fff;
    --chart-icon-play-color: var(--dandelion-primary);
}

 */
