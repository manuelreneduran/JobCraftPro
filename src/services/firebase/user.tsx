import { updateDoc, doc } from "firebase/firestore";
import { db } from ".";

const decrementGenerationsRemaining = async (uid: string, counter: number) => {
  const userRef = doc(db, "users", uid);
  return await updateDoc(userRef, {
    generationsRemaining: counter,
  });
};

const getUserProfileQuery = (uid: string) => doc(db, "users", uid);

export { decrementGenerationsRemaining, getUserProfileQuery };
