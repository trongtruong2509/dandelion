import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocs } from "../../../common/utils/firebaseApi";
import { updateTracks } from "../../slices/adminTrackSlice";

const Filters = ({ allTracks }) => {
   const dispatch = useDispatch();

   const tracks = useSelector((state) => state.adminTrack.tracks);

   //    const [tracks, setTracks] = useState([]);
   const [category, setCategory] = useState("All");
   const [categoryItem, setCategoryItem] = useState("");
   const [items, setItems] = useState([]);

   useEffect(() => {
      switch (category) {
         case "Genre":
            getGenreItems();
            break;
         case "All":
            setItems([]);
            dispatch(updateTracks(allTracks));
            break;

         default:
            setItems([]);
            dispatch(updateTracks(allTracks));
            break;
      }
   }, [category]);

   useEffect(() => {
      switch (category) {
         case "Genre":
            getTracksByGenre(categoryItem);
            break;

         default:
            // getTracksByGenre(categoryItem);
            dispatch(updateTracks(allTracks));
            break;
      }
   }, [categoryItem]);

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
      dispatch(
         updateTracks(
            allTracks.filter((track) => track.genreIds.includes(genreId))
         )
      );
   };

   return (
      <div>
         <div className="flex gap-8 py-3">
            <select
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-dark-4 text-primary"
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
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-dark-4 text-primary"
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
      </div>
   );
};

export default Filters;
