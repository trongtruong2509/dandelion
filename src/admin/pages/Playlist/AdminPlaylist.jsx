import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";

import { addNewDoc, getAllDocs } from "../../../common/utils/firebaseApi";
import { group } from "../../../common/utils/common";
import SongItem from "../../../common/components/Song/SongItem";
import { adminPaths } from "../../../app/routes";
import Filters from "../../components/Filter/Filters";
import { fetchAllPlaylist } from "../../slices/adminPlaylistSlice";
import PlaylistCover from "../../../common/components/Playlist/PlaylistCover";

const AdminPlaylist = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const adminPlaylist = useSelector((state) => state.adminPlaylist);

   const [allTracks, setAllTracks] = useState([]);
   const [tracks, setTracks] = useState([]);
   const [category, setCategory] = useState("All");
   const [categoryItem, setCategoryItem] = useState("");
   const [items, setItems] = useState([]);

   useEffect(() => {
      dispatch(fetchAllPlaylist());
   }, []);

   return (
      <div className="w-full mt-10">
         <div className="flex items-center justify-between gap-8">
            <Filters />
            <button
               className="h-10 px-4 text-white rounded-xl bg-dandelion-primary"
               onClick={() => navigate(adminPaths.createPlaylist)}
            >
               Create Playlist
            </button>
         </div>

         <div className="flex flex-wrap w-full gap-6 my-4">
            {adminPlaylist?.allPlaylist.map((p) => (
               <PlaylistCover key={p.id} info={p} admin />
            ))}
         </div>
      </div>
   );
};

export default AdminPlaylist;
