import { addNewDoc, getDocById, getDocInList } from "./firebaseApi";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// const updateUserToDb = async (user) => {
//    // use user.email as id because at the moment we use email for document id!
//    const existingUser = await getDocById("Users", user.email);

//    let userInfo = {
//       id: user.email,
//       name: user.displayName,
//       avatar: user.photoURL,
//       phone: user.phoneNumber,
//       uploaded: [],
//       likedSongs: [],
//       createdPlaylist: [],
//       recentPlayed: [], //ids of playlist
//       likedPlaylists: [],
//       likedAlbums: [],
//    };

//    if (!existingUser) {
//       addNewDoc("Users", user.email, userInfo);
//       console.log("added new user");
//    } else {
//       console.log("user already exist");
//       userInfo = { ...existingUser };
//    }

//    return userInfo;
// };

export const updateUserDb = (user) => {
   addNewDoc("Users", user, user.id);
};

export const getUserDb = async (userId) => {
   return await getDocById("Users", userId);
};

export const getArtistDb = async (id) => {
   return await getDocById("Artists", id);
};

export const updateUserLocal = (user) => {
   localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getUserLocal = () => {
   let noLoggedUser = null;
   const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   console.log("[getUserLocal]", currentUser);

   if (currentUser) {
      return currentUser;
   } else {
      noLoggedUser = JSON.parse(localStorage.getItem("noLoggedUser"));

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
   }
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
