import React from "react";
import Image from "next/image";
import Loader from "./Loader";
import { songPageContext } from "./Search";

interface SearchResultsProps {
  results: any[];
  loading: boolean;
}

export default function SearchResults({
  results,
  loading,
}: SearchResultsProps) {
  const getSongPage = React.useContext(songPageContext);
  return (
    <>
      {loading ? (
        <div className="w-fit mx-auto mt-20">
          <Loader height="25px" width="25px" />
        </div>
      ) : (
        <div className="grid p-5 pt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1536px] mx-auto gap-5">
          {results.map((result) => (
            <button
              onClick={() => {
                getSongPage(result.id, result.url);
              }}
              key={result.id}
              className="p-5 shadow-inner bg-black/25 shadow-foreground rounded-[15px] z-[100] flex gap-2 items-start hover:bg-transparentforeground hover:bg-opacity-25"
            >
              <Image
                src={result.image}
                alt=""
                width={128}
                height={128}
                className=" rounded-[15px]"
              />
              <div className="w-full">
                <p className="text-base text-left">{result.title}</p>
                <p className="text-sm opacity-50 text-left">
                  {result.artist_name}
                </p>
                <div className="flex justify-between">
                  <div>
                    <p className="text-xs opacity-50 mt-2 mb-2">artists</p>
                    {result.artists_images.map((image: any, i: number) => (
                      <Image
                        src={image}
                        alt=""
                        width={20}
                        height={20}
                        className="rounded-full"
                        key={i}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs opacity-50 mt-2 mb-2 text-right">
                      release date
                    </p>
                    <p className="text-xs">{result.date}</p>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}
