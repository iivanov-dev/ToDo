import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaq3rO7vb5Y7donfabHyBs8Ao2W4pPG70",
  authDomain: "todo-3b7fe.firebaseapp.com",
  projectId: "todo-3b7fe",
  storageBucket: "todo-3b7fe.firebasestorage.app",
  messagingSenderId: "227457067592",
  appId: "1:227457067592:web:cefd2d0f343d0d3a48867d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function add() {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: "Task 3",
      status: "unactive",
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function get() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().title}`);
  });
}

// add();
// console.log(app);
// get();