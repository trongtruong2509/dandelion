import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getUserDb } from "../../utils/user";

import { updateUser, removeUser } from "../../Reducers/userSlice";

const Login = ({ children }) => {
   const user = useSelector((state) => state.user.value);
   const dispatch = useDispatch();

   const loginGoogle = async () => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      try {
         const result = await signInWithPopup(auth, provider);
         const user = result.user;

         const userDb = await getUserDb(user.email);

         if (userDb) {
            dispatch(updateUser(userDb));
         } else {
            dispatch(
               updateUser({
                  id: user.email,
                  name: user.displayName,
                  avatar: user.photoURL,
                  phone: user.phoneNumber,
                  uploaded: [],
                  likedSongs: [],
                  createdPlaylist: [],
                  recentPlayed: [],
                  likedPlaylists: [],
                  likedAlbums: [],
               })
            );
         }
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
      }
   };

   const logout = () => {
      console.log("logging out...");
      dispatch(removeUser());
   };

   return <button onClick={user ? logout : loginGoogle}>{children}</button>;
};

export default Login;
