// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { TCoverLetterDetail } from "../utils/types";
import { formatReadableDate } from "../utils/date";
import { format } from "date-fns";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = import.meta.env
  .VITE_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID;
const FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

/* AUTH */

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err: any) {
    throw err;
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: any) {
    throw err;
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    throw err;
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: any) {
    throw err;
  }
};

const logout = () => {
  signOut(auth);
};

/* DOCUMENTS */

const saveDocument = async (userUid: string, data: any) => {
  try {
    return await addDoc(collection(db, "documents"), {
      userUid,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    });
  } catch (err: any) {
    throw err;
  }
};

const deleteDocument = async (docId: string) => {
  try {
    await deleteDoc(doc(db, "documents", docId));
  } catch (err: any) {
    throw err;
  }
};

const getDocument = async (docId: string) => {
  try {
    const document = await getDoc(doc(db, "documents", docId));
    return {
      ...document.data(),
      id: document.id,
      createdAt: formatReadableDate(document?.data?.()?.createdAt?.toDate()),
      updatedAt: formatReadableDate(document?.data?.()?.updatedAt?.toDate()),
    } as TCoverLetterDetail;
  } catch (e: any) {
    throw e;
  }
};

const getManyDocumentByUser = async (userUid: string) => {
  const q = query(collection(db, "documents"), where("userUid", "==", userUid));
  const docs = await getDocs(q);
  return docs.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
    createdAt: formatReadableDate(doc.data().createdAt?.toDate()),
    updatedAt: formatReadableDate(doc.data().updatedAt?.toDate()),
  })) as TCoverLetterDetail[];
};

export {
  auth,
  logout,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  signInWithGoogle,
  saveDocument,
  deleteDocument,
  getDocument,
  getManyDocumentByUser,
};
