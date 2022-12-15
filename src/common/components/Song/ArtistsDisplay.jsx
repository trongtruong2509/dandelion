import React from "react";
import { Link } from "react-router-dom";

const ArtistsDisplay = ({ info }) => {
   if (!info?.artists?.length) {
      return <p>{info?.artistsNames}</p>;
   }

   const names = info.artistsNames.split(",").map((n) => n.trim());

   return (
      <p className="mr-2 truncate">
         {names.map((artist, index) =>
            info.artists.find((a) => a.name === artist) ? (
               <span key={index}>
                  <Link
                     className="hover:text-dandelion-primary hover:underline"
                     to={info.artists.find((a) => a.name === artist)?.link}
                     onClick={(e) => e.stopPropagation()}
                  >
                     {artist}
                  </Link>

                  {names.length - 1 !== index && ", "}
               </span>
            ) : (
               <span key={index}>
                  {artist}
                  {names.length - 1 !== index && ", "}
               </span>
            )
         )}
      </p>
   );
};

export default ArtistsDisplay;

// https://beta.nhaccuatui.com/bai-hat/chuyen-cua-mua-dong-tien-thanh.iJtjrNgp8JuX.html
