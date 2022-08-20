import React from "react";
import MainContainer from "../../common/components/MainContainer";
import Playbar from "../../common/components/Playbar";
import PlayerQueue from "../../common/components/PlayerQueue";
import Sidebar from "../../common/components/Sidebar";
import Playlist from "../../common/components/Playlist";

const Home = () => {
   return (
      <div className="flex ">
         <Sidebar />
         <MainContainer children={<Playlist />} />
         <PlayerQueue />
         <Playbar />
      </div>
   );
};

export default Home;
