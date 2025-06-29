import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//initialize firebase
const firebaseConfig = {
  apiKey: "AIzaSyA2XP5F6-v7cdnoymQ6S0jxzIQNfRDoHds",
  authDomain: "alpha-6868a.firebaseapp.com",
  databaseURL:
    "https://alpha-6868a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "alpha-6868a",
  storageBucket: "alpha-6868a.appspot.com",
  messagingSenderId: "972046578980",
  appId: "1:972046578980:web:410548047c6e834effefb1",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = firebase.app();
const auth = firebase.auth();
const db = firebase.firestore();
export { firebase, app, db, auth };
