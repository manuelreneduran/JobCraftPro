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
import {
  TCoverLetterDetail,
  TGetCoverLetterQueryResponse,
} from "../../utils/types";
import { db } from ".";

const saveCoverLetterDoc = async (data: TCoverLetterDetail) =>
  await addDoc(collection(db, "documents"), data);

const deleteCoverLetter = async (docId: string) =>
  await deleteDoc(doc(db, "documents", docId));

const getCoverLetter = async (docId: string) => {
  const document = await getDoc(doc(db, "documents", docId));
  return {
    jobListingText: document?.data?.()?.jobListingText,
    text: document?.data?.()?.text,
    userUid: document?.data?.()?.userUid,
    id: document.id,
    createdAt: formatReadableDate(document?.data?.()?.createdAt?.toDate()),
    updatedAt: formatReadableDate(document?.data?.()?.updatedAt?.toDate()),
  } as TGetCoverLetterQueryResponse;
};

const getManyCoverLetters = async (q: Query) => {
  const docs = await getDocs(q);
  if (docs.empty) return [];
  return docs.docs.map((doc) => ({
    jobListingText: doc?.data?.()?.jobListingText,
    text: doc?.data?.()?.text,
    userUid: doc?.data?.()?.userUid,
    id: doc.id,
    createdAt: formatReadableDate(doc.data().createdAt?.toDate()),
    updatedAt: formatReadableDate(doc.data().updatedAt?.toDate()),
  })) as TGetCoverLetterQueryResponse[];
};
const getSnapshotCoverLettersByUser = async (userUid: string) => {
  const q = query(
    collection(db, "documents"),
    where("userUid", "==", userUid),
    orderBy("createdAt", "desc"),
    limit(6)
  );
  return await getManyCoverLetters(q);
};

const getCoverLettersByUser = async (userUid: string) => {
  const q = query(
    collection(db, "documents"),
    where("userUid", "==", userUid),
    orderBy("createdAt", "desc")
  );
  return await getManyCoverLetters(q);
};

export {
  saveCoverLetterDoc,
  deleteCoverLetter,
  getCoverLetter,
  getSnapshotCoverLettersByUser,
  getCoverLettersByUser,
};
