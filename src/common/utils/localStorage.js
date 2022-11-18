export const localKeys = {
   user: "dan_user",
   nonUser: "dan_non_user",
   playingTrack: "dan_playing_track",
   playbar: "dan_playbar",
   playqueue: "dan_playqueue",
   playlist: "dan_playlist",
   searchHistory: "searchHistory",
   theme: "theme",
};

const write = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
};

const get = (key) => {
   return JSON.parse(localStorage.getItem(key));
};

export const updatePlaying = (data) => {
   write(localKeys.playingTrack, data);
};

export const getPlaying = () => {
   return get(localKeys.playingTrack);
};

export const updateQueue = (data) => {
   write(localKeys.playqueue, data);
};

export const getQueue = () => {
   return get(localKeys.playqueue);
};

export const updatePlaylist = (data) => {
   write(localKeys.playlist, data);
};

export const getPlaylist = () => {
   return get(localKeys.playlist);
};

export const updatePlaybar = (data) => {
   write(localKeys.playbar, data);
};

export const getPlaybar = () => {
   return get(localKeys.playbar);
};

export const writeSearchHistory = (data) => {
   write(localKeys.searchHistory, data);
};

export const getSearchHistory = () => {
   return get(localKeys.searchHistory);
};

export const writeTheme = (data) => {
   write(localKeys.theme, data);
};

export const getTheme = () => {
   return get(localKeys.theme);
};
