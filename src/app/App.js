import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";

import routes, { adminPaths, adminRoutes } from "./routes";
import "./App.css";
import Sidebar from "../common/components/Sidebar";
import Header from "../common/components/Header";
import PlayerQueue from "../common/components/PlayerQueue";
import Playbar from "../common/components/Playbar";
import AdminSidebar from "../admin/components/Sidebar/AdminSidebar";

function App() {
   return (
      <Router>
         <Routes>
            <Route exact path="/" element={<Layout />}>
               {routes.map(({ component: Component, path }) => {
                  return (
                     <Route
                        exact
                        key={path}
                        path={path}
                        element={<Component />}
                     />
                  );
               })}
            </Route>
            <Route exact path={adminPaths.home} element={<AdminLayout />}>
               {adminRoutes.map(({ component: Component, path }) => {
                  return (
                     <Route
                        exact
                        key={path}
                        path={path}
                        element={<Component />}
                     />
                  );
               })}
            </Route>
         </Routes>
      </Router>
   );
}

function Layout() {
   const currentSong = useSelector((state) => state.playing.value)?.info;

   return (
      <>
         <div className="h-screen max-h-screen ">
            <div
               className={`flex w-full z-[100] relative overflow-hidden ${
                  currentSong ? "h-[calc(100vh-90px)]" : "h-full"
               }`}
            >
               <Sidebar />
               <div className="flex flex-col items-stretch h-full flex-grow bg-dark-4 relative overflow-auto">
                  <div className="w-full sticky top-0 left-0 z-[200] bg-dark-4 px-12">
                     <Header />
                  </div>
                  <div className="w-full flex items-stretch overflow-auto px-12 relative overflow-y-scroll overscroll-auto scrollbar flex-grow">
                     <Outlet />
                  </div>
               </div>

               <PlayerQueue />
            </div>
            {currentSong && <Playbar />}
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
               <div className="flex flex-col items-stretch h-full flex-grow bg-dark-4 relative overflow-auto">
                  <div className="w-full sticky top-0 left-0 z-[200] bg-dark-4 px-12">
                     <Header />
                  </div>
                  <div className="w-full flex items-stretch overflow-auto px-12 relative overflow-y-scroll overscroll-auto scrollbar flex-grow">
                     <Outlet />
                  </div>
               </div>
            </div>
            {currentSong && <Playbar />}
         </div>
      </>
   );
}

export default App;
