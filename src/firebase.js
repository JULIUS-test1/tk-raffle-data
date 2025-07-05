// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAiFXamP_tfQfWRS2RF0fTcw_RV95rbcW0',
  authDomain: 'tk-raffle-data.firebaseapp.com',
  projectId: 'tk-raffle-data',
  storageBucket: 'tk-raffle-data.firebasestorage.app',
  messagingSenderId: '451018844608',
  appId: '1:451018844608:web:08e75f2ba36dcbcd35c025',
  measurementId: 'G-X3L3GNF25W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
