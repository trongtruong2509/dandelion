import { firebaseCollections } from "../../dataTemplate";
import { updateDocById } from "./firebaseApi";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase.config";

export const getLatestPlaylists = async () => {
   const q = query(
      collection(firestore, firebaseCollections.playlists),
      where("uploadDate", ">=", Date.now() - 15592000000)
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
