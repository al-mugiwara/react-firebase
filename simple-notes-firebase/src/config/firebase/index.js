
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
//import 'firebase/auth';
import { getAuth } from "firebase/auth";
// import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCEBJvM_YKGO967tZt5RTyDfqVHAw1SEuc",
    authDomain: "simple-notes-firebase-fa046.firebaseapp.com",
    projectId: "simple-notes-firebase-fa046",
    storageBucket: "simple-notes-firebase-fa046.appspot.com",
    messagingSenderId: "506160322229",
    appId: "1:506160322229:web:735895c458f379402a50fc",
    measurementId: "G-LCQL946B99"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  export default firebaseConfig;