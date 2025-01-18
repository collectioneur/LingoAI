"use client";
import readSpecTranslation from "@/app/firebase/data/readSpecTranslation";
import { useAuth } from "@/app/context/authContext";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import LyricsSection from "@/app/components/LyricsSection";
import Loader from "@/app/components/Loader";
import TransSongCardInfo from "@/app/components/TransSongCardInfo";
import Image from "next/image";
import DeleteButton from "@/app/components/DeleteButton";

export default function TranslationPage() {
  const router = useRouter();
  const userId = useAuth().userId;
  const [doc, setDoc] = useState<any>({});
  const pathname = usePathname();
  const docId = pathname.split("/").pop();

  useEffect(() => {
    const getDoc = async () => {
      if (userId) {
        try {
          const fetchedDoc = await readSpecTranslation(userId, docId);
          if (fetchedDoc) {
            setDoc(fetchedDoc);
          }
        } catch (error) {
          console.error("Error fetching translations:", error);
        }
      }
    };

    getDoc();
  }, [userId]);

  return (
    <div className="flex h-[100%] justify-center items-center translate-y-40 flex-col mx-5 text-center max-w-[1536px] gap-5">
      <div className="p-5 relative h-fit shadow-inner bg-black/25 shadow-foreground rounded-[15px] z-[100] flex gap-2">
        <TransSongCardInfo translation={doc} />
        <DeleteButton docId={docId} />
      </div>
      <LyricsSection
        lyrics={doc.originalLyrics}
        translatedLyrics={doc.translatedLyrics}
        loading={false}
      />
    </div>
  );
}
