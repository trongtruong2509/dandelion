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

export const addNewDoc = async (collection, id = `${Date.now()}`, info) => {
   console.log(id);
   console.log(info);
   await setDoc(doc(firestore, collection, id), info, {
      merge: true,
   });
};

export const getDocById = async (collection, id) => {
   const ref = doc(firestore, collection, id);

   try {
      const doc = await getDoc(ref);

      return doc.data();
   } catch (error) {
      console.log(error);
      return null;
   }
};

export const getDocInList = async (document, filter) => {
   // console.log(filter);
   const q = query(collection(firestore, document), where("id", "in", filter));

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
