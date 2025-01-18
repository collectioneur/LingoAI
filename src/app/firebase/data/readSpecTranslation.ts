import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../config";

interface TranslationData {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  originalLanguage: string;
  translationLanguage: string;
  originalLyrics: string;
  translatedLyrics: string;
}

const readSpecTranslation = async (
  userId: string | null,
  docId: string | undefined
): Promise<TranslationData | void> => {
  if (!userId) {
    console.error("User is not authenticated");
    return;
  }

  try {
    const translationsRef = collection(
      doc(db, "users", userId),
      "Translations"
    );

    const docRef = doc(translationsRef, docId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.error("No such document!");
      return;
    } else {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title,
        artist: data.artist,
        imageUrl: data.imageUrl,
        originalLanguage: data.originalLanguage,
        translationLanguage: data.translationLanguage,
        originalLyrics: data.originalLyrics,
        translatedLyrics: data.translatedLyrics,
      } as TranslationData;
    }
  } catch (error) {
    console.error("Error fetching translations:", error);
  }
};

export default readSpecTranslation;
