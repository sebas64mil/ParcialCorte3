const { initializeApp } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANIYCtkrM7UcmFJK4AunyERlGKiHN8l1k",
  authDomain: "voltrush-c1ee8.firebaseapp.com",
  projectId: "voltrush-c1ee8",
  storageBucket: "voltrush-c1ee8.firebasestorage.app",
  messagingSenderId: "902027158636",
  appId: "1:902027158636:web:18bcf5560098dd6f6fa449"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export { db };