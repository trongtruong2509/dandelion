import { addNewDoc, getDocById } from "./firebaseApi";

export const updateUserToDb = async (user) => {
   // use user.email as id because at the moment we use email for document id!
   const existingUser = await getDocById("Users", user.email);

   if (!existingUser) {
      const userInfo = {
         id: user.email,
         name: user.displayName,
         avatar: user.photoURL,
         phone: user.phoneNumber,
         playlist: [],
         liked: [],
         uploaded: [],
      };

      addNewDoc("Users", user.email, userInfo);
      console.log("added new user");
   } else {
      console.log("user already exist");
   }
};
