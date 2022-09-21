import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Outlet,
} from "react-router-dom";
import { useSelector } from "react-redux";

import { ToastContainer } from "react-toastify";
import routes, { adminPaths, adminRoutes } from "./routes";
import "./App.css";
import Sidebar from "../common/components/Sidebar";
import Header from "../common/components/Header";
import PlayerQueue from "../common/components/PlayerQueue";
import Playbar from "../common/components/Playbar";
import AdminSidebar from "../admin/components/Sidebar/AdminSidebar";

import "react-toastify/dist/ReactToastify.css";
import AdminHeader from "../admin/components/Header/AdminHeader";

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
               <div className="relative flex flex-col items-stretch flex-grow h-full overflow-auto bg-dark-4">
                  <div className="w-full sticky top-0 left-0 z-[200] bg-dark-4 px-12">
                     <Header />
                  </div>
                  <div className="relative flex items-stretch flex-grow w-full px-12 overflow-auto overflow-y-scroll overscroll-auto scrollbar">
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
               <div className="relative flex flex-col items-stretch flex-grow h-full overflow-auto bg-dark-4">
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
               theme="dark"
            />
         </div>
      </>
   );
}

export default App;
