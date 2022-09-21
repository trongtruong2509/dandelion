import Home from "../pages/Home";
import Login from "../pages/Login";
import Explore from "../pages/Explore";
import Upload from "../pages/Upload";
import Mymusic from "../pages/Mymusic";
import Playlist from "../pages/Playlist";
import Artist from "../pages/Artist";
import AdminHome from "../admin/pages/Home/AdminHome";
import UploadZing from "../admin/pages/Track/UploadZing";
import MultiUpload from "../admin/pages/Upload/MultiUpload";

export const paths = {
   home: "/",
   mymusic: "/mymusic",
   playlist: "/playlist/:id",
   artist: "/artist/:id",
};

export const adminPaths = {
   home: "/admin",
   tracks: "/admin/tracks",
   uploadZing: "/admin/track/upload-zing",
   artists: "/admin/artists",
   playlists: "/admin/playlists",
   users: "/admin/users",
   trackDetail: "/admin/track/:id",
   multiUpload: "/admin/uploadMulti/:id",
};

const routes = [
   { path: "/", component: Home },
   { path: "/login", component: Login },
   { path: "/explore", component: Explore },
   { path: "/upload", component: Upload },
   { path: "/mymusic", component: Mymusic },
   { path: "/playlist/:id", component: Playlist },
   { path: "/artist/:id", component: Artist },
];

export const adminRoutes = [
   { path: adminPaths.home, component: AdminHome },
   { path: adminPaths.multiUpload, component: MultiUpload },
];

export default routes;
