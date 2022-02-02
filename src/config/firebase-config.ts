import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCt_9gv40KuIaPEoguSn5471vfGA9bzo6s",
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDING_ID,
  appId: process.env.VUE_APP_APP_ID,
};
export const app = initializeApp(firebaseConfig);
