import React from "react";
import { useParams } from "react-router-dom";

import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";
import PlaylistDetail from "../../common/components/Playlist/PlaylistDetail";
import Header from "../../common/components/Header";

const Playlist = () => {
   const params = useParams();

   return (
      <div className="flex ">
         <Sidebar />
         <div className="w-full h-[calc(100vh-96px)] block overflow-auto bg-dark-4 px-12 relative">
            <div className="sticky top-0 left-0 z-[1000] w-full">
               <Header />
            </div>
            <div className="w-full mt-20 text-white">
               <PlaylistDetail id={params.id} />
            </div>
         </div>
         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Playlist;
