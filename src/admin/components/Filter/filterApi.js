import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import { paths } from "../../../app/routes";
import { addNewDoc, getAllDocs, updateDocField } from "../../../common/utils/firebaseApi";
import { firebaseKeys } from "../../../dataTemplate";
import { firestore } from "../../../firebase.config";

export const getTracksByCountry = async (country) => {
   const q = query(collection(firestore, firebaseKeys.songs), where("genreIds", "array-contains", country));

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         // console.log(doc.id, " => ", doc.data());
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getTracksByVendor = async (vendor) => {
   const q = query(collection(firestore, firebaseKeys.songs), where("vendor", "==", vendor));

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         // console.log(doc.id, " => ", doc.data());
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getTracksByTag = async (tag) => {
   const q = query(collection(firestore, firebaseKeys.songs), where("tags", "array-contains", tag));

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         // console.log(doc.id, " => ", doc.data());
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getTracksByRank = async (rank) => {
   const q = query(collection(firestore, firebaseKeys.songs), where("rank", "==", rank));

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         // console.log(doc.id, " => ", doc.data());
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getTracksByGenre = async (id) => {
   const q = query(collection(firestore, firebaseKeys.songs), where("rank", "==", id));

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         // console.log(doc.id, " => ", doc.data());
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const uploadAllExistGenres = async () => {
   const alltracks = await getAllDocs(firebaseKeys.songs);

   let allGenres = [];

   alltracks.forEach((t) => {
      allGenres = allGenres.concat(
         t.genres.map((g) => ({
            ...g,
            link: `${paths.genre.replace(":id", g.alias)}`,
         }))
      );
   });

   let distinctGenres = [];

   allGenres.forEach((g) => {
      if (!distinctGenres.find((t) => t.id === g.id)) {
         distinctGenres.push(g);
      }
   });

   distinctGenres.forEach((genre) => {
      addNewDoc(firebaseKeys.genres, genre, genre.id);
   });
};

export const updateTagsFieldAll = async () => {
   const allSongs = await getAllDocs(firebaseKeys.songs);
   const noTags = allSongs.filter((s) => !s.tags);
   console.log("[updateTagsFieldAll] noTags count", noTags?.length);

   for (const song of noTags) {
      await updateDocField(firebaseKeys.songs, song.id, { tags: [] });
   }
};
