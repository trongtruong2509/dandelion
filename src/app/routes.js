import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Upload from "../pages/Upload";
import Mymusic from "../pages/Mymusic";
import PlaylistLib from "../pages/Mymusic/PlaylistLib";
import Playlist from "../pages/Playlist";
import Artist from "../pages/Artist";
import Genres from "../pages/Genres/Genres";
import Genre from "../pages/Genres/Genre";
import AdminHome from "../admin/pages/Home/AdminHome";
import MultiUpload from "../admin/pages/Upload/MultiUpload";
import AdminPlaylist from "../admin/pages/Playlist/AdminPlaylist";
import SinglePlaylist from "../admin/pages/Playlist/SinglePlaylist";
import AdminCreatePlaylist from "../admin/pages/Playlist/AdminCreatePlaylist";
import PlayHistory from "../pages/Mymusic/PlayHistory";
import NewRelease from "../pages/NewRelease/NewRelease";

export const paths = {
   home: "/",
   mymusic: "/mymusic",
   playlist: "/playlist/:id",
   artist: "/artist/:id",
   genre: "/genres/:id",
   genres: "/genres",
   playHistory: "/mymusic/history",
   playHistoryId: "/mymusic/history/:id",
   newRelease: "/new-release/:id",
};

export const adminPaths = {
   home: "/admin/",
   tracks: "/admin/tracks",
   uploadZing: "/admin/track/upload-zing",
   artists: "/admin/artists",
   playlists: "/admin/playlists",
   playlistDetail: "/admin/playlist/:id",
   createPlaylist: "/admin/create-playlist",
   users: "/admin/users",
   trackDetail: "/admin/track/:id",
   multiUpload: "/admin/uploadMulti/:id",
};

const routes = [
   { path: "/", component: Home },
   { path: "/login", component: Login },
   { path: "/upload", component: Upload },
   { path: "/mymusic", component: Mymusic },
   { path: "/mymusic/playlist", component: PlaylistLib },
   { path: paths.playHistory, component: PlayHistory },
   { path: paths.playHistoryId, component: PlayHistory },
   { path: paths.newRelease, component: NewRelease },
   { path: paths.genres, component: Genres },
   { path: "/playlist/:id", component: Playlist },
   { path: "/artist/:id", component: Artist },
   { path: paths.genre, component: Genre },
];

export const adminRoutes = [
   { path: adminPaths.home, component: AdminHome },
   { path: adminPaths.multiUpload, component: MultiUpload },
   { path: adminPaths.playlists, component: AdminPlaylist },
   { path: adminPaths.createPlaylist, component: AdminCreatePlaylist },
   { path: adminPaths.playlistDetail, component: SinglePlaylist },
];

export default routes;
