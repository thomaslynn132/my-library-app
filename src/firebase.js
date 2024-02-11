//firebase.js
// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAacvigWzi_TgQHORMTohH7iAfImNYBhxw",
  authDomain: "my-books-to-read-now.firebaseapp.com",
  projectId: "my-books-to-read-now",
  storageBucket: "my-books-to-read-now.appspot.com",
  messagingSenderId: "696046655162",
  appId: "1:696046655162:web:d9c93891297d1616601483",
  measurementId: "G-KW8LWRZ9R0",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage();

export {
  app,
  analytics,
  firestore,
  collection,
  addDoc,
  storage,
  ref,
  uploadBytes,
  getDocs,
};
