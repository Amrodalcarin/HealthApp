import firebase from "firebase";
import "firebase/firestore";

// firebase init goes here
const config = {
  apiKey: "your api key",
  authDomain: "your api domain",
  databaseURL: "your database url",
  projectId: "your project id",
  storageBucket: "your storage bucket",
  messagingSenderId: "your messagin sender id",
  appId: "your api id",
};
firebase.initializeApp(config);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const currentUser = auth.currentUser;

// firebase collections
const usersCollection = db.collection("users");
const postsCollection = db.collection("posts");
const commentsCollection = db.collection("comments");
const likesCollection = db.collection("likes");

export {
  db,
  auth,
  storage,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection,
};
