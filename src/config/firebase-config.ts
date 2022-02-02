import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";

export const firebaseConfig = {
  apiKey: "process.env.VUE_APP_API_KEY",
  authDomain: "process.env.VUE_APP_AUTH_DOMAIN",
  projectId: "process.env.VUE_APP_PROJECT_ID",
  storageBucket: "process.env.VUE_APP_STORAGE_BUCKET",
  messagingSenderId: "process.env.VUE_APP_MESSAGING_SENDING_ID",
  appId: "process.env.VUE_APP_APP_ID",
};

console.log(firebaseConfig);

//Firebase.initializeApp()を何度も呼び出すことを防ぐために以下のコードで対応
export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const storage = getStorage(firebaseApp);
export const db = getFirestore();
export const auth = getAuth();
