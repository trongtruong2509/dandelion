// import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";

export const addSongInfo = async (info) => {
   await setDoc(doc(firestore, "Songs", `${Date.now()}`), info, {
      merge: true,
   });
};

const test = async () => {
   const citiesRef = collection(firestore, "cities");

   console.log("test firebase api");

   await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco",
      state: "CA",
      country: "USA",
      capital: false,
      population: 860000,
      regions: ["west_coast", "norcal"],
   });
   await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles",
      state: "CA",
      country: "USA",
      capital: false,
      population: 3900000,
      regions: ["west_coast", "socal"],
   });
   await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.",
      state: null,
      country: "USA",
      capital: true,
      population: 680000,
      regions: ["east_coast"],
   });
   await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo",
      state: null,
      country: "Japan",
      capital: true,
      population: 9000000,
      regions: ["kanto", "honshu"],
   });
   await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing",
      state: null,
      country: "China",
      capital: true,
      population: 21500000,
      regions: ["jingjinji", "hebei"],
   });
};

// test();
