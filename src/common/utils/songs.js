import { firebaseKeys } from "../../dataTemplate";
import { updateDocField } from "./firebaseApi";
import { toast } from "react-toastify";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { async } from "@firebase/util";

export const updateRank = async (songInfo, newRank) => {
   console.log("[songInfo]", songInfo);
   console.log("[newRank]", newRank);
   const data = {
      rank: newRank,
   };

   await toast.promise(updateDocField(firebaseKeys.songs, songInfo.id, data), {
      pending: `Updating rank of ${songInfo.title} to ${newRank}...`,
      success: `${songInfo.title} rank is updated to ${newRank}`,
      error: {
         render({ data }) {
            // When the promise reject, data will contains the error
            return (
               <div>
                  <h2 className="text-sm">{`${songInfo.title} rank updated fail with error: `}</h2>
                  <p className="mt-2 text-xs">{data.message}</p>
               </div>
            );
         },
      },
   });
};

export const getLatestSongs = async (genreId) => {
   let q = query(collection(firestore, firebaseKeys.songs), orderBy("uploadDate", "desc"), limit(20));

   if (genreId && genreId !== "All") {
      console.log("[genreId]", genreId);
      q = query(
         collection(firestore, firebaseKeys.songs),
         where("genreIds", "array-contains", genreId),
         orderBy("uploadDate", "desc"),
         limit(20)
      );
   }

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         reuturnDoc.push(doc.data());
      });

      console.log("[getLatestSongs]", reuturnDoc);

      return reuturnDoc
         .sort((a, b) => a.uploadDate - b.uploadDate)
         .reverse()
         .slice(0, 20);
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const getSuggestedSongs = async (playing) => {
   let result = [];

   const queryByArtist = query(
      collection(firestore, firebaseKeys.songs),
      where("artistsNames", ">=", playing.artistsNames),
      where("artistsNames", "<=", playing.artistsNames + "\uf8ff")
   );

   try {
      const querySnapshotArtis = await getDocs(queryByArtist);
      querySnapshotArtis.forEach((doc) => {
         result.push(doc.data());
      });

      const genresFiltered = playing.genreIds.filter((g) => !["IWZ9Z08I", "IWZ9Z08O", "IWZ9Z08W"].includes(g));

      console.log("[getSuggestedSongs]", playing.genreIds, genresFiltered);

      if (genresFiltered.length) {
         const queryByGenres = query(
            collection(firestore, firebaseKeys.songs),
            where("genreIds", "array-contains-any", genresFiltered),
            where("releaseDate", "<", playing.releaseDate + 31556926),
            where("releaseDate", ">", playing.releaseDate - 31556926),
            limit(20)
         );

         const querySnapshotGenres = await getDocs(queryByGenres);

         querySnapshotGenres.forEach((doc) => {
            const data = doc.data();
            if (!result.find((t) => t.id === data.id)) {
               result.push(data);
            }
         });
      }

      // TODO: random before slice to 20
      return result;
   } catch (error) {
      console.log(error);
      return [];
   }
};

export const getArtistTopHits = async (artist) => {
   let q = query(collection(firestore, firebaseKeys.songs), where("artists", "array-contains", artist), limit(20));

   try {
      const querySnapshot = await getDocs(q);

      let result = [];
      querySnapshot.forEach((doc) => {
         result.push(doc.data());
      });

      // console.log("[getArtistTopHits]", result);

      return result;
   } catch (error) {
      console.log(error);
      return [];
   }
};
