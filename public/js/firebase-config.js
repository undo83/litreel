// === FIREBASE CONFIG (LitReel) ===
// Fill from Firebase Console → Project settings → Web app (</>).
// The web config is PUBLIC by design; security comes from Firestore Rules + authorized domains.
// While values contain "TODO", the site runs on static fallback data.
export const firebaseConfig = {
  apiKey: "TODO",
  authDomain: "litreel.firebaseapp.com",
  projectId: "litreel",
  storageBucket: "litreel.appspot.com",
  messagingSenderId: "TODO",
  appId: "TODO"
};

export const isConfigured = !String(firebaseConfig.apiKey).includes("TODO");
