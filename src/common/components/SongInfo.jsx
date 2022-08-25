import React from "react";

const SongInfo = ({ info, medium = false, onClick }) => {
   return (
      <div>
         <div className="flex items-center gap-3 text-white">
            <div>
               <img
                  src={info?.thumbnail}
                  alt={info?.title}
                  className={`object-cover rounded-md ${
                     medium ? "w-[60px] h-[60px]" : "w-10 h-10"
                  }`}
               />
            </div>
            <div>
               <h1
                  className="text-sm hover:text-primary cursor-pointer"
                  onClick={onClick}
               >
                  {info?.title}
               </h1>
               <p className="text-xs text-secondary">{info?.artistNames}</p>
            </div>
         </div>
      </div>
   );
};

export default SongInfo;
