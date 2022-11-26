// import { collection, getDocs, query, where } from "firebase/firestore";
import { firebaseCollections } from "../../dataTemplate";
import { shuffleArray } from "./common";
import { getAllDocs } from "./firebaseApi";

export const getSuggestedArtists = async () => {
   const artists = await getAllDocs(firebaseCollections.artists);
   shuffleArray(artists);
   // console.log("[getSuggestedArtists]", artists);
   return artists.slice(5, 10);
};
