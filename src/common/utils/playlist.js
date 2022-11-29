import { firebaseCollections } from "../../dataTemplate";
import { updateDocById } from "./firebaseApi";
import { toast } from "react-toastify";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase.config";

export const getLatestPlaylists = async () => {
   const q = query(
      collection(firestore, firebaseCollections.playlists),
      orderBy("updateDate"),
      limit(20)
   );

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         reuturnDoc.push(doc.data());
      });

      return reuturnDoc
         .sort((a, b) => a.uploadDate - b.uploadDate)
         .reverse()
         .slice(0, 20);
   } catch (error) {
      console.log(error);
      return null;
   }
};
