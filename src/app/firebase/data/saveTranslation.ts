import { useState } from "react";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../config";

interface TranslationData {
  title: string;
  artist: string;
  imageUrl: string;
  originalLanguage: string;
  translationLanguage: string;
  originalLyrics: string;
  translatedLyrics: string;
}

const addTranslation = async (
  userId: string | null,
  data: TranslationData
): Promise<void> => {
  if (!userId) {
    console.error("User is not authenticated");
    return;
  }
  try {
    const translationsRef = collection(
      doc(db, "users", userId),
      "Translations"
    );

    const docRef = await addDoc(translationsRef, data);
  } catch (error) {
    console.error("Error adding translation: ", error);
    throw error;
  }
};

export default addTranslation;
