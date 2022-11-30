import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineLibraryMusic, MdOutlineAlbum, MdOutlineBarChart } from "react-icons/md";

import LogoDark from "../../../assets/Dandelion_logo_dark.PNG";
import {
   IoAccessibilityOutline,
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
import { adminPaths, paths } from "../../../app/routes";
import { useSelector } from "react-redux";
import Login from "../Header/Login";

const Sidebar = () => {
   const currentUser = useSelector((state) => state.user.user);

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
               to={paths.home}
               className={({ isActive }) => (isActive ? navActive : navInactive)}
            >
               <IoDiscOutline className="text-2xl" />
               Explore
            </NavLink>
            {currentUser ? (
               <NavLink
                  to={paths.mymusic}
                  className={({ isActive }) => (isActive ? navActive : navInactive)}
               >
                  <IoAlbumsOutline className="text-2xl" />
                  My Music
               </NavLink>
            ) : (
               <Login
                  children={
                     <button className="flex items-center w-full gap-2 px-6 py-2 border-l-4 border-transparent hover:bg-alpha hover:text-dandelion-primary opacity-80 text-primary">
                        <IoAlbumsOutline className="text-2xl" />
                        My Music
                     </button>
                  }
               />
            )}

            <NavLink
               to={paths.genres}
               className={({ isActive }) => (isActive ? navActive : navInactive)}
            >
               <IoMusicalNotesOutline className="text-2xl" />
               Genres
            </NavLink>
            <NavLink to="/123" className={({ isActive }) => (isActive ? navActive : navInactive)}>
               <IoRadioOutline className="text-2xl" />
               Radio
            </NavLink>

            <NavLink to="/123" className={({ isActive }) => (isActive ? navActive : navInactive)}>
               <IoStarOutline className="text-2xl" />
               Top 100
            </NavLink>
            <NavLink
               to={adminPaths.home}
               className={({ isActive }) => (isActive ? navActive : navInactive)}
            >
               <IoAccessibilityOutline className="text-2xl" />
               Admin
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
