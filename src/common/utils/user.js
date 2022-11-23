import { addNewDoc, getDocById, getDocInList, updateDocField } from "./firebaseApi";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseCollections } from "../../dataTemplate";

export const updateUserDb = (user) => {
   addNewDoc("Users", user, user.id);
};

export const getUserDb = async (userId) => {
   return await getDocById("Users", userId);
};

export const updateUserRecentPlayed = async (user) => {
   console.log("[updateUserRecentPlayed] user", user);
   await updateDocField(firebaseCollections.users, user.id, { recentPlayed: user.recentPlayed });
};

export const getArtistDb = async (id) => {
   return await getDocById(firebaseCollections.artists, id);
};

export const updateUserLocal = (user) => {
   localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getUserLocal = () => {
   return JSON.parse(localStorage.getItem("currentUser"));
};

export const getNoLoggedUser = () => {
   let noLoggedUser = JSON.parse(localStorage.getItem("noLoggedUser"));

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
         recentPlayed: [], //ids of playlist
         likedSongs: [],
         likedPlaylists: [],
         likedAlbums: [],
      };

      localStorage.setItem("noLoggedUser", JSON.stringify(noLoggedUser));
   }

   return noLoggedUser;
};

export const loginGoogle = async () => {
   const provider = new GoogleAuthProvider();
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
      console.log("errorrrrrrrrrrrr");
      return null;
   }
};
