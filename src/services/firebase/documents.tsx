// Import the functions you need from the SDKs you need
import {
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
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
    return await deleteDoc(doc(db, "documents", docId));
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

const getManyDocumentByUser = async (q: Query) => {
  try {
    const docs = await getDocs(q);
    return docs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      createdAt: formatReadableDate(doc.data().createdAt?.toDate()),
      updatedAt: formatReadableDate(doc.data().updatedAt?.toDate()),
    })) as TCoverLetterDetail[];
  } catch (e: any) {
    throw e;
  }
};
const getSnapshotCoverLettersByUser = async (userUid: string) => {
  const q = query(
    collection(db, "documents"),
    where("userUid", "==", userUid),
    orderBy("createdAt", "desc"),
    limit(6)
  );
  return await getManyDocumentByUser(q);
};

const getCoverLettersByUser = async (userUid: string) => {
  const q = query(
    collection(db, "documents"),
    where("userUid", "==", userUid),
    orderBy("createdAt", "desc")
  );
  return await getManyDocumentByUser(q);
};

export {
  saveDocument,
  deleteDocument,
  getDocument,
  getManyDocumentByUser,
  getSnapshotCoverLettersByUser,
  getCoverLettersByUser,
};
