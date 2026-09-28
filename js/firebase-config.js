/**
 * wave.africa - Firebase Cloud Integration
 * Powers real cross-device authentication (Email/Password + Google Sign-In)
 * and Cloud Firestore synchronization for shared user profiles, friends & creators.
 */

const firebaseConfig = {
  apiKey: "AIzaSyDKjVraXVL5CmqvwAq5NAlIWzQ58mLlptI",
  authDomain: "toktube-africa.firebaseapp.com",
  databaseURL: "https://toktube-africa-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "toktube-africa",
  storageBucket: "toktube-africa.firebasestorage.app",
  messagingSenderId: "801478450004",
  appId: "1:801478450004:web:00c228cacf96370e4986c1",
  measurementId: "G-H1VKWXBFC6"
};

let fbApp = null;
let fbAuth = null;
let fbDb = null;
let fbRtdb = null;
let fbGoogleProvider = null;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      fbApp = firebase.initializeApp(firebaseConfig);
    } else {
      fbApp = firebase.app();
    }
    if (firebase.auth) fbAuth = firebase.auth();
    if (firebase.firestore) fbDb = firebase.firestore();
    if (firebase.database) fbRtdb = firebase.database();
    if (firebase.auth) fbGoogleProvider = new firebase.auth.GoogleAuthProvider();
  }
} catch (e) {
  console.warn('Firebase init notice:', e);
}

window.tokFirebase = {
  app: fbApp,
  auth: fbAuth,
  db: fbDb,
  rtdb: fbRtdb,
  databaseURL: "https://toktube-africa-default-rtdb.europe-west1.firebasedatabase.app",
  googleProvider: fbGoogleProvider,
  isReady: () => !!(fbAuth || fbDb || fbRtdb)
};
