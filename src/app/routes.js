import Home from "../pages/Home";
import Login from "../pages/Login";
import Explore from "../pages/Explore";
import Upload from "../pages/Upload";
import Mymusic from "../pages/Mymusic";
import PlaylistLib from "../pages/Mymusic/PlaylistLib";
import Playlist from "../pages/Playlist";
import Artist from "../pages/Artist";

const routes = [
   { path: "/", component: Home },
   { path: "/login", component: Login },
   { path: "/explore", component: Explore },
   { path: "/upload", component: Upload },
   { path: "/mymusic", component: Mymusic },
   { path: "/mymusic/playlist", component: PlaylistLib },
   { path: "/playlist/:id", component: Playlist },
   { path: "/artist/:id", component: Artist },
];

export default routes;
