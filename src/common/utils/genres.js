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

export const calcHotArtist = async () => {
   const threshold = 3;
   let qualified = [];

   const tracks = await getAllDocs(firebaseKeys.songs);
   const artists = await getAllDocs(firebaseKeys.artists);

   console.log("[calcHotArtist] tracks", tracks);
   console.log("[calcHotArtist] artists", artists);

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

   console.log("[calcHotArtist] qualified");
   qualified.forEach((q) => {
      console.log(`[${q.artist.id}] ${q.artist.name} `, q.songs.length);
   });
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
   genre.topPlaylist = await getDocInList(
      firebaseKeys.playlists,
      genre.topPlaylist
   );

   // top songs
   genre.topTracks = await getTopSongs(genre.id);

   genre.topArtist = await getDocInList(firebaseKeys.artists, genre.topArtist);

   for (const p of genre.playlist) {
      p.list = await getDocInList(firebaseKeys.playlists, p.list);
   }

   console.log("[fetchCountryGenreInfo] genre", genre);

   return genre;
};
