import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
};

console.log("projectId:" + process.env.VUE_APP_PROJECT_ID);

export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const database = getDatabase();
