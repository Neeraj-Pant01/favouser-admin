import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBYr970X9-wyvgkBTUOXkV2XRIvyYF9ao",
  authDomain: "video-e795c.firebaseapp.com",
  projectId: "video-e795c",
  storageBucket: "video-e795c.appspot.com",
  messagingSenderId: "636466290959",
  appId: "1:636466290959:web:fb947720af92520437de7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app