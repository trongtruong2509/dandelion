import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { useSelector, useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";

import SearchItem from "./SearchItem";
import { getAllDocs } from "../../utils/firebaseApi";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { clearSearchHistory } from "../../slices/dandelionSlice";
import { firebaseKeys } from "../../../dataTemplate";
import { removeAccents } from "../../utils/common";

const Search = () => {
   const dispatch = useDispatch();
   const params = useParams();

   const searchHistory = useSelector((state) => state.dandelion.searchHistory);

   const [searchText, setSearchText] = useState("");
   const [searchResult, setSearchResult] = useState([]);
   const [loading, setLoading] = useState(false);

   // Workaround for search feature
   const [songsDb, setSongsDb] = useState([]);
   const [artistsDb, setArtistsDb] = useState([]);
   const [playlistsDb, setPlaylistsDb] = useState([]);
   const [firstTime, setFirstTime] = useState(true);

   useEffect(() => {
      setSearchText("");
   }, [params]);

   useEffect(() => {
      if (searchText === "") {
         setSearchResult([]);
         return;
      }

      if (searchText !== "" && firstTime) {
         setLoading(true);
         setFirstTime(false);

         fetchDb()
            .then(() => {
               getResults();
               setLoading(false);
            })
            .catch((err) => {
               console.log(err);
               setLoading(false);
            });
      } else {
         getResults();
      }
   }, [searchText]);

   useEffect(() => {
      getResults();
   }, [playlistsDb]);

   const getResults = () => {
      let results = [];

      // get matches songs
      results = getTopMatches(songsDb, searchText);

      // get matches artist
      results = [...results, ...getTopMatches(artistsDb, searchText)];

      // get song of artist
      const matches = songsDb.filter((s) =>
         removeAccents(s.artistsNames).toLowerCase().includes(removeAccents(searchText.toLowerCase()))
      );

      matches.forEach((t) => {
         if (!results.find((s) => s.id === t.id)) {
            results.push(t);
         }
      });

      setSearchResult(results);
   };

   const getTopMatches = (input, search) => {
      let matches = input.filter((s) =>
         removeAccents(s.title || s.name)
            .toLowerCase()
            .includes(removeAccents(search.toLowerCase()))
      );

      return matches.slice(0, 10);
   };

   const fetchDb = async () => {
      try {
         const songs = await getAllDocs(firebaseKeys.songs);
         setSongsDb(songs.filter((e) => e !== undefined));

         const artists = await getAllDocs(firebaseKeys.artists);
         setArtistsDb(artists.filter((e) => e !== undefined));

         return [songs, artists];
      } catch (error) {
         console.log(error);
         return [];
      }
   };

   const override = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
   };

   const hideOnInnerButtonPress = {
      name: "hideOnInnerButtonPress",
      defaultValue: true,
      fn(instance) {
         return {
            onCreate() {
               instance.popper.addEventListener("click", (event) => {
                  if (instance.props.hideOnInnerButtonPress && event.target.getAttribute("hide-on-press") === "false") {
                     setTimeout(() => instance.hide(), 50);
                     console.log("[hideOnInnerButtonPress]", "pressed");
                     return event;
                  }
               });
            },
         };
      },
   };

   return (
      <Tippy
         interactive
         placement="bottom"
         appendTo={() => document.body}
         delay={[0, 700]}
         plugins={[hideOnInnerButtonPress]}
         trigger="click"
         render={(attrs) => (
            <div
               className="w-[500px] h-auto max-h-[544px] overflow-y-scroll scrollbar min-h-20 pb-3 bg-primary -mt-1 rounded-2xl shadow-md text-primary pl-3 pr-2"
               tabIndex="-1"
               {...attrs}
            >
               <div className="w-full text-sm">
                  <div className="pt-4 pb-2">
                     {searchText === "" ? (
                        <div className="flex-btw">
                           <h2 className="semibold text-primary">Recent searches</h2>
                           <button
                              className="px-3 text-xs text-secondary hover:text-primary"
                              onClick={() => dispatch(clearSearchHistory())}
                           >
                              Clear
                           </button>
                        </div>
                     ) : (
                        <>
                           <h2 className="semibold">Top results</h2>
                        </>
                     )}
                  </div>
                  <div>
                     {loading ? (
                        <div className="w-full h-60 flex-center">
                           <SyncLoader color="var(--dandelion)" loading={loading} cssOverride={override} size={10} />
                        </div>
                     ) : searchText === "" ? (
                        searchHistory.length ? (
                           <SearchItem infos={searchHistory} />
                        ) : (
                           <div className="w-full h-28 flex-center text-secondary">No search history</div>
                        )
                     ) : (
                        <SearchItem infos={searchResult} />
                     )}
                  </div>
               </div>
            </div>
         )}
      >
         <div className="w-[500px] relative">
            <input
               type="text"
               value={searchText}
               onChange={(e) => setSearchText(e.target.value)}
               className="w-full py-[10px] rounded-3xl outline-none bg-alpha pl-10 text-sm text-search font-normal"
               placeholder="Search for song, artist, album..."
            />
            <IoSearchOutline className="absolute text-xl text-placeholder top-[10px] left-3" />
            {searchText !== "" && (
               <button
                  className="absolute text-xl text-placeholder top-[6px] right-3 hover:text-dandelion cursor-pointer p-1 rounded-full"
                  onClick={() => setSearchText("")}
               >
                  <IoCloseOutline className="" />
               </button>
            )}
         </div>
      </Tippy>
   );
};

export default Search;
