import React from "react";
import { useParams } from "react-router-dom";

import PlaylistDetail from "../../common/components/Playlist/PlaylistDetail";

const Playlist = () => {
   const params = useParams();

   return (
      <div className="w-full h-full text-white">
         <PlaylistDetail id={params.id} />
         {/* <div className="h-[900px] w-full bg-teal-50"></div> */}
      </div>
   );
};

export default Playlist;
