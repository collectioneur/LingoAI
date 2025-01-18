"use client";
import React, { useEffect } from "react";
import searchIcon from "../../../public/search-icon.png";
import Image from "next/image";
import FastSearchResults from "./FastSearchResults";
import { useRouter } from "next/navigation";

let debounceTimeout: NodeJS.Timeout;

const SearchBar = () => {
  const [lyricsToSearch, setLyricsToSearch] = React.useState<string>("");
  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showResults, setShowResults] = React.useState<boolean>(true);
  const router = useRouter();
  const handleSearch = (value: string): void => {
    setLyricsToSearch(value);
  };

  const fetchSongs = async () => {
    setResults([]);
    if (!lyricsToSearch.trim()) {
      setLoading(false);

      return;
    }
    try {
      const response = await fetch(
        `/api/genius/songs/search/quick?q=${encodeURIComponent(lyricsToSearch)}`
      );
      if (!response.ok) {
        throw new Error("Ошибка при запросе к серверу");
      }
      const data = await response.json();
      setResults(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setShowResults(true);
    if (lyricsToSearch.trim() === "") {
      setResults([]);
      setLoading(false);
      return;
    }

    clearTimeout(debounceTimeout);
    setLoading(true);
    debounceTimeout = setTimeout(() => {
      fetchSongs();
    }, 1000);

    return () => clearTimeout(debounceTimeout);
  }, [lyricsToSearch]);

  return (
    <div className="relative w-fit mx-auto z-[150] sticky  top-32 lg:top-[17px] rounded-[17px]">
      <input
        className="min-w-[332px] w-[50vw] max-w-[760px] text-base pl-2 pr-10 p-1 bg-background border border-foreground
       rounded-full placeholder:text-foreground placeholder:opacity-50 text-xl outline-none shadow-3xl lg:shadow-none"
        placeholder="Search song title or lyrics"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        value={lyricsToSearch}
      ></input>
      <button
        className="border h-full aspect-square absolute top-[0] right-[0] flex justify-center 
      items-center rounded-full border-foreground button"
        onClick={() => {
          router.push(`/search?q=${lyricsToSearch}`);
          setShowResults(false);
        }}
      >
        <Image width={20} src={searchIcon} alt="search icon" />
      </button>
      {(results.length > 0 || loading == true) && showResults && (
        <FastSearchResults
          results={results}
          loading={loading}
          setShowResults={setShowResults}
        />
      )}
    </div>
  );
};

export default SearchBar;
