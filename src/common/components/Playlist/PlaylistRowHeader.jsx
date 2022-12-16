import React from "react";

const PlaylistRowHeader = () => {
   return (
      <div className="grid w-full grid-cols-12 px-3 py-3 text-sm border-b border-primary text-secondary">
         <p className="col-span-6">SONG</p>
         <p className="flex items-center col-span-5 ">ALBUM</p>
         <p className="flex items-center justify-end col-span-1">TIME</p>
      </div>
   );
};

export default PlaylistRowHeader;
