export const songTemplate = {
   id: "", //
   title: "",
   artists: [], //
   artistNames: "",
   audio: "",
   time: "",
   thumbnail: "",
   ablum: "",
   like: false,
   genreIds: [], //
   releaseDate: 0, //
   userId: "",
   isOfficial: false,
};

export const playlistTemplate = {
   id: "",
   title: "",
   createdBy: "",
   description: "",
   link: "",
   thumbnail: "",
   songs: [],
   public: true,
   shuffle: true,
};

export const genreTemplate = {
   id: "",
   name: "",
};

export const userTemplate = {
   id,
   userName,
   mail,
   phone,
   avatar,
   uploaded: [],
   createdPlaylist: [],
   recentPlayed: [], //ids of playlist
   likedSongs: [],
   likedPlaylists: [],
   likedAlbums: [],
};

/*
["1"] Lofi
["2"] Trữ tình & Bolero
["3"] Rap
["4"] Den Vau
["5"] V-pop
["6"] US-UK
 */
