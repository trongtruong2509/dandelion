import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { MdSearch } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";

import SearchItem from "./SearchItem";
import { getAllDocs } from "../../utils/firebaseApi";
import { artistExample } from "../../../tempData/artists";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import { clearSearchHistory } from "../../slices/dandelionSlice";
import { firebaseCollections } from "../../../dataTemplate";
import { removeAccents } from "../../utils/common";

const Search = () => {
   const user = useSelector((state) => state.user.user);
   const searchHistory = useSelector((state) => state.dandelion.searchHistory);

   const params = useParams();
   const dispatch = useDispatch();
   const ref = useRef();

   const [searchText, setSearchText] = useState("");
   const [searchResult, setSearchResult] = useState([]);
   const [loading, setLoading] = useState(false);

   // Workaround for search feature
   const [songsDb, setSongsDb] = useState([]);
   const [artistsDb, setArtistsDb] = useState([]);
   const [albumsDb, setAlbumsDb] = useState([]);
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
               console.log("[fetchDb]", songsDb);
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
      results = [...getTop5Matches(songsDb, searchText), ...results];

      // console.log("Result after songs: ");
      // console.log(results);

      // get matches artist
      const artistResults = artistsDb
         .filter((s) =>
            removeAccents(s.name)
               .toLowerCase()
               .includes(removeAccents(searchText.toLowerCase()))
         )
         .slice(0, 5);

      // console.log("artistResults: ");
      // console.log(artistResults);

      results = [...results, ...artistResults];

      // console.log("Result after artists: ");
      // console.log(results);

      // get matches playlist
      // results = [...getTop5Matches(playlistsDb, searchText), ...results];

      // // get matches albums
      // results = [...getTop5Matches(albumsDb, searchText), ...results];

      setSearchResult(results);
   };

   const getTop5Matches = (input, search) => {
      let matches = input.filter((s) =>
         removeAccents(s.title)
            .toLowerCase()
            .includes(removeAccents(search.toLowerCase()))
      );

      return matches.slice(0, 5);
   };

   const fetchDb = async () => {
      try {
         const songs = await getAllDocs(firebaseCollections.songs);
         setSongsDb(songs.filter((e) => e !== undefined));

         const artists = await getAllDocs(firebaseCollections.artists);
         setArtistsDb(artists.filter((e) => e !== undefined));

         const albums = await getAllDocs("Albums");
         setAlbumsDb(albums.filter((e) => e !== undefined));

         const playlists = await getAllDocs("playlists");
         setPlaylistsDb(playlists.filter((e) => e !== undefined));

         return [songs, artists, albums, playlists];
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
                  if (
                     instance.props.hideOnInnerButtonPress &&
                     event.target.getAttribute("hide-on-press") === "false"
                  ) {
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
               className="w-[500px] h-auto min-h-20 pb-3 bg-primary -mt-1 rounded-2xl shadow-md text-primary px-3"
               tabIndex="-1"
               {...attrs}
            >
               <div className="w-full text-sm">
                  <div className="pt-4 pb-2">
                     {searchText === "" ? (
                        <div className="flex-btw">
                           <h2 className="font-semibold text-primary">
                              Recent searches
                           </h2>
                           <button
                              className="px-3 text-xs text-secondary hover:text-primary"
                              onClick={() => dispatch(clearSearchHistory())}
                           >
                              Clear
                           </button>
                        </div>
                     ) : (
                        <>
                           <h2 className="font-semibold">Top results</h2>
                        </>
                     )}
                  </div>
                  <div>
                     {loading ? (
                        <div className="w-full h-60 flex-center">
                           <SyncLoader
                              color="rgb(20, 184, 166)"
                              loading={loading}
                              cssOverride={override}
                              size={10}
                           />
                        </div>
                     ) : searchText === "" ? (
                        searchHistory.length ? (
                           <SearchItem infos={searchHistory} />
                        ) : (
                           <div className="w-full h-28 flex-center text-secondary">
                              No search history
                           </div>
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
                  className="absolute text-xl text-placeholder top-[6px] right-3 hover:text-dandelion-primary cursor-pointer p-1 rounded-full"
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
