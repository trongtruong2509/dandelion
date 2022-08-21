import Home from "../pages/Home";
import Login from "../pages/Login";
import Explore from "../pages/Explore";
import Upload from "../pages/Upload";
import Mymusic from "../pages/Mymusic";
import Playlist from "../pages/Playlist";

const routes = [
   { path: "/", component: Home },
   { path: "/login", component: Login },
   { path: "/explore", component: Explore },
   { path: "/upload", component: Upload },
   { path: "/mymusic", component: Mymusic },
   { path: "/playlist/:id", component: Playlist },
];

export default routes;
