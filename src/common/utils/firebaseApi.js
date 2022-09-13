// import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import {
   doc,
   getDoc,
   getDocs,
   query,
   where,
   setDoc,
   collection,
} from "firebase/firestore";
import { group } from "./common";

export const addNewDoc = async (collection, info, id = `${Date.now()}`) => {
   // console.log(id);
   // console.log(info);
   await setDoc(doc(firestore, collection, id), info, {
      merge: true,
   });
};

export const getDocById = async (collection, id) => {
   const ref = doc(firestore, collection, id);

   try {
      // console.log(ref);
      const doc = await getDoc(ref);

      return doc.data();
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getDocInList = async (document, filter) => {
   console.log("[getDocInList] filter",filter);
   const q = query(collection(firestore, document), where("id", "in", filter));
   let reuturnDoc = [];

   const filters = group(filter, 10);
      // console.log("[getDocInList] querySnapshot", querySnapshot);

      // let reuturnDoc = [];
      // querySnapshot.forEach((doc) => {
      //    // doc.data() is never undefined for query doc snapshots
      //    // console.log(doc.id, " => ", doc.data());
      //    reuturnDoc.push(doc.data());
      // });

   try {
      for (const filter of filters) {
         // console.log(filter);
         const q = query(
            collection(firestore, document),
            where("id", "in", filter)
         );

         const querySnapshot = await getDocs(q);

         querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            reuturnDoc.push(doc.data());
         });
      }

      console.log("[getDocInList] reuturnDoc", reuturnDoc);

      return reuturnDoc;
   } catch (error) {
      console.log("[getDocInList] error",error);

      return null;
   }
};

export const getLatestSongs = async () => {
   const q = query(
      collection(firestore, "Songs"),
      where("releaseDate", ">=", Date.now() - 2592000000)
   );

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

export const getDocumentContains = async (document, property, subtext) => {
   console.log(document + " " + property + " " + subtext);
   const q = query(
      collection(firestore, document),
      where(property, ">=", subtext)
   );

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc;
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getAllDocs = async (document) => {
   const ref = collection(firestore, document);

   try {
      const querySnapshot = await getDocs(ref);
      // console.log(querySnapshot);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         console.log(doc.data()?.title);
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc;
   } catch (error) {
      console.log(error);
      return null;
   }
};
