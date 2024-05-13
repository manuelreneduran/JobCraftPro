// Import the functions you need from the SDKs you need
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";
import { formatReadableDate } from "../../utils/date";
import {
  TCoverLetterDetail,
  TGetCoverLetterQueryResponse,
} from "../../utils/types";
import { coverLetterConverter } from "./converters";

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

const getCoverLetterQuery = (id?: string) =>
  doc(db, "documents", id).withConverter(coverLetterConverter);

const getCoverLettersQuery = (uid?: string) =>
  query(
    collection(db, "documents"),
    where("userUid", "==", uid || ""),
    orderBy("createdAt", "desc")
  ).withConverter(coverLetterConverter);

export {
  deleteCoverLetter,
  getCoverLetter,
  getCoverLettersQuery,
  saveCoverLetterDoc,
  getCoverLetterQuery,
};
