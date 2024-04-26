// Import the functions you need from the SDKs you need
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { formatReadableDate } from "../../utils/date";
import { TCoverLetterDetail } from "../../utils/types";
import { db } from ".";

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

export { saveDocument, deleteDocument, getDocument, getManyDocumentByUser };
