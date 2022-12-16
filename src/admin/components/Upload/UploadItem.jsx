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
      <div className="flex items-center gap-4 px-3 py-2 rounded-lg hover:bg-alpha w-fit">
         <div className="flex items-center justify-start gap-3">
            <img src={info?.thumbnail} alt={info?.alias} className="object-cover w-12 h-12 rounded-md" />
            <div className="text-primary w-80">
               <h1 className="w-full text-sm truncate cursor-pointer hover:text-dandelion">{info.title}</h1>
               <div className="text-xs truncate text-secondary">{info.artistsNames}</div>
            </div>

            <select
               className="w-20 px-2 py-[6px] text-primary rounded-lg outline-none border-primary bg-alpha"
               onChange={(e) => dispatch(updateRank({ id: info.encodeId, rank: e.target.value }))}
               defaultValue="Undefined"
            >
               <option defaultValue value="Undefined">
                  Undefined
               </option>
               <option value="B">B</option>
               <option value="A">A</option>
               <option value="A+">A+</option>
               <option value="S">S</option>
               <option value="S+">S+</option>
            </select>
         </div>
         <div>
            <button
               className="w-10 h-10 p-2 ml-3 rounded-full cursor-pointer flex-center hover:bg-alpha hover:text-dandelion text-primary "
               onClick={onDelete}
            >
               <MdClear className="text-3xl opacity-20 hover:opacity-70 " />
            </button>
         </div>
      </div>
   );
};

export default UploadItem;
