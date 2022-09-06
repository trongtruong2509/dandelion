import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SongItem from "../Song/SongItem";

const SearchItem = ({ infos }) => {
   return (
      <div className="w-full rounded-lg">
         {infos?.map((info) => {
            if (info.artistNames) {
               return (
                  <SongItem
                     key={info.id}
                     info={info}
                     size="52"
                     options={false}
                  />
               );
            } else if (info.alias) {
               return (
                  <Link
                     className="w-full rounded-lg hover:bg-hover-1 p-2 flex gap-3 items-center justify-start cursor-pointer"
                     to={info.link}
                     key={info.id}
                  >
                     <div className="w-[60px] h-[60px] rounded-full">
                        <img
                           src={info.thumbnail}
                           alt=""
                           className="w-full object-cover rounded-full"
                        />
                     </div>
                     <div className="">
                        <h2 className="font-semibold text-white">
                           {info.name}
                        </h2>
                        <p className="text-sm text-secondary">Artist</p>
                     </div>
                  </Link>
               );
            }
         })}
      </div>
   );
};

export default SearchItem;
