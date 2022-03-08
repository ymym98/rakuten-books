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

// 論理否定だから、firebase.apps.lengthがある時(true)はfalseの処理に。ない時(false)はtrueの処理にいく。
export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig) // ← なかったら初期化
  : firebase.app(); // ← あったらインスタンスを取得

export const db = getFirestore();
export const database = getDatabase();
