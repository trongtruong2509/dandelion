import React from "react";
import { Link } from "react-router-dom";

const SongInfo = ({ info, size = "10", onClick }) => {
   const generateArtists = (artists) => {
      // let display = (
      // )
      //  display;
   };

   const thumbnailSizes = {
      10: "w-10 h-10",
      11: "w-11 h-11",
      12: "w-12 h-12",
      13: "w-13 h-13",
      14: "w-14 h-14",
      15: "w-15 h-15",
      16: "w-16 h-16",
   };

   return (
      <div>
         <div className="flex items-center gap-3 text-white">
            {/* <div className={`flex-shrink-0 w-[${size}px] h-[${size}px]`}> */}
            <img
               src={info?.thumbnail}
               alt={info?.title}
               className={`object-cover rounded-md ${thumbnailSizes[size]}`}
            />
            {/* </div> */}
            <div className="max-w-[220px]">
               <h1
                  className="w-full text-sm truncate cursor-pointer text-primary"
                  onClick={onClick}
               >
                  {info?.title}
               </h1>
               <div className="text-xs truncate text-secondary">
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
