import Image from "next/image";

interface TransSongCardInfoProps {
  translation: {
    imageUrl: string;
    title: string;
    artist: string;
    originalLanguage: string;
    translationLanguage: string;
  };
}

export default function TransSongCardInfo({
  translation,
}: TransSongCardInfoProps) {
  return (
    <>
      <Image
        src={translation.imageUrl || "/placeholder-image.png"}
        alt={`${translation.title} cover`}
        width={128}
        height={128}
        className="rounded-[15px]"
      />
      <div className="w-full min-h-[128px] flex flex-col">
        <div className="">
          <div>
            <p className="text-base text-left">{translation.title}</p>
            <p className="text-sm opacity-50 text-left">{translation.artist}</p>
          </div>
        </div>
        <div className="flex justify-between items-center flex-grow flex-wrap gap-2">
          <h3 className="text-customlightblue">
            {translation.originalLanguage}
          </h3>
          <Image
            src={"/translation-arrows-icon.png"}
            alt="Translation arrows"
            width={30}
            height={30}
            layout="intrinsic"
          />
          <h3>{translation.translationLanguage}</h3>
        </div>
      </div>
    </>
  );
}
