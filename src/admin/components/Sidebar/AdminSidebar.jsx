import React from "react";
import { NavLink } from "react-router-dom";
import {
   MdOutlineLibraryMusic,
   MdOutlineAlbum,
   MdOutlineBarChart,
} from "react-icons/md";

import LogoDark from "../../../assets/Dandelion_logo_dark.PNG";
import { adminPaths } from "../../../app/routes";

const AdminSidebar = () => {
   const navActive = "bg-hover-1 px-6 py-3 flex gap-2 items-center opacity-100";
   const navInactive =
      "hover:bg-hover-1 px-6 py-3 flex gap-2 items-center opacity-80";

   return (
      <div className="h-full w-72 bg-dark-2 text-white z-100 flex-shrink-0">
         <div className="w-full flex justify-center items-center py-2 mb-6">
            <img className="h-[70px]" src={LogoDark} alt="" />
         </div>

         <div className="flex flex-col">
            <NavLink
               to={adminPaths.home}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineAlbum className="text-2xl" />
               Tracks
            </NavLink>
            <NavLink
               to={adminPaths.artists}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineLibraryMusic className="text-2xl" />
               Artists
            </NavLink>
            <NavLink
               to={adminPaths.playlists}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineBarChart className="text-2xl" />
               Playlists
            </NavLink>
            <NavLink
               to={adminPaths.users}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineBarChart className="text-2xl" />
               Users
            </NavLink>
            <NavLink
               to={adminPaths.users}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineBarChart className="text-2xl" />
               Configurations
            </NavLink>
         </div>
      </div>
   );
};

export default AdminSidebar;
