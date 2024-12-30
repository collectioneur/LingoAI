import React from "react";
import Image from "next/image";
import Loader from "./Loader";
import { songPageContext } from "./Search";

const FastSearchResults: React.FC<any> = ({
  results,
  loading,
  setShowResults,
}) => {
  const getSongPage = React.useContext(songPageContext);
  const handleSongClick = (id: string, url: string) => {
    setShowResults(false);
    getSongPage(id, url);
  };

  return (
    <div
      className="absolute w-full top-0 bg-background border border-foreground rounded-[18px] z-[-1] pt-[37px] divide-y-[1px]
    divide-foreground overflow-hidden search-shadow"
    >
      {loading ? (
        <div className="p-2 flex justify-start items-center gap-[20px]">
          <Loader height="25px" width="25px" />
        </div>
      ) : (
        results.map((result: any) => (
          <button
            onClick={() => {
              handleSongClick(result.id, result.url);
            }}
            key={result.id}
            className="p-2 flex justify-start items-center gap-[20px] hover:bg-transparentforeground hover:bg-opacity-25 transition-all w-full cursor-pointer"
          >
            <Image
              src={result.image}
              alt={result.title}
              width={50}
              height={50}
              className="rounded-lg"
            />
            <div>
              <p className="text-left">{result.title}</p>
              <p className="text-xs text-left opacity-50">
                {result.artist_name}
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
};

export default FastSearchResults;
