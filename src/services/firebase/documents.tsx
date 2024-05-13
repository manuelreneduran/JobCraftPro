// Import the functions you need from the SDKs you need
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from ".";
import { TCoverLetterDetail } from "../../utils/types";
import { coverLetterConverter } from "./converters";

const saveCoverLetterDoc = async (data: TCoverLetterDetail) =>
  await addDoc(collection(db, "documents"), data);

const deleteCoverLetter = async (docId: string) =>
  await deleteDoc(doc(db, "documents", docId));

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
  getCoverLetterQuery,
  getCoverLettersQuery,
  saveCoverLetterDoc,
};
