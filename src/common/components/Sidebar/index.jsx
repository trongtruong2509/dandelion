import React from "react";
import { NavLink } from "react-router-dom";
import {
   MdOutlineLibraryMusic,
   MdOutlineAlbum,
   MdOutlineBarChart,
} from "react-icons/md";

import LogoDark from "../../../assets/Dandelion_logo_dark.PNG";
import {
   IoAlbumsOutline,
   IoBarcodeOutline,
   IoDiamondOutline,
   IoDiscOutline,
   IoMusicalNoteOutline,
   IoMusicalNotesOutline,
   IoOptionsOutline,
   IoRadioOutline,
   IoStarOutline,
} from "react-icons/io5";
// import routes from "./../../../app/routes";

const Sidebar = () => {
   const navActive =
      "bg-dark-alpha-10 border-l-4 border-dandelion-primary px-6 py-2 flex gap-2 items-center opacity-100 text-dandelion-primary font-semibold";
   const navInactive =
      "hover:bg-alpha hover:text-dandelion-primary px-6 py-2 flex gap-2 items-center opacity-80 text-primary border-transparent border-l-4";

   return (
      <div className="flex-shrink-0 h-full text-white w-60 bg-sidebar z-100">
         <div className="w-full h-[70px] py-2 mb-6 flex-center">
            {/* <img className="h-[70px]" src={LogoDark} alt="" /> */}
         </div>

         <div className="flex flex-col">
            <NavLink
               to="/"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoDiscOutline className="text-2xl" />
               Explore
            </NavLink>
            <NavLink
               to="/mymusic"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoAlbumsOutline className="text-2xl" />
               My Music
            </NavLink>

            <NavLink
               to="/22"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoMusicalNotesOutline className="text-2xl" />
               Genres
            </NavLink>
            <NavLink
               to="/123"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoRadioOutline className="text-2xl" />
               Radio
            </NavLink>

            <NavLink
               to="/123"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoStarOutline className="text-2xl" />
               Top 100
            </NavLink>
         </div>

         {/* <NavLink
               to="/123"
               className={({ isActive }) =>
                  isActive ? navActive : navInactive
               }
            >
               <IoBarcodeOutline className="text-2xl" />
               <IoRadioOutline className="text-2xl" />
               <IoMusicalNoteOutline className="text-2xl" />
               <IoOptionsOutline className="text-2xl" />
               <IoDiamondOutline className="text-2xl" />
               Chart
            </NavLink> */}
         {/* <div className="h-[1px] mx-6 my-3 border-b border-secondary"></div> */}
      </div>
   );
};

export default Sidebar;
