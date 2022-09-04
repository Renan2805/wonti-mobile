// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp  } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTw0Mu9UEKDx01aGzZKmvmPniUHCha128",
  authDomain: "wonti-a8616.firebaseapp.com",
  databaseURL: "https://wonti-a8616-default-rtdb.firebaseio.com",
  projectId: "wonti-a8616",
  storageBucket: "wonti-a8616.appspot.com",
  messagingSenderId: "419836108361",
  appId: "1:419836108361:web:6013bf62250761ac0ba998",
  measurementId: "G-CS9L0Y9D8V"
};

// Initialize Firebase
let app
if(getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}

const auth     = getAuth(app)
const storage  = getStorage(app)
const db = getFirestore(app)
export { auth, storage, db }