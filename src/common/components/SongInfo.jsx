import React from "react";

const SongInfo = ({ info, medium = false, onClick }) => {
   return (
      <div>
         <div className="flex items-center gap-3 text-white">
            <div className="flex-shrink-0">
               <img
                  src={info?.thumbnail}
                  alt={info?.title}
                  className={`object-cover rounded-md ${
                     medium ? "w-[60px] h-[60px]" : "w-10 h-10"
                  }`}
               />
            </div>
            <div className="max-w-[220px]">
               <h1
                  className="text-sm hover:text-primary cursor-pointer truncate w-full"
                  onClick={onClick}
               >
                  {info?.title}
               </h1>
               <p className="text-xs text-secondary truncate">
                  {info?.artistNames}
               </p>
            </div>
         </div>
      </div>
   );
};

export default SongInfo;
