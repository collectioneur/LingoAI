import React, { useState, useEffect, useCallback, memo } from "react";
import Image from "next/image";
import TranslationArrows from "../../../public/translation-arrows-icon.png";
import MagicIcon from "../../../public/magic-icon.png";
import CopyIcon from "../../../public/copy-icon.png";
import ArrowIcon from "../../../public/arrow-icon.png";
import SaveIcon from "../../../public/save-icon.svg";
import addTranslation from "../firebase/data/saveTranslation";
import { useAuth } from "@/app/context/authContext";

const languages = [
  "Belarusian",
  "Chinese",
  "English",
  "French",
  "German",
  "Italian",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Turkish",
  "Ukrainian",
];

interface TranslateBarProps {
  language: string;
  translate: (language: string) => void;
  lyrics: string;
  song: any;
}

const TranslateBar: React.FC<TranslateBarProps> = memo(
  ({ language, translate, lyrics, song }) => {
    const [copyButtonText, setCopyButtonText] = useState<string>("Copy");
    const [selectedLanguage, setSelectedLanguage] =
      useState<string>("Belarusian");
    const [isDisabled, setIsDisabled] = useState(false);
    const [saveIsDisabled, setSaveIsDisabled] = useState(false);
    const userId = useAuth().userId;

    useEffect(() => {
      setIsDisabled(false);
      setCopyButtonText("Copy");
      setSaveIsDisabled(false);
    }, [lyrics]);

    const clickOnCopy = useCallback(() => {
      setIsDisabled(true);
      setCopyButtonText("Copied");
      navigator.clipboard.writeText(lyrics);
    }, [lyrics]);

    const clickOnSave = useCallback(async () => {
      if (!saveIsDisabled) {
        setSaveIsDisabled(true);
        await addTranslation(userId, {
          title: song.title,
          artist: song.artist_name,
          imageUrl: song.image,
          originalLanguage: language,
          translationLanguage: selectedLanguage,
          originalLyrics: song.lyrics,
          translatedLyrics: lyrics,
        });
      }
    }, [userId, saveIsDisabled, song, language, selectedLanguage, lyrics]);

    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
      },
      []
    );

    return (
      <div className="flex justify-between items-center z-[100]">
        <p className="bg-transparent rounded-full p-2 inline shadow-inner shadow-foreground opacity-75 text-xs md:text-s lg:text-base">
          {language}
        </p>
        <div className="mx-5">
          <Image
            src={TranslationArrows}
            alt="Translation arrows"
            width={40}
            layout="intrinsic"
          />
        </div>
        <div className="flex justify-end gap-2 flex-wrap">
          <div className="relative hover:opacity-[0.7]">
            <select
              className="bg-transparent text-xs md:text-s lg:text-base rounded-full p-2 pr-4 outline-none button shadow-inner shadow-foreground cursor-pointer appearance-none"
              value={selectedLanguage}
              onChange={handleChange}
            >
              {languages.map((language, i) => (
                <option key={i} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <Image
              src={ArrowIcon}
              alt=""
              width={15}
              className="absolute right-2 top-0 bottom-0 m-auto cursor-pointer"
            />
          </div>
          <button
            className="flex items-center gap-1 rounded-full shadow-inner button shadow-foreground p-2"
            onClick={() => translate(selectedLanguage)}
          >
            <p className="text-xs md:text-s lg:text-base">Translate</p>
            <Image src={MagicIcon} alt="Magic icon" width={30} height={30} />
          </button>
          <button
            className={
              `flex items-center gap-1 rounded-full shadow-inner shadow-foreground p-2` +
              (isDisabled ? " opacity-50 !cursor-default" : " button")
            }
            onClick={clickOnCopy}
            disabled={isDisabled}
          >
            <p className="text-xs md:text-s lg:text-base">{copyButtonText}</p>
            <Image src={CopyIcon} alt="Copy icon" width={15} height={20} />
          </button>
          <button
            className={
              `flex items-center gap-1 rounded-full shadow-inner shadow-foreground p-2` +
              (saveIsDisabled ? " opacity-50 !cursor-default" : " button")
            }
            onClick={clickOnSave}
            disabled={saveIsDisabled}
          >
            <p className="text-xs md:text-s lg:text-base">
              {saveIsDisabled ? "Saved" : "Save"}
            </p>
            <Image src={SaveIcon} alt="Save icon" width={15} height={20} />
          </button>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.language === nextProps.language &&
      prevProps.lyrics === nextProps.lyrics &&
      prevProps.song === nextProps.song
    );
  }
);

export default TranslateBar;
