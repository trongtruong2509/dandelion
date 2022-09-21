import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { toast } from "react-toastify";

import { addNewDoc, getAllDocs } from "../../../common/utils/firebaseApi";
import { group } from "../../../common/utils/common";
import SongItem from "../../../common/components/Song/SongItem";

const AdminHome = () => {
   const [allTracks, setAllTracks] = useState([]);
   const [tracks, setTracks] = useState([]);
   const [category, setCategory] = useState("All");
   const [categoryItem, setCategoryItem] = useState("");
   const [items, setItems] = useState([]);

   useEffect(() => {
      getAllDocs("songs")
         .then((result) => {
            setAllTracks(result);
            setTracks(result);
         })
         .catch((err) => {
            toast.error(err);
         });
   }, []);

   useEffect(() => {
      switch (category) {
         case "Genre":
            getTracksByGenre(categoryItem);
            break;

         default:
            // getTracksByGenre(categoryItem);
            setTracks(allTracks);
            break;
      }
   }, [categoryItem]);

   useEffect(() => {
      switch (category) {
         case "Genre":
            getGenreItems();
            break;
         case "All":
            setItems([]);
            setTracks(allTracks);
            break;

         default:
            setItems([]);
            setTracks(allTracks);
            break;
      }
   }, [category]);

   const getGenreItems = async () => {
      getAllDocs("genres")
         .then((result) => {
            const newItems = result.map((r) => ({
               id: r.id,
               title: r.title,
            }));

            newItems.sort((a, b) => {
               if (a.title < b.title) {
                  return -1;
               }
               if (a.title > b.title) {
                  return 1;
               }
            });

            setItems(newItems);
         })
         .catch((err) => console.log(err));
   };

   const getTracksByGenre = (genreId) => {
      setTracks(allTracks.filter((track) => track.genreIds.includes(genreId)));
   };

   return (
      <div className="w-full mt-10">
         <div className="flex gap-8 py-3">
            <select
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-dark-4 text-white"
               onChange={(e) => setCategory(e.target.value)}
            >
               <option defaultValue value="All">
                  All
               </option>
               <option value="Genre">Genre</option>
               <option value="Artist">Artist</option>
               <option value="Tier">Tier</option>
               <option value="Featured">Featured</option>
            </select>
            <select
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-dark-4 text-white"
               value={categoryItem}
               onChange={(e) => setCategoryItem(e.target.value)}
            >
               {items?.map((item) => (
                  <option value={item.id} key={item.id}>
                     {item.title}
                  </option>
               ))}
            </select>
         </div>
         <div className="w-full my-4">
            <Swiper
               slidesPerView={4}
               spaceBetween={20}
               className="flex w-full gap-3"
            >
               {group(tracks, tracks.length / 4).map((songs, index) => (
                  <SwiperSlide key={index}>
                     {songs.map((s) => (
                        <div className="my-1" key={s.id}>
                           <SongItem info={s} size="13" like={false} />
                        </div>
                     ))}
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </div>
   );
};

export default AdminHome;
