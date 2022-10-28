import React from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { BsDownload, BsShare } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoTrashSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";

import SongInfo from "../Song/SongInfo";
import { MdArrowForwardIos, MdBlock, MdQueueMusic } from "react-icons/md";
import { GiMicrophone } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { deleteTrackById } from "../../../services/trackService";

const SongMenu = ({ children, info, canDetele = false }) => {
   const dispatch = useDispatch();

   const deleteHandle = async (id) => {
      deleteTrackById(id)
         .then((res) => {
            console.log("[deleteHandle] deleteTrackById ", res);
         })
         .catch((err) => console.log(err));
   };

   return (
      <Tippy
         interactive
         appendTo={() => document.body}
         delay={[0, 700]}
         trigger="click"
         placement="auto-end"
         render={(attrs) => (
            <div
               className="w-[280px] h-auto flex flex-col bg-dark-2
                py-4 shadow-lg drop-shadow-lg rounded-xl"
               tabIndex="-1"
               {...attrs}
            >
               <div className="w-full px-4">
                  <SongInfo info={info} />
                  <div className="flex items-center justify-between w-full my-4 text-xs rounded-xl bg-hover-1">
                     <button
                        className="flex flex-col gap-1 justify-center items-center py-2 text-white rounded-xl w-[80px]
                  cursor-pointer hover:bg-hover-1"
                     >
                        <BsDownload className="text-base " />
                        Download
                     </button>
                     <button
                        className="flex flex-col gap-1 justify-center items-center py-2 text-white rounded-xl w-[80px]
                  cursor-pointer hover:bg-hover-1"
                     >
                        <MdQueueMusic className="text-base " />
                        Lyrics
                     </button>
                     <button
                        className="flex flex-col gap-1 justify-center items-center py-2 text-white rounded-xl w-[80px]
                  cursor-pointer hover:bg-hover-1"
                     >
                        <MdBlock className="text-base " />
                        Block
                     </button>
                  </div>
               </div>
               <div className="w-full">
                  <button className="w-full hover:bg-hover-1 rounded-lg hover:text-white py-[10px] text-secondary flex justify-between items-center px-4 text-sm">
                     <div className="flex items-center gap-3">
                        <IoMdAddCircleOutline className="text-xl" />
                        Add to playlist
                     </div>
                     <MdArrowForwardIos className="text-xl" />
                  </button>
                  <button className="w-full hover:bg-hover-1 rounded-lg hover:text-white py-[10px] text-secondary flex justify-between items-center px-4 text-sm">
                     <div className="flex items-center gap-3">
                        <GiMicrophone className="text-xl" />
                        Play with lyrics
                     </div>
                     <MdArrowForwardIos className="text-xl" />
                  </button>
                  <button className="w-full hover:bg-hover-1 rounded-lg hover:text-white py-[10px] text-secondary flex justify-between items-center px-4 text-sm">
                     <div className="flex items-center gap-3">
                        <AiOutlineComment className="text-xl" />
                        Comments
                     </div>
                  </button>
                  <button className="w-full hover:bg-hover-1 rounded-lg hover:text-white py-[10px] text-secondary flex justify-between items-center px-4 text-sm">
                     <div className="flex items-center gap-3">
                        <BsShare className="text-xl" />
                        Share
                     </div>
                     <MdArrowForwardIos className="text-lg" />
                  </button>
                  <button
                     className="w-full hover:bg-hover-1 rounded-lg hover:text-white py-[10px] text-secondary flex justify-between items-center px-4 text-sm"
                     onClick={() => deleteHandle(info.id)}
                  >
                     <div className="flex items-center gap-3">
                        <IoTrashSharp className="text-xl" />
                        Delete
                     </div>
                     {/* <MdArrowForwardIos className="text-lg" /> */}
                  </button>
               </div>
            </div>
         )}
      >
         {children}
      </Tippy>
   );
};

export default SongMenu;
