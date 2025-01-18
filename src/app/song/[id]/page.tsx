"use client";
import Hero from "@/app/components/Hero";
import SearchBar from "@/app/components/SearchBar";
import SongPage from "@/app/components/SongPage";
import React from "react";
import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export default function Song() {
  const [songInfo, setSongInfo] = React.useState<any>({});
  const [loading, setLoading] = React.useState<boolean>(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    if (searchParams.has("url")) {
      const songUrl = searchParams.get("url");
      const songId = pathname.split("/").pop();
      const getSongPage = async (songId: string, songUrl: string) => {
        setLoading(true);
        const response = await fetch(
          `/api/genius/songs/${songId}/?url=${songUrl}`
        );
        const song = await response.json();
        setSongInfo(song);
        setLoading(false);
      };
      if (songUrl && songId) getSongPage(songId, songUrl);
    }
  }, [searchParams]);
  return (
    <>
      <SearchBar />
      <SongPage song={songInfo} loading={loading} />
    </>
  );
}
