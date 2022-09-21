import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { MdClear } from "react-icons/md";
import { updateRank } from "../../slices/uploadSlice";

// import { updateRank } from "../../slices/uploadSlice";

const UploadItem = ({ info, onDelete }) => {
   // const [rank, setRank] = useState("S");
   const dispatch = useDispatch();

   return (
      <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-hover-1 w-fit">
         <div className="flex items-center justify-start gap-3">
            <img
               src={info?.thumbnail}
               alt={info?.alias}
               className="object-cover w-12 h-12 rounded-md"
            />
            <div className="text-white w-80">
               <h1 className="w-full text-sm truncate cursor-pointer hover:text-primary">
                  {info.title}
               </h1>
               <div className="text-xs truncate text-secondary">
                  {info.artistsNames}
               </div>
            </div>

            <select
               className="w-20 px-2 py-[6px] text-white rounded-lg outline-none border-hover-1 bg-dark-2"
               onChange={(e) =>
                  dispatch(
                     updateRank({ id: info.encodeId, rank: e.target.value })
                  )
               }
            >
               <option defaultValue value="S">
                  S
               </option>
               <option value="A+">A+</option>
               <option value="A">A</option>
               <option value="B">B</option>
               <option value="Undefined">Undefined</option>
            </select>
         </div>
         <div>
            <button
               className="flex items-center justify-center w-10 h-10 p-2 ml-3 rounded-full cursor-pointer hover:bg-hover-1"
               onClick={onDelete}
            >
               <MdClear className="text-3xl text-white opacity-20 hover:opacity-70" />
            </button>
         </div>
      </div>
   );
};

export default UploadItem;
