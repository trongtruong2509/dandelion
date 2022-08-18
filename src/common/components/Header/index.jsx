import React from "react";
import { MdEast, MdSearch, MdSettings, MdUpload, MdWest } from "react-icons/md";

import avatar from "./../../../assets/default_avatar.png";

const Header = () => {
   return (
      <div className="w-full bg-transparent flex justify-between items-center py-4">
         <div className="flex gap-8 justify-center items-center">
            <div className="flex gap-4 justify-center items-center">
               <button>
                  <MdWest className="text-white text-2xl" />
               </button>
               <button>
                  <MdEast className="text-white text-2xl opacity-50" />
               </button>
            </div>
            <div className="w-96 relative">
               <input
                  type="text"
                  className="w-full py-2 rounded-3xl outline-none bg-hover-1 pl-10 text-sm text-white"
                  placeholder="Search for song, artist, album..."
               />
               <MdSearch className="absolute top-2 left-3 text-2xl text-white opacity-50" />
            </div>
         </div>
         <div className="flex gap-3 justify-center items-center">
            <div className="w-10 h-10 rounded-full bg-hover-1 flex text-white justify-center items-center">
               <MdUpload className="text-xl" />
            </div>
            <div className="w-10 h-10 rounded-full bg-hover-1 flex text-white justify-center items-center">
               <MdSettings className="text-xl" />
            </div>
            <div>
               <img
                  src={avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
               />
            </div>
         </div>
      </div>
   );
};

export default Header;
