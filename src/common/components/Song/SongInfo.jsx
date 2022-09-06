import React from "react";
import { Link } from "react-router-dom";

const SongInfo = ({ info, size = "40", onClick }) => {
   const generateArtists = (artists) => {
      // let display = (
      // )
      //  display;
   };

   return (
      <div>
         <div className="flex items-center gap-3 text-white">
            {/* <div className={`flex-shrink-0 w-[${size}px] h-[${size}px]`}> */}
            <img
               src={info?.thumbnail}
               alt={info?.title}
               className={`object-cover rounded-md w-[${size}px] h-[${size}px]`}
            />
            {/* </div> */}
            <div className="max-w-[220px]">
               <h1
                  className="text-sm hover:text-primary cursor-pointer truncate w-full"
                  onClick={onClick}
               >
                  {info?.title}
               </h1>
               <div className="text-xs text-secondary truncate">
                  {info?.artists.length > 0 ? (
                     <p>
                        {info?.artists.map((artist, index) => (
                           <span key={index}>
                              <Link
                                 className="hover:text-primary hover:underline"
                                 to={artist.link}
                              >
                                 {artist.name}
                              </Link>
                              {info?.artists.length - 1 !== index && ", "}
                           </span>
                        ))}
                     </p>
                  ) : (
                     info?.artistNames
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SongInfo;
