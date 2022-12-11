import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
   IoAccessibilityOutline,
   IoAlbumsOutline,
   IoDiscOutline,
   IoMusicalNotesOutline,
   IoRadioOutline,
   IoStarOutline,
} from "react-icons/io5";

import RecentPlayImg from "../../../assets/headphones_1.png";
import SongsImg from "../../../assets/music.png";
import PlaylistImg from "../../../assets/playlist.png";

import { adminPaths, paths } from "../../../app/routes";
import Login from "../Header/Login";

const Sidebar = () => {
   const currentUser = useSelector((state) => state.user.user);

   return (
      <div className="flex-shrink-0 h-full sxl:w-60 bg-sidebar z-100 w-[70px]">
         <div className="w-full h-[70px] py-2 mb-6 flex-center">
            {/* <img className="h-[70px]" src={LogoDark} alt="" /> */}
         </div>

         <div className="flex flex-col mb-6">
            <SidebarItem path={paths.home} title="Explore" Icon={IoDiscOutline} />

            {currentUser ? (
               <SidebarItem path={paths.mymusic} title="My Music" Icon={IoAlbumsOutline} />
            ) : (
               <Login
                  children={
                     <button className="flex items-center w-full gap-2 px-6 py-2 text-2xl border-l-4 border-transparent hover:bg-alpha hover:text-dandelion-primary opacity-80 text-primary">
                        <IoAlbumsOutline />
                        <p className="hidden text-base sxl:block">My Music</p>
                     </button>
                  }
               />
            )}

            <SidebarItem path={paths.genres} title="Genres" Icon={IoMusicalNotesOutline} />
            <SidebarItem path={paths.radio} title="Radio" Icon={IoRadioOutline} />
            <SidebarItem path={paths.top100} title="Top 100" Icon={IoStarOutline} />
            {currentUser?.id === "tht.tts@gmail.com" && (
               <SidebarItem path={adminPaths.home} title="Admin" Icon={IoAccessibilityOutline} />
            )}
         </div>

         <hr className="h-px mx-auto w-36 text-secondary opacity-30" />
         {currentUser && (
            <div className="flex flex-col pt-6">
               <p className="pl-6 mb-2 text-sm font-semibold text-secondary">LIBRARY</p>
               <SidebarItem path={paths.mymusic} title="Songs" image={SongsImg} />
               <SidebarItem path={paths.playlistLib} title="Playlist" image={PlaylistImg} />
               <SidebarItem path={paths.playHistory} title="Recent Play" image={RecentPlayImg} />
            </div>
         )}
      </div>
   );
};

const SidebarItem = ({ path, title, Icon, image }) => {
   const navActive =
      "bg-dark-alpha-10 border-l-4 border-dandelion-primary sxl:px-6 py-2 flex gap-3 items-center justify-center sxl:justify-start opacity-100 text-dandelion-primary font-semibold text-2xl";
   const navInactive =
      "hover:bg-alpha hover:text-dandelion-primary sxl:px-6 py-2 flex gap-3 items-center justify-center sxl:justify-start opacity-80 text-primary border-transparent border-l-4 text-2xl";

   return (
      <NavLink to={path} className={({ isActive }) => (isActive ? navActive : navInactive)}>
         {image ? <img src={image} alt="" className="object-cover w-6 h-6 rounded-full" /> : <Icon />}
         <p className="hidden text-base sxl:block">{title}</p>
      </NavLink>
   );
};

export default Sidebar;
