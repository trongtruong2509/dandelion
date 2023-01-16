import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDocs } from "../../../common/utils/firebaseApi";
import { updateDeleting, updateFetching, updateGen, updateState, updateTracks } from "../../slices/adminTrackSlice";
import {
   getTracksByCountry,
   getTracksByRank,
   getTracksByTag,
   getTracksByVendor,
   updateTagsFieldAll,
} from "./filterApi";

const Content = {
   country: {
      category: "Country",
      items: [
         {
            id: "IWZ9Z08O",
            title: "US-UK",
         },
         {
            id: "IWZ9Z08I",
            title: "VietNam",
         },
         {
            id: "IWZ9Z08W",
            title: "Kpop",
         },
      ],
   },
   vendor: {
      category: "Vendor",
      items: [
         {
            id: "zm3",
            title: "ZingMp3",
         },
         {
            id: "nct",
            title: "NCT",
         },
         {
            id: "csn",
            title: "CSN",
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
            id: "Undefined",
            title: "Undefined",
         },
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

const Generations = {
   category: "Generations",
   items: [
      { id: "All", title: "All" },
      {
         id: "Gen-0",
         title: "Gen-0",
      },
      {
         id: "Gen_1",
         title: "Gen-1",
      },
      {
         id: "Gen_2",
         title: "Gen-2",
      },
      {
         id: "Gen_3",
         title: "Gen-3",
      },
      {
         id: "Gen_4",
         title: "Gen-4",
      },
   ],
};

const States = {
   category: "States",
   items: [
      { id: "All", title: "All" },
      { id: "State_Unknown", title: "Unknown" },
      { id: "State_Happy", title: "Happy" },
      { id: "State_Sight", title: "Sight" },
      { id: "State_Lovesick", title: "Lovesick" },
      { id: "State_Unrequited", title: "Unrequited" },
      { id: "State_Inlove", title: "Inlove" },
      { id: "State_Together", title: "Together" },
      { id: "State_Distance", title: "Distance" },
      { id: "State_Breakup", title: "Breakup" },
      { id: "State_Broken", title: "Broken" },
      { id: "State_Healing", title: "Healing" },
      { id: "State_Stuck", title: "Stuck" },
   ],
};

const Filters = () => {
   const dispatch = useDispatch();

   const adminTrack = useSelector((state) => state.adminTrack);

   const [category, setCategory] = useState(Content.rank.category);
   const [categoryItems, setCategoryItems] = useState(Content.rank.items);
   const [selectedItem, setSelectedItem] = useState("");

   useEffect(() => {
      switch (category) {
         case Content.genre.category:
            getGenreItems();
            break;
         case Generations.category:
            setCategoryItems(Generations.items);
            break;
         case States.category:
            setCategoryItems(States.items);
            break;
         case Content.artist.category:
            setCategoryItems(Content.artist.items);
            break;
         case Content.rank.category:
            setCategoryItems(Content.rank.items);
            break;
         case Content.vendor.category:
            setCategoryItems(Content.vendor.items);
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
      console.log("[selectedItem] ", selectedItem);
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
         case Content.vendor.category:
            fetchTracksByVendor(selectedItem);
            break;
         case Generations.category:
         case States.category:
            fetchTracksByTag(selectedItem);
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
      dispatch(updateFetching(true));
      const tracks = await getTracksByRank(id);
      dispatch(updateFetching(false));

      dispatch(updateTracks(tracks));
   };

   const fetchTracksByVendor = async (id) => {
      const tracks = await getTracksByVendor(id);
      dispatch(updateTracks(tracks));
   };

   const fetchTracksByTag = async (tag) => {
      console.log("[fetchTracksByTag]", tag);
      if (tag !== "All") {
         const tracks = await getTracksByTag(tag);
         dispatch(updateTracks(tracks));
      }
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
      <div className="flex gap-10">
         <div className="flex gap-4 py-3">
            <select
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-layout text-primary"
               onChange={(e) => setCategory(e.target.value)}
            >
               <option defaultValue value={Content.country.category}>
                  {Content.country.category}
               </option>
               <option value={Content.vendor.category}>{Content.vendor.category}</option>
               <option value={Generations.category}>{Generations.category}</option>
               <option value={States.category}>{States.category}</option>
               <option value={Content.genre.category}>{Content.genre.category}</option>
               <option value={Content.artist.category}>{Content.artist.category}</option>
               <option value={Content.rank.category}>{Content.rank.category}</option>
               <option value={Content.featured.category}>{Content.featured.category}</option>
            </select>
            <select
               className="w-40 px-4 py-[6px] border rounded-lg outline-none bg-layout text-primary"
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
         <div className="gap-2 py-3 flex-center">
            <label>{Generations.category}:</label>
            <select
               className="w-24 px-1 py-[6px] border rounded-lg outline-none bg-layout text-primary"
               onChange={(e) => dispatch(updateGen(e.target.value))}
            >
               {Generations.items?.map((item) => (
                  <option value={item.id} key={item.id}>
                     {item.title}
                  </option>
               ))}
            </select>
         </div>
         <div className="gap-2 py-3 flex-center">
            <label>{States.category}:</label>
            <select
               className="w-32 px-1 py-[6px] border rounded-lg outline-none bg-layout text-primary"
               onChange={(e) => dispatch(updateState(e.target.value))}
            >
               {States.items?.map((item) => (
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
