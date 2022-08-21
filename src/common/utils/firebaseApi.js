// import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export const addNewDoc = async (collection, id = `${Date.now()}`, info) => {
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
