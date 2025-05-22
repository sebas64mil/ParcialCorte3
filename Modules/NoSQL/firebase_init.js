import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANIYCtkrM7UcmFJK4AunyERlGKiHN8l1k",
  authDomain: "voltrush-c1ee8.firebaseapp.com",
  projectId: "voltrush-c1ee8",
  storageBucket: "voltrush-c1ee8.appspot.com",
  messagingSenderId: "902027158636",
  appId: "1:902027158636:web:18bcf5560098dd6f6fa449"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };