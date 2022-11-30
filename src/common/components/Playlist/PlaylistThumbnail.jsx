import React from "react";

import AlbumDefault from "./../../../assets/album_default.png";

const PlaylistThumbnail = ({ playlist, className = "" }) => {
   const effect = "transition-all duration-500 ease-out group-hover:scale-105";
   const songs = playlist?.songs;

   if (playlist?.thumbnail) {
      return <ThumbnailItem src={playlist?.thumbnail} className={"w-full" + className + effect} />;
   } else if (songs?.length && songs?.length < 4) {
      return <ThumbnailItem src={songs[0].thumbnailM} className={"w-full" + className + effect} />;
   } else if (songs?.length >= 4) {
      return (
         <div className={"flex flex-col w-full h-full " + effect}>
            <div className="flex">
               <ThumbnailItem src={songs[0].thumbnailM} className={"w-1/2 " + className} />
               <ThumbnailItem src={songs[1].thumbnailM} className={"w-1/2 " + className} />
            </div>
            <div className="flex">
               <ThumbnailItem src={songs[2].thumbnailM} className={"w-1/2 " + className} />
               <ThumbnailItem src={songs[3].thumbnailM} className={"w-1/2 " + className} />
            </div>
         </div>
      );
   } else {
      return <ThumbnailItem src={AlbumDefault} className="w-full" />;
   }
};

const ThumbnailItem = ({ src, className = "" }) => {
   return <img className={"object-cover h-full " + className} src={src} alt="Playlist Cover" />;
};

export default PlaylistThumbnail;
