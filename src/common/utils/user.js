import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { addNewDoc, getDocById, updateDocField } from "./firebaseApi";
import { firebaseKeys } from "../../dataTemplate";
import { localKeys } from "./localStorage";

export const updateUserDb = (user) => {
   addNewDoc("Users", user, user.id);
};

export const getUserDb = async (userId) => {
   return await getDocById("Users", userId);
};

export const updateUserRecentPlayed = async (user) => {
   await updateDocField(firebaseKeys.users, user.id, {
      recentPlayed: user.recentPlayed,
   });
};

export const getArtistDb = async (id) => {
   return await getDocById(firebaseKeys.artists, id);
};

export const updateUserLocal = (type, user) => {
   localStorage.setItem(type, JSON.stringify(user));
};

export const getUserLocal = () => {
   return JSON.parse(localStorage.getItem(localKeys.user));
};

export const getNoLoggedUser = () => {
   let noLoggedUser = JSON.parse(localStorage.getItem(localKeys.nonUser));

   if (!noLoggedUser) {
      // if there is noLoggedUser yet. create new one.
      noLoggedUser = {
         id: "None",
         userName: "",
         mail: "",
         phone: "",
         avatar: "",
         uploaded: [],
         createdPlaylist: [],
         recentPlayed: [],
         recentPlaylist: [],
         likedSongs: [],
         likedPlaylists: [],
         likedAlbums: [],
      };

      localStorage.setItem(localKeys.nonUser, JSON.stringify(noLoggedUser));
   }

   return noLoggedUser;
};

export const loginGoogle = async () => {
   const provider = new GoogleAuthProvider();
   provider.setCustomParameters({ prompt: "select_account" });
   const auth = getAuth();

   try {
      const result = await signInWithPopup(auth, provider);
      const user = result?.user;

      return user;
   } catch (error) {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log("[loginGoogle] error", error);
      return null;
   }
};
