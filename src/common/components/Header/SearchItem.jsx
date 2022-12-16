import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateSearchHistory } from "../../slices/dandelionSlice";
import SongItem from "../Song/SongItem";

const SearchItem = ({ infos }) => {
   const dispatch = useDispatch();

   return (
      <div className="w-full rounded-lg">
         {infos?.map((info, index) => {
            if (info.artistsNames) {
               return (
                  <div key={info.id} onClick={() => dispatch(updateSearchHistory(info))}>
                     <SongItem info={info} size="13" options={false} />
                  </div>
               );
            } else if (info.alias) {
               return (
                  <Link
                     className="relative z-10 flex items-center justify-start w-full gap-3 p-2 rounded-lg cursor-pointer hover:bg-alpha"
                     to={info.link}
                     key={info.id}
                     onClick={() => dispatch(updateSearchHistory(info))}
                  >
                     <div className="absolute-top h-[60px] w-full" hide-on-press="false"></div>
                     <div className="w-[60px] h-[60px] rounded-full">
                        <img src={info.thumbnail} alt="" className="object-cover w-full rounded-full" />
                     </div>
                     <div>
                        <h2 className="semibold text-primary">{info.name}</h2>
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
