import { collection, setDoc, doc, addDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../config";

const createUserDocument = async (user: User): Promise<void> => {
  if (!user) {
    console.error("No user provided!");
    return;
  }
  const userDocRef = doc(db, "users", user.uid);

  const userData = {
    mail: user.email || "No email",
    createdAt: new Date(),
  };

  try {
    const res = await setDoc(userDocRef, userData, { merge: true });
  } catch (error) {
    console.error("Error creating user document:", error);
  }
};

export default createUserDocument;
