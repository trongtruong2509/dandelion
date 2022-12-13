// import { collection, getDocs, query, where } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseKeys } from "../../dataTemplate";
import { firestore } from "../../firebase.config";
import { shuffleArray } from "./common";
import { getAllDocs } from "./firebaseApi";

export const getSuggestedArtists = async () => {
   const artists = await getAllDocs(firebaseKeys.artists);
   shuffleArray(artists);
   // console.log("[getSuggestedArtists]", artists);
   return artists.slice(5, 10);
};

export const getArtistByName = async (artistName) => {
   const q = query(collection(firestore, firebaseKeys.artists), where("name", "==", artistName));

   try {
      const querySnapshot = await getDocs(q);

      let results = [];
      querySnapshot.forEach((doc) => {
         results.push(doc.data());
      });

      if (results.length) {
         return results[0];
      } else {
         return null;
      }
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getPopularArtist = async () => {
   const threshold = 3;
   let qualified = [];

   const tracks = await getAllDocs(firebaseKeys.songs);
   const artists = await getAllDocs(firebaseKeys.artists);

   artists.forEach((artist) => {
      const songs = tracks.filter((t) => t.artistsNames.includes(artist.name));

      if (songs.length >= threshold) {
         qualified.push({ artist, songs });
      }
   });

   qualified.sort((a, b) => {
      if (a.songs.length < b.songs.length) {
         return 1;
      }
      if (a.songs.length > b.songs.length) {
         return -1;
      }

      // names must be equal
      return 0;
   });

   qualified = qualified.slice(0, 50);
   let shuffled = [...qualified].sort(() => 0.5 - Math.random());

   shuffled = shuffled.slice(0, 10);
   // console.log("[calcHotArtist] qualified");
   // shuffled.forEach((q) => {
   //    console.log(`[${q.artist.id}] ${q.artist.name} `, q.songs.length, q.songs);
   // });

   return shuffled.map((a) => a.artist);
};
