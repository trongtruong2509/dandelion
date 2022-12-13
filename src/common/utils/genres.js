import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { RankNames } from "../../admin/components/Rank/Rank";
import { firebaseKeys } from "../../dataTemplate";
import { firestore } from "../../firebase.config";
import { addNewDoc, getAllDocs, getDocById, getDocInList } from "./firebaseApi";

export const initGenres = async (collection, data) => {
   data.forEach((topic) => {
      addNewDoc(collection, topic, topic.id);
   });
};

export const getTopic = async (id) => {
   return getDocById(firebaseKeys.topics, id);
};

const getTopSongs = async (countryId) => {
   let result = [];

   const q = query(
      collection(firestore, firebaseKeys.songs),
      where("rank", "in", [RankNames.Splus, RankNames.S]),
      where("genreIds", "array-contains", countryId),
      limit(30)
   );

   try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
         result.push(doc.data());
      });

      return result;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const fetchCountryGenreInfo = async (genre) => {
   genre.topPlaylist = await getDocInList(firebaseKeys.playlists, genre.topPlaylist);

   // top songs
   genre.topTracks = await getTopSongs(genre.id);

   genre.topArtist = await getDocInList(firebaseKeys.artists, genre.topArtist);

   for (const p of genre.playlist) {
      p.list = await getDocInList(firebaseKeys.playlists, p.list);
   }

   console.log("[fetchCountryGenreInfo] genre", genre);

   return genre;
};
