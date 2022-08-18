import React from "react";
import Header from "../Header";
import Playlist from "../Playlist";

const MainContainer = () => {
   return (
      <div className="w-full h-screen bg-dark-4 px-12">
         <Header />
         <Playlist />
      </div>
   );
};

export default MainContainer;
