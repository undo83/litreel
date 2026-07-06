// === FIREBASE CONFIG (LitReel) ===
// Public by design; security comes from Firestore Rules + authorized domains.
export const firebaseConfig = {
  apiKey: "AIzaSyCFAxDflid5ZkM7MeRsM-NB6kedFbufokk",
  authDomain: "litreel-com.firebaseapp.com",
  projectId: "litreel-com",
  storageBucket: "litreel-com.firebasestorage.app",
  messagingSenderId: "468910515132",
  appId: "1:468910515132:web:b4ceafebf41580f89e41b9",
  measurementId: "G-MWN6T1F3W0"
};

export const isConfigured = !String(firebaseConfig.apiKey).includes("TODO");
