import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: "https://blog-34c3c-default-rtdb.firebaseio.com",
//   projectId: "blog-34c3c",
//   storageBucket: "blog-34c3c.appspot.com",
//   messagingSenderId: "86049189914",
//   appId: "1:86049189914:web:cc67b12258724d2ac221a3",
//   measurementId: "G-176JC098TT",
//   storageBucket: "blog-34c3c/storage/blog-34c3c.appspot.com/files",
// });
firebase.initializeApp({
  apiKey: "AIzaSyAk4eNtEDP8Xftq6DtOCLgCg3VWwpXIjsg",
  authDomain: "myblog-97a77.firebaseapp.com",
  projectId: "myblog-97a77",
  storageBucket: "myblog-97a77.appspot.com",
  messagingSenderId: "722508497797",
  appId: "1:722508497797:web:6d7c233ba9d471b7c3baec",
  measurementId: "G-LV172X56MD",
});
const fb = firebase;

export default fb;
