import React from "react";
import ISO6391 from "iso-639-1";
import TranslateBar from "./TranslateBar";
import LyricsSection from "./LyricsSection";
import { useState } from "react";

interface TranslateSectionProps {
  lyrics: string;
  language: string;
  song: any;
}

const TranslateSection: React.FC<TranslateSectionProps> = ({
  language,
  lyrics,
  song,
}) => {
  const languageName = ISO6391.getName(language);
  const [translatedLyrics, setTranslatedLyrics] = useState<string>("");
  const [translationLoading, setTranslationLoading] = useState<boolean>(false);

  const translate = async (language: string) => {
    try {
      setTranslationLoading(true);
      const response = await fetch(`/api/openai/translation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: language,
          lyrics: lyrics,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка при запросе к серверу");
      }
      const data = await response.json();
      setTranslationLoading(false);
      setTranslatedLyrics(data.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="min-w-[332px] w-[80vw] max-w-[1280px] mt-10 mx-auto z-[100]">
      <TranslateBar
        language={languageName}
        translate={translate}
        lyrics={translatedLyrics}
        song={song}
      />
      <LyricsSection
        lyrics={lyrics}
        translatedLyrics={translatedLyrics}
        loading={translationLoading}
      />
    </div>
  );
};

export default TranslateSection;
