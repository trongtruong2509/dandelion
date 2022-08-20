import React from "react";
import Header from "../Header";

const MainContainer = ({ children }) => {
   return (
      <div className="w-full h-[calc(100vh-96px)] block overflow-auto bg-dark-4 px-12 relative">
         <div className="sticky top-0 left-0 z-[1000] w-full">
            <Header />
         </div>
         {children}
      </div>
   );
};

export default MainContainer;
