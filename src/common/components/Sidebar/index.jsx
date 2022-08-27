import React from "react";
import { NavLink } from "react-router-dom";
import {
   MdOutlineLibraryMusic,
   MdOutlineAlbum,
   MdOutlineBarChart,
} from "react-icons/md";

import LogoDark from "../../../assets/Dandelion_logo_dark.PNG";
// import routes from "./../../../app/routes";

const Sidebar = () => {
   const navActive = "bg-hover-1 px-6 py-2 flex gap-2 items-center opacity-100";
   const navInactive =
      "hover:bg-hover-1 px-6 py-2 flex gap-2 items-center opacity-80";

   return (
      <div className="h-full w-72 bg-dark-2 text-white z-100">
         <div className="w-full flex justify-center items-center py-2 mb-6">
            <img className="h-[70px]" src={LogoDark} alt="" />
         </div>

         <div className="flex flex-col">
            <NavLink
               to="/"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineAlbum className="text-2xl" />
               Explore
            </NavLink>
            <NavLink
               to="/mymusic"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineLibraryMusic className="text-2xl" />
               My Music
            </NavLink>
            <NavLink
               to="/123"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineBarChart className="text-2xl" />
               Chart
            </NavLink>
            <div className="h-[1px] mx-6 my-3 border-b border-hover-1"></div>
         </div>
         <div className="flex flex-col">
            <NavLink
               to="/22"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineLibraryMusic className="text-2xl" />
               Home
            </NavLink>
            <NavLink
               to="/123"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineAlbum className="text-2xl" />
               Explore
            </NavLink>
            <NavLink
               to="/123"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <MdOutlineBarChart className="text-2xl" />
               Chart
            </NavLink>
            {/* <div className="h-[1px] mx-6 my-3 border-b border-hover-1"></div> */}
         </div>
      </div>
   );
};

export default Sidebar;
