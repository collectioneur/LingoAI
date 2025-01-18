import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../config"; // Убедитесь, что путь правильный

interface TranslationData {
  title: string;
  artist: string;
  imageUrl: string;
  originalLanguage: string;
  translationLanguage: string;
  originalLyrics: string;
  translatedLyrics: string;
}

const readTranslations = async (
  userId: string | null
): Promise<TranslationData[] | void> => {
  if (!userId) {
    console.error("User is not authenticated");
    return;
  }

  try {
    const translationsRef = collection(
      doc(db, "users", userId),
      "Translations"
    );
    const querySnapshot = await getDocs(translationsRef);

    const translations: TranslationData[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        artist: data.artist,
        imageUrl: data.imageUrl,
        originalLanguage: data.originalLanguage,
        translationLanguage: data.translationLanguage,
        originalLyrics: data.originalLyrics,
        translatedLyrics: data.translatedLyrics,
      } as TranslationData;
    });
    return translations;
  } catch (error) {
    console.error("Error fetching translations:", error);
  }
};

export default readTranslations;
