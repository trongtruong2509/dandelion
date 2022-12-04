import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "../../firebase.config";

import { firebaseKeys } from "../../dataTemplate";

export const getLatestPlaylists = async () => {
   const q = query(
      collection(firestore, firebaseKeys.playlists),
      orderBy("updateDate"), //TODO: desc order
      limit(20)
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
