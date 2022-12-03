import { TopicGenres } from "../../data";
import { firebaseCollections } from "../../dataTemplate";
import { addNewDoc, getDocById } from "./firebaseApi";

export const initMoodeAndActivity = async () => {
   TopicGenres.forEach((topic) => {
      addNewDoc(firebaseCollections.topics, topic, topic.id);
   });
};

export const getTopic = async (id) => {
   return getDocById(firebaseCollections.topics, id);
};
