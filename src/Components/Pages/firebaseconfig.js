// Import the necessary Firebase functions
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";  // Import Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBywR58kQSgMdt_AsfujFvv7mnJSBnQbKY",
  authDomain: "petstoree-8fdba.firebaseapp.com",
  projectId: "petstoree-8fdba",
  storageBucket: "petstoree-8fdba.appspot.com",
  messagingSenderId: "212776655781",
  appId: "1:212776655781:web:20a805fdc44af8cbd8e64c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage and export it
const storage = getStorage(app);
export { storage };
