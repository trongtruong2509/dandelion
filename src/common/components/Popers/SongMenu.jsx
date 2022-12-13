import React, { useState } from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!

import { BsDownload } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoTrashSharp } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
import { GiMicrophone } from "react-icons/gi";
import { MdArrowForwardIos, MdBlock, MdQueueMusic } from "react-icons/md";

import SongInfo from "../Song/SongInfo";
import { deleteTrackById } from "../../../services/trackService";
import AddPlaylistMenu from "./AddPlaylistMenu";
import { useSelector } from "react-redux";
import Login from "../Header/Login";

const SongMenu = ({ children, info, canDetele = false }) => {
   const currentUser = useSelector((state) => state.user.user);

   const [open, setIsOpen] = useState(false);

   const deleteHandle = async (id) => {
      deleteTrackById(id)
         .then((res) => {
            console.log("[deleteHandle] deleteTrackById ", res);
         })
         .catch((err) => console.log(err));
   };

   const AddPlaylistButton = (
      <button className="w-full hover:bg-alpha rounded-lg hover:text-dandelion-primary py-[10px] text-secondary flex-btw px-4 text-sm">
         <div className="flex items-center gap-3">
            <IoMdAddCircleOutline className="text-xl" />
            Add to playlist
         </div>
         <MdArrowForwardIos className="text-xl" />
      </button>
   );

   return (
      <Tippy
         interactive
         appendTo={() => document.body}
         delay={[0, 700]}
         trigger="click"
         open={open}
         placement="auto-end"
         render={(attrs) => (
            <div
               className="w-[280px] h-[300px] flex flex-col bg-primary
                py-4 shadow-md rounded-xl"
               tabIndex="-1"
               {...attrs}
            >
               <div className="w-full px-4">
                  <SongInfo info={info} />
                  <div className="w-full my-4 text-xs flex-btw rounded-xl bg-alpha">
                     <button
                        className="flex-center flex-col gap-1 py-2 text-primary hover:text-dandelion-primary rounded-xl w-[80px]
                  cursor-pointer hover:bg-alpha"
                     >
                        <BsDownload className="text-base " />
                        Download
                     </button>
                     <button
                        className="flex-center flex-col gap-1 py-2 text-primary hover:text-dandelion-primary rounded-xl w-[80px]
                  cursor-pointer hover:bg-alpha"
                     >
                        <MdQueueMusic className="text-base " />
                        Lyrics
                     </button>
                     <button
                        className="flex-center flex-col gap-1 py-2 text-primary hover:text-dandelion-primary rounded-xl w-[80px]
                  cursor-pointer hover:bg-alpha"
                     >
                        <MdBlock className="text-base " />
                        Block
                     </button>
                  </div>
               </div>
               <div className="w-full">
                  {currentUser ? (
                     <AddPlaylistMenu children={AddPlaylistButton} songInfo={info} />
                  ) : (
                     <Login children={AddPlaylistButton} />
                  )}

                  <button
                     className="w-full hover:bg-alpha rounded-lg hover:text-dandelion-primary py-[10px] text-secondary flex-btw px-4 text-sm"
                     onClick={() => {
                        setIsOpen(false);
                     }}
                  >
                     <div className="flex items-center gap-3">
                        <GiMicrophone className="text-xl" />
                        Play with lyrics
                     </div>
                     <MdArrowForwardIos className="text-xl" />
                  </button>
                  <button className="w-full hover:bg-alpha rounded-lg hover:text-dandelion-primary py-[10px] text-secondary flex-btw px-4 text-sm">
                     <div className="flex items-center gap-3">
                        <AiOutlineComment className="text-xl" />
                        Comments
                     </div>
                  </button>
                  {/* <button className="w-full hover:bg-alpha hover:text-dandelion-primary py-[10px] text-secondary flex-btw px-4 text-sm">
                     <div className="flex items-center gap-3">
                        <BsShare className="text-xl" />
                        Share
                     </div>
                     <MdArrowForwardIos className="text-lg" />
                  </button> */}
                  <button
                     className="w-full hover:bg-alpha rounded-lg hover:text-dandelion-primary py-[10px] text-secondary flex justify-between items-center px-4 text-sm"
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
