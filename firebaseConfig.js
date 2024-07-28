// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1MMfYlHuTHa2aqQb5wi24avNhLgzgcWs",
  authDomain: "successcomniger-3581e.firebaseapp.com",
  databaseURL: "https://successcomniger-3581e-default-rtdb.firebaseio.com",
  projectId: "successcomniger-3581e",
  storageBucket: "successcomniger-3581e.appspot.com",
  messagingSenderId: "42775382076",
  appId: "1:42775382076:android:4f08340dc883fe1914db39",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const database = getDatabase(app);
const storage = getStorage(app);

export { auth, database, app, storage };
