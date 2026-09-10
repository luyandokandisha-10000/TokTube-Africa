/**
 * TokTube Africa - Firebase Cloud Integration
 * Powers real cross-device authentication (Email/Password + Google Sign-In)
 * and Cloud Firestore synchronization for shared user profiles, friends & creators.
 */

const firebaseConfig = {
  apiKey: "AIzaSyDKjVraXVL5CmqvwAq5NAlIWzQ58mLlptI",
  authDomain: "toktube-africa.firebaseapp.com",
  projectId: "toktube-africa",
  storageBucket: "toktube-africa.firebasestorage.app",
  messagingSenderId: "801478450004",
  appId: "1:801478450004:web:00c228cacf96370e4986c1",
  measurementId: "G-H1VKWXBFC6"
};

let fbApp = null;
let fbAuth = null;
let fbDb = null;
let fbGoogleProvider = null;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      fbApp = firebase.initializeApp(firebaseConfig);
    } else {
      fbApp = firebase.app();
    }
    fbAuth = firebase.auth();
    fbDb = firebase.firestore();
    fbGoogleProvider = new firebase.auth.GoogleAuthProvider();
  }
} catch (e) {
  console.warn('Firebase init notice:', e);
}

window.tokFirebase = {
  app: fbApp,
  auth: fbAuth,
  db: fbDb,
  googleProvider: fbGoogleProvider,
  isReady: () => !!(fbAuth && fbDb)
};
