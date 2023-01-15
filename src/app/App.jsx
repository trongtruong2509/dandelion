import React, { useCallback, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import routes, { adminPaths, adminRoutes } from "./routes";
import "./App.css";
import Sidebar from "../common/components/Sidebar";
import Header from "../common/components/Header";
import PlayerQueue from "../common/components/PlayerQueue";
import Playbar from "../common/components/Playbar/Playbar";

import { applyTheme } from "../themes/utils";
import themes from "../themes/themes";
import AdminSidebar from "../admin/components/Sidebar/AdminSidebar";

import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../admin/components/Header/AdminHeader";

function App() {
   const theme = useSelector((state) => state.dandelion.theme);
   const playingTrack = useSelector((state) => state.playing.value);
   const currentPlaylist = useSelector((state) => state.playlist.current.value);

   useEffect(() => {
      if (playingTrack?.playing) {
         document.title = `${playingTrack.info.title} - ${playingTrack.info.artistsNames} | Dandelion Music`;
      } else if (currentPlaylist?.title) {
         document.title = `${currentPlaylist.title} | Dandelion Music`;
      } else {
         document.title = "Dandelion Music";
      }
   }, [playingTrack, currentPlaylist]);

   useEffect(() => {
      let loadedTheme = "baseTheme";
      if (theme) {
         loadedTheme = theme.theme;
      }

      console.log("[loadedTheme]", loadedTheme);

      applyTheme(themes[loadedTheme]);
   }, []);

   return (
      // <React.StrictMode>
      <Router>
         <Routes>
            <Route exact path="/" element={<Layout />}>
               {routes.map(({ component: Component, path }) => {
                  return <Route exact key={path} path={path} element={<Component />} />;
               })}
            </Route>
            <Route exact path={adminPaths.home} element={<AdminLayout />}>
               {adminRoutes.map(({ component: Component, path }) => {
                  return <Route exact key={path} path={path} element={<Component />} />;
               })}
            </Route>
         </Routes>
      </Router>
      // {/* </React.StrictMode> */}
   );
}

function Layout() {
   const currentSong = useSelector((state) => state.playing.value)?.info;
   const ref = useRef();

   // const [y, setY] = useState(0);
   const [active, setActive] = useState(false);

   useEffect(() => {
      const div = ref.current;
      const handleScroll = (e) => {
         setActive(!!e.target.scrollTop);
      };

      if (div) {
         div.addEventListener("scroll", handleScroll);
      }

      return () => {
         div.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <>
         <div className="h-screen max-h-screen ">
            <div
               className={`flex w-full z-[100] relative overflow-hidden ${
                  currentSong ? "h-[calc(100vh-90px)]" : "h-full"
               }`}
            >
               <Sidebar />
               <div className="relative items-stretch flex-grow w-full overflow-y-scroll scrollbar" ref={ref}>
                  <div className="w-full sticky top-0 left-0 z-[200]">
                     <Header active={active} />
                  </div>

                  <div className="px-12" onScroll={(e) => e.stopPropagation()}>
                     <Outlet />
                  </div>
               </div>

               <PlayerQueue />
            </div>
            {currentSong && <Playbar />}
            <ToastContainer
               position="top-right"
               autoClose={2000}
               hideProgressBar={true}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               draggable
               // theme="dark"
            />
         </div>
      </>
   );
}

function AdminLayout() {
   const currentSong = useSelector((state) => state.playing.value)?.info;

   return (
      <>
         <div className="h-screen max-h-screen ">
            <div
               className={`flex w-full z-[100] relative overflow-hidden ${
                  currentSong ? "h-[calc(100vh-90px)]" : "h-full"
               }`}
            >
               <AdminSidebar />
               <div className="relative items-stretch flex-grow h-full overflow-auto flex-c bg-dark-4">
                  <div className="w-full sticky top-0 left-0 z-[200] bg-dark-4 px-12">
                     <AdminHeader />
                  </div>
                  <div className="relative flex items-stretch flex-grow w-full px-12 overflow-auto overflow-y-scroll overscroll-auto scrollbar">
                     <Outlet />
                  </div>
               </div>
            </div>
            {currentSong && <Playbar />}
            <ToastContainer
               position="top-right"
               autoClose={2000}
               hideProgressBar={true}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               draggable
               // theme="dark"
            />
         </div>
      </>
   );
}

export default App;
