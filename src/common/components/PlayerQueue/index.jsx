import React from "react";
import { GiAlarmClock } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const PlayerQueue = () => {
   const activeStyle = "bg-hover-2 text-white";

   return (
      <div className="3xl:w-96 w-80  flex flex-shrink-0 h-full bg-dark-2 border-l border-hover-1">
         <header className="py-[14px] flex justify-center items-center 3xl:gap-2 gap-1 w-full h-[72px]">
            <div className="bg-hover-1 rounded-3xl p-[3px]">
               <button className="3xl:px-3 px-2 py-1 text-sm rounded-3xl text-navigation hover:text-white">
                  Playing Queue
               </button>
               <button className="3xl:px-3 px-2 py-1 text-sm rounded-3xl bg-hover-2 text-white">
                  Recently Played
               </button>
            </div>
            <button className="text-lg bg-hover-1 text-white p-[7px] rounded-full hover:bg-hover-2">
               <GiAlarmClock />
            </button>
            <button className="text-lg bg-hover-1 text-white p-[7px] rounded-full hover:bg-hover-2">
               <HiOutlineDotsHorizontal />
            </button>
         </header>
      </div>
   );
};

export default PlayerQueue;
