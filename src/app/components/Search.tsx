"use client";
import React from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { createContext } from "react";
import SongPage from "./SongPage";

export const songPageContext = createContext<
  (songId: string, sognUrl: string) => void
>(() => {});

const Search: React.FC = () => {
  const [fullResults, setFullResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [songPage, setSongPage] = React.useState<boolean>(false);
  const [songInfo, setSongInfo] = React.useState<any>({});

  const getSongPage = async (songId: string, songUrl: string) => {
    setSongPage(true);
    setLoading(true);
    setFullResults([]);
    const response = await fetch(
      `/api/genius/fetchSong?id=${songId}&url=${songUrl}`
    );
    const song = await response.json();
    setSongInfo(song);
    setLoading(false);
  };

  const fetchFullList = async (query: string) => {
    setFullResults([]);
    if (!query.trim()) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(
        `/api/genius/fullSearch?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Ошибка при запросе к серверу");
      }
      const data = await response.json();
      console.log(data);
      setFullResults(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-20">
      <songPageContext.Provider value={getSongPage}>
        <SearchBar fetchFullList={fetchFullList} setSongPage={setSongPage} />
        {songPage ? (
          <SongPage song={songInfo} loading={loading} />
        ) : (
          <SearchResults results={fullResults} loading={loading} />
        )}
      </songPageContext.Provider>
    </div>
  );
};

export default Search;
