import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const config = {
    apiKey: "AIzaSyBcNhGaCTvcPU5zj-TsZUTTe7GsMs89KL4",
    authDomain: "nutricare-9e948.firebaseapp.com",
    databaseURL: "https://nutricare-9e948.firebaseio.com",
    projectId: "nutricare-9e948",
    storageBucket: "nutricare-9e948.appspot.com",
    messagingSenderId: "717400188161",
    appId: "1:717400188161:web:9b143e8801b741627ce700"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    storage,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}