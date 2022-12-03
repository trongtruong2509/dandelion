// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAS_2JdDRnhruOIoVUS75UkaDcMdQnVDsE",
   authDomain: "dandelion-6b7ff.firebaseapp.com",
   projectId: "dandelion-6b7ff",
   storageBucket: "dandelion-6b7ff.appspot.com",
   messagingSenderId: "205939508866",
   appId: "1:205939508866:web:42687f0414768efa49569b",
   measurementId: "G-PD64GYFMD1",
};

// Initialize Firebase

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const firestore = initializeFirestore(app, {
   experimentalForceLongPolling: true,
});

export { app, storage, firestore };
