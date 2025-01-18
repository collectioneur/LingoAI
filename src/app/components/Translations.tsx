"use client";
import Image from "next/image";
import { useAuth } from "@/app/context/authContext";
import readTranslations from "../firebase/data/readTranslations";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TransSongCardInfo from "./TransSongCardInfo";
import DeleteButton from "./DeleteButton";

export default function Translations() {
  const router = useRouter();
  const userId = useAuth().userId;
  const [translations, setTranslations] = useState<any[]>([]);

  useEffect(() => {
    const getTranslations = async () => {
      if (userId) {
        try {
          const fetchedTranslations = await readTranslations(userId);
          if (fetchedTranslations) {
            setTranslations(fetchedTranslations);
          }
        } catch (error) {
          console.error("Error fetching translations:", error);
        }
      }
    };

    getTranslations();
  }, [userId]);

  const handleTranslationClick = (id: string) => {
    router.push(`/translations/${id}`);
  };

  return (
    <div className="grid p-5 pt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1536px] mx-auto gap-5">
      {translations
        ? translations.map((translation) => (
            <div className="relative w-full h-full" key={translation.id}>
              <button
                onClick={() => {
                  handleTranslationClick(translation.id);
                }}
                className="p-5 shadow-inner w-full bg-black/25 shadow-foreground rounded-[15px] z-[100] flex gap-2 items-start hover:bg-transparentforeground hover:bg-opacity-25"
              >
                <TransSongCardInfo translation={translation} />
              </button>
              <DeleteButton docId={translation.id} />
            </div>
          ))
        : null}
    </div>
  );
}
