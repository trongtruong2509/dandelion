import React, { useEffect, useState } from "react";
import Tippy from "@tippyjs/react/headless"; // different import path!
import { MdSearch } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";

import SearchItem from "./SearchItem";
import { getAllDocs } from "../../utils/firebaseApi";
import { artistExample } from "../../../tempData/artists";
import { useParams } from "react-router-dom";
import { useRef } from "react";

function removeAccents(str) {
   return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
}

const Search = () => {
   const user = useSelector((state) => state.user.value);
   const params = useParams();
   const ref = useRef();

   const [searchText, setSearchText] = useState("");
   const [searchResult, setSearchResult] = useState([]);

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
         fetchDb().then(() => {
            getResults();
         });
         setFirstTime(false);
      } else {
         getResults();
      }
   }, [searchText]);

   const getResults = () => {
      let results = [];

      // get matches songs
      results = [...getTop5Matches(songsDb, searchText), ...results];

      console.log("Result after songs: ");
      console.log(results);

      // get matches artist
      const artistResults = artistsDb
         .filter((s) =>
            removeAccents(s.name)
               .toLowerCase()
               .includes(searchText.toLowerCase())
         )
         .slice(0, 5);

      console.log("artistResults: ");
      console.log(artistResults);

      results = [...results, ...artistResults];

      console.log("Result after artists: ");
      console.log(results);

      // get matches playlist
      // results = [...getTop5Matches(playlistsDb, searchText), ...results];

      // // get matches albums
      // results = [...getTop5Matches(albumsDb, searchText), ...results];

      setSearchResult(results);
   };

   useEffect(() => {
      // console.log("searchResult");
      // console.log(searchResult);
   }, [searchResult]);

   const getTop5Matches = (input, search) => {
      let matches = input.filter((s) =>
         removeAccents(s.title).toLowerCase().includes(search.toLowerCase())
      );

      return matches.slice(0, 5);
   };

   const fetchDb = async () => {
      try {
         const songs = await getAllDocs("Songs");
         setSongsDb(songs.filter((e) => e !== undefined));

         const artists = await getAllDocs("Artists");
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

   return (
      <Tippy
         interactive
         // hideOnClick="toggle"
         placement="bottom"
         appendTo={() => document.body}
         delay={[0, 700]}
         trigger="click"
         // reference={ref}
         render={(attrs) => (
            <div
               className="w-[500px] h-auto min-h-20 pb-3 bg-dark-3 -mt-[11px] rounded-b-2xl text-white px-3"
               tabIndex="-1"
               {...attrs}
            >
               <div className="w-full text-sm">
                  <div className="pb-2 pt-4">
                     {searchText === "" ? (
                        <div className="flex justify-between items-center ">
                           <h2 className="font-semibold">Recent searches</h2>
                           <button className="text-xs px-3 text-secondary hover:text-primary">
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
                     {searchText === "" ? (
                        <SearchItem infos={artistExample} />
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
               className="w-full py-[10px] rounded-2xl outline-none bg-hover-1 pl-10 text-sm text-white 
                            focus-within:rounded-b-none focus-within:bg-dark-3"
               placeholder="Search for song, artist, album..."
            />
            <MdSearch className="absolute top-2 left-3 text-2xl text-white opacity-50" />
         </div>
      </Tippy>
   );
};

export default Search;
