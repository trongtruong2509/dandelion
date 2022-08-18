import React from "react";

const SongInfo = ({ info, onClick, size_medium = false }) => {
   const thumbnailSize = "w-10 h-10";
   const thumbnailSizeMd = "w-16 h-16";

   return (
      <div className="flex items-center gap-3 text-white">
         <div>
            <img
               src={info?.thumbnail}
               alt={info?.title}
               className={`object-cover rounded-md ${
                  size_medium ? thumbnailSizeMd : thumbnailSize
               }`}
            />
         </div>
         <div>
            <h1 className="text-sm" onClick={onClick}>
               {info?.title}
            </h1>
            <p className="text-xs text-secondary">{info?.artists}</p>
         </div>
      </div>
   );
};

export default SongInfo;
