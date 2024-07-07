// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import {
  connectDatabaseEmulator,
  Database,
  getDatabase,
} from "firebase/database";
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export let firebaseApp: FirebaseApp = null!;
export let firebaseAuth: Auth = null!;
export let realtimeDatabase: Database = null!;
export let firestoreDatabase: Firestore = null!;

// Initialize Firebase
export const setupFirebase = () => {
  firebaseApp = initializeApp(firebaseConfig);
  firebaseAuth = getAuth(firebaseApp);

  // Initialize Realtime Database
  const realtimeDatabaseUrl: string = import.meta.env
    .VITE_FIREBASE_REALTIME_DATABASE_URL;

  realtimeDatabase = getDatabase(firebaseApp, realtimeDatabaseUrl);

  // Initialize Firestore Database
  firestoreDatabase = getFirestore(firebaseApp);

  // Setup connection to emulators
  if (import.meta.env.VITE_ENV === "development") {
    connectAuthEmulator(firebaseAuth, "http://127.0.0.1:9099");
    connectDatabaseEmulator(realtimeDatabase, "127.0.0.1", 9000);
    connectFirestoreEmulator(firestoreDatabase, "127.0.0.1", 8080);
  }

  // All ready!

  console.log(
    `🔥 Firebase se ha inicializado. AppId: ${firebaseApp.options.appId}`
  );
};
