
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALt29nC0jE1bbZ4CGnFW3hb09rULsOZ0o",
  authDomain: "hospital-locator-web.firebaseapp.com",
  projectId: "hospital-locator-web",
  storageBucket: "hospital-locator-web.appspot.com",
  messagingSenderId: "865517488306",
  appId: "1:865517488306:web:aee0ab2aff3f25bc50a1ab",
  measurementId: "G-VSF3Y1LS79",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
