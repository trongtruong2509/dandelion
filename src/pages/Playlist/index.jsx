import React from "react";
import { useParams } from "react-router-dom";

import PlaylistDetail from "../../common/components/Playlist/PlaylistDetail";

const Playlist = () => {
   const params = useParams();

   return (
      <div className="w-full mt-20 text-white">
         <PlaylistDetail id={params.id} />
      </div>
   );
};

export default Playlist;
