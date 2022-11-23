import { firebaseCollections } from "../../dataTemplate";
import { updateDocField } from "./firebaseApi";
import { toast } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../../firebase.config";

export const updateRank = async (songInfo, newRank) => {
   console.log("[songInfo]", songInfo);
   console.log("[newRank]", newRank);
   const data = {
      rank: newRank,
   };

   await toast.promise(updateDocField(firebaseCollections.songs, songInfo.id, data), {
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

export const getLatestSongs = async () => {
   const q = query(
      collection(firestore, firebaseCollections.songs),
      where("uploadDate", ">=", Date.now() - 15592000000)
   );

   try {
      const querySnapshot = await getDocs(q);

      let reuturnDoc = [];
      querySnapshot.forEach((doc) => {
         // doc.data() is never undefined for query doc snapshots
         reuturnDoc.push(doc.data());
      });

      console.log("[getLatestSongs]", reuturnDoc);

      return reuturnDoc
         .sort((a, b) => a.uploadDate - b.uploadDate)
         .reverse()
         .slice(0, 20);
   } catch (error) {
      console.log(error);
      return null;
   }
};
