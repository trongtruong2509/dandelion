import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { getDocById, getDocInList } from "../../common/utils/firebaseApi";
import { getArtistDb } from "../../common/utils/user";
import AlbumDefault from "./../../assets/album_default.png";
import PlaylistCover from "../../common/components/Playlist/PlaylistCover";

import { playlists as tempPlaylists } from "../../tempData/playlists";
import SongItem from "../../common/components/Song/SongItem";
import { firebaseCollections } from "../../dataTemplate";

const Genres = () => {
   const params = useParams();

   const [artist, setArtist] = useState(null);
   const [topHits, setTopHits] = useState(null);
   // const [tab, setTab] = useState(<Overview />);
   // const [tabIndex, setTabIndex] = useState(0);

   const tabStyle = `3xl:px-3 px-2 py-[5px] w-32 text-sm rounded-3xl text-navigation 
                     hover:text-dandelion-primary uppercase cursor-pointer text-center`;

   useEffect(() => {
      console.log(params.id);
      getArtistDb(params.id)
         .then((result) => {
            setArtist(result);
            console.log(result);
         })
         .catch((err) => {
            console.log("error while get user from db");
            console.log(err);
         });
   }, [params.id]);

   useEffect(() => {
      getDocInList(firebaseCollections.songs, artist?.topHits).then((result) => {
         setTopHits(result);
      });
   }, [artist]);

   const onOverview = () => {
      const topHits = [];

      // setTab(<Overview />);
   };

   return <div className="relative w-full px-3 mt-8 text-white">Genres</div>;
};

export default Genres;
