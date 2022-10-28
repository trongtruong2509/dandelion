import { deleteDocById } from "../common/utils/firebaseApi";

export const deleteTrackById = async (id) => {
   console.log("[deleteTrackById] id: ", id);
   return deleteDocById("songs", id);

   //    console.log("[deleteTrackById] res: ", res);
   //    return res;
};
