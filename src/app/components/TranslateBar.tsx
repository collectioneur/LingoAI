import React from "react";
import Image from "next/image";
import TranslationArrows from "../../../public/Translation_arrows.png";
import MagicIcon from "../../../public/Magic_icon.png";
import CopyIcon from "../../../public/Copy_icon.png";
import ArrowIcon from "../../../public/Arrow_icon.png";
import { useState, useEffect } from "react";

interface TranslateBarProps {
  language: string;
  translate: (language: string) => void;
  lyrics: string;
}

const languages = [
  "Arabic",
  "Belarusian",
  "Chinese",
  "English",
  "French",
  "German",
  "Hindi",
  "Italian",
  "Japanese",
  "Korean",
  "Polish",
  "Portuguese",
  "Russian",
  "Spanish",
  "Turkish",
  "Ukrainian",
];

const TranslateBar: React.FC<TranslateBarProps> = ({
  language,
  translate,
  lyrics,
}) => {
  const [copyButtonText, setCopyButtonText] = useState<string>("Copy");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    setIsDisabled(false);
    setCopyButtonText("Copy");
  }, [lyrics]);

  const clickOnCopy = () => {
    setIsDisabled(true);
    setCopyButtonText("Copied");
    navigator.clipboard.writeText(lyrics);
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
  };
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
          onClick={() => {
            translate(selectedLanguage);
          }}
        >
          <p className="text-xs md:text-s lg:text-base">Translate</p>
          <Image src={MagicIcon} alt="Magic icon" width={30} height={30} />
        </button>
        <button
          className={
            "flex items-center gap-1 rounded-full shadow-inner shadow-foreground p-2" +
            (isDisabled ? " opacity-50 !cursor-default" : " button")
          }
          onClick={clickOnCopy}
          disabled={isDisabled}
        >
          <p className="text-xs md:text-s lg:text-base">{copyButtonText}</p>
          <Image src={CopyIcon} alt="Magic icon" width={15} height={20} />
        </button>
      </div>
    </div>
  );
};

export default TranslateBar;
