import React from "react";

const PlaylistRowHeader = () => {
   return (
      <div className="grid w-full grid-cols-12 px-3 py-3 border-b border-primary">
         <p className="col-span-6 text-sm text-secondary">SONG</p>
         <p className="flex items-center col-span-5 text-sm text-secondary">
            ALBUM
         </p>
         <p className="flex items-center justify-end col-span-1 text-sm text-secondary">
            TIME
         </p>
      </div>
   );
};

export default PlaylistRowHeader;
