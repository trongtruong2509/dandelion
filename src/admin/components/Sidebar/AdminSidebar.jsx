import React from "react";
import { NavLink } from "react-router-dom";

import { adminPaths } from "../../../app/routes";
import {
   IoGridOutline,
   IoHeadsetOutline,
   IoLayersOutline,
   IoRibbonOutline,
} from "react-icons/io5";

const AdminSidebar = () => {
   const navActive =
      "bg-dark-alpha-10 border-l-4 border-dandelion-primary px-6 py-2 flex gap-2 items-center opacity-100 text-dandelion-primary font-semibold";
   const navInactive =
      "hover:bg-alpha hover:text-dandelion-primary px-6 py-2 flex gap-2 items-center opacity-80 text-primary border-transparent border-l-4";

   return (
      <div className="flex-shrink-0 h-full w-72 bg-sidebar text-primary z-100">
         <div className="flex items-center h-[70px] justify-center w-full py-2 mb-6">
            {/* <img className="h-[70px]" src={LogoDark} alt="" /> */}
         </div>

         <div className="flex flex-col">
            <NavLink
               to={adminPaths.home}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoHeadsetOutline className="text-2xl" />
               Tracks
            </NavLink>
            <NavLink
               to={adminPaths.playlists}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoGridOutline className="text-2xl" />
               Playlists
            </NavLink>
            <NavLink
               to={adminPaths.artists}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoRibbonOutline className="text-2xl" />
               Artists
            </NavLink>

            {/* <NavLink
               to={adminPaths.users}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineBarChart className="text-2xl" />
               Users
            </NavLink> */}
            <NavLink
               to={adminPaths.users}
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoLayersOutline className="text-2xl" />
               Genres
            </NavLink>
         </div>
      </div>
   );
};

export default AdminSidebar;
