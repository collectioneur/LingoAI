import { db } from "../config";
import { collection, doc, deleteDoc } from "firebase/firestore";

const deleteTranslation = async (userId: string, docId: string) => {
  try {
    const translationsRef = collection(db, "users", userId, "Translations");
    const docRef = doc(translationsRef, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting translation:", error);
    return Promise.reject(error);
  }
};

export default deleteTranslation;
