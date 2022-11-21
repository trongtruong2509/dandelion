import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocs } from "../../../common/utils/firebaseApi";
import { updateDeleting, updateTracks } from "../../slices/adminTrackSlice";
import {
   getTracksByCountry,
   getTracksByGenre,
   getTracksByRank,
} from "./filterApi";

const Content = {
   country: {
      category: "Country",
      items: [
         {
            id: "IWZ9Z08I",
            title: "Vpop",
         },
         {
            id: "IWZ9Z08O",
            title: "US-UK",
         },
         {
            id: "IWZ9Z08W",
            title: "Kpop",
         },
      ],
   },
   genre: {
      category: "Genres",
      items: [],
   },
   rank: {
      category: "Classification",
      items: [
         {
            id: "S+",
            title: "S+",
         },
         {
            id: "S",
            title: "S",
         },
         {
            id: "A+",
            title: "A+",
         },
         {
            id: "A",
            title: "A",
         },
         {
            id: "B",
            title: "B",
         },
         {
            id: "Undefined",
            title: "Undefined",
         },
      ],
   },
   artist: {
      category: "Artist",
      items: [],
   },
   featured: {
      category: "Featured",
      items: [],
   },
};

const Filters = () => {
   const dispatch = useDispatch();

   const adminTrack = useSelector((state) => state.adminTrack);

   const [category, setCategory] = useState(Content.country.category);
   const [categoryItems, setCategoryItems] = useState(Content.country.items);
   const [selectedItem, setSelectedItem] = useState("");

   useEffect(() => {
      switch (category) {
         case Content.genre.category:
            getGenreItems();
            break;
         case Content.artist.category:
            setCategoryItems(Content.artist.items);
            break;
         case Content.rank.category:
            setCategoryItems(Content.rank.items);
            break;
         case Content.country.category:
         default:
            setCategoryItems(Content.country.items);
            break;
      }
   }, [category]);

   useEffect(() => {
      if (categoryItems?.length) {
         setSelectedItem(categoryItems[0].id);
      }
   }, [categoryItems]);

   useEffect(() => {
      updateDisplayTrack();
   }, [selectedItem]);

   useEffect(() => {
      if (adminTrack?.deleting) {
         updateDisplayTrack();
         dispatch(updateDeleting(false));
      }
   }, [adminTrack?.deleting]);

   const updateDisplayTrack = async () => {
      switch (category) {
         case Content.country.category:
         default:
            await fetchTracksByCountry(selectedItem);
            break;
         case Content.genre.category:
            fetchTracksByGenre(selectedItem);
            break;
         case Content.rank.category:
            await fetchTracksByRank(selectedItem);
            break;
      }
   };

   const fetchTracksByCountry = async (id) => {
      const tracks = await getTracksByCountry(id);
      dispatch(updateTracks(tracks));
   };

   const fetchTracksByRank = async (id) => {
      const tracks = await getTracksByRank(id);
      dispatch(updateTracks(tracks));
   };

   const fetchTracksByGenre = async (id) => {
      const tracks = await getTracksByCountry(id);
      dispatch(updateTracks(tracks));
   };

   const getGenreItems = async () => {
      console.log("[getGenreItems]", " Entering");
      getAllDocs("genres")
         .then((result) => {
            console.log("[getGenreItems]", result);

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

            setCategoryItems(newItems);
         })
         .catch((err) => {
            console.log("[getGenreItems]", err);
         });
   };

   return (
      <div>
         <div className="flex gap-8 py-3">
            <select
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-dark-4 text-primary"
               onChange={(e) => setCategory(e.target.value)}
            >
               <option defaultValue value={Content.country.category}>
                  {Content.country.category}
               </option>
               <option value={Content.genre.category}>
                  {Content.genre.category}
               </option>
               <option value={Content.artist.category}>
                  {Content.artist.category}
               </option>
               <option value={Content.rank.category}>
                  {Content.rank.category}
               </option>
               <option value={Content.featured.category}>
                  {Content.featured.category}
               </option>
            </select>
            <select
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-dark-4 text-primary"
               value={selectedItem}
               onChange={(e) => setSelectedItem(e.target.value)}
            >
               {categoryItems?.map((item) => (
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
