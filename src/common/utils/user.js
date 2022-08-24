import { addNewDoc, getDocById } from "./firebaseApi";

const updateUserToDb = async (user) => {
   // use user.email as id because at the moment we use email for document id!
   const existingUser = await getDocById("Users", user.email);

   let userInfo = {
      id: user.email,
      name: user.displayName,
      avatar: user.photoURL,
      phone: user.phoneNumber,
      uploaded: [],
      likedSongs: [],
      createdPlaylist: [],
      recentPlayed: [], //ids of playlist
      likedSongs: [],
      likedPlaylists: [],
      likedAlbums: [],
   };

   if (!existingUser) {
      addNewDoc("Users", user.email, userInfo);
      console.log("added new user");
   } else {
      console.log("user already exist");
      userInfo = { ...existingUser };
   }

   return userInfo;
};

export const updateUserDb = (user) => {
   addNewDoc("Users", user.id, user);
};

export const getUserDb = async (userId) => {
   return await getDocById("Users", userId);
};

export const updateUserLocal = (user) => {
   localStorage.setItem("currentUser", JSON.stringify(user));
};

export const getUserLocal = () => {
   return JSON.parse(localStorage.getItem("currentUser"));
};

// export const updateUser = async (user) => {
//    const userInfo = await updateUserToDb(user);
//    console.log(userInfo);
//    updateUserLocal(userInfo);
// };
