import {
  FirestoreDataConverter,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentReference,
} from "firebase/firestore";
import { TGetCoverLetterQueryResponse } from "../../utils/types";
import { formatReadableDate } from "../../utils/date";

type CoverLetter = {
  ref: DocumentReference<DocumentData>;
} & TGetCoverLetterQueryResponse;

export const coverLetterConverter: FirestoreDataConverter<CoverLetter> = {
  toFirestore(coverLetter: WithFieldValue<CoverLetter>): DocumentData {
    return {
      text: coverLetter.text,
      jobListingText: coverLetter.jobListingText,
      length: coverLetter.length,
      paragraphs: coverLetter.paragraphs,
      userUid: coverLetter.userUid,
      createdAt: coverLetter.createdAt,
      updatedAt: coverLetter.updatedAt,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): CoverLetter {
    const data = snapshot.data(options);
    return {
      ref: snapshot.ref,
      text: data.text,
      jobListingText: data.jobListingText,
      length: data.length,
      paragraphs: data.paragraphs,
      userUid: data.userUid,
      id: snapshot.id,
      createdAt: formatReadableDate(data.createdAt?.toDate()),
      updatedAt: formatReadableDate(data.updatedAt?.toDate()),
    };
  },
};
