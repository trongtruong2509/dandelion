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
