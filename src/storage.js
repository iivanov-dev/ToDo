import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  collection,
  setDoc,
  getDocs,
  updateDoc,
  writeBatch,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaq3rO7vb5Y7donfabHyBs8Ao2W4pPG70",
  authDomain: "todo-3b7fe.firebaseapp.com",
  projectId: "todo-3b7fe",
  storageBucket: "todo-3b7fe.firebasestorage.app",
  messagingSenderId: "227457067592",
  appId: "1:227457067592:web:cefd2d0f343d0d3a48867d",
};

export function createStorage(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    key,
    db,
    pull: async function () {
      const ref = collection(this.db, this.key);
      const q = query(ref, orderBy("createdAt")); // "desc"
      const querySnapshot = await getDocs(q);
      const todos = [];

      querySnapshot.forEach((doc) => {
        todos.push({
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done
        });
      });

      return todos;
    },
    push: async function (todo) {
      try {
        await setDoc(doc(this.db, this.key, todo.id), {
          title: todo.title,
          done: todo.done,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    delete: async function ({todosIds}) {
      const batch = writeBatch(this.db);

      todosIds.forEach((id) => {
        const ref = doc(this.db, this.key, id);
        batch.delete(ref);
      });

      await batch.commit();
    },
    update: async function (todo) {
        const ref = doc(this.db, this.key, todo.id);

        await updateDoc(ref, {
            done: todo.done
        });
    }
  };
}
