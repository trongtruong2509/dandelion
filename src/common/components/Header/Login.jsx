import React from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { getUserDb } from "../../utils/user";

import { updateUser } from "../../slices/userSlice";

const loginGoogle = async () => {
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

const Login = ({ children }) => {
   const dispatch = useDispatch();

   const handleLogin = async () => {
      const user = await loginGoogle();
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
   };

   return <div onClick={() => handleLogin()}>{children}</div>;
};

export default Login;
