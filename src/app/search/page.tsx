"use client";
import Hero from "../components/Hero";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/SearchBar";

export default function SearchPage() {
  const [fullResults, setFullResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has("q")) {
      const query = searchParams.get("q");
      const fetchFullList = async (query: string) => {
        setFullResults([]);
        if (!query.trim()) {
          setLoading(false);
          return;
        }
        try {
          setLoading(true);
          const response = await fetch(
            `/api/genius/songs/search/full?q=${encodeURIComponent(query)}`
          );
          if (!response.ok) {
            throw new Error("Error fetching full search results");
          }
          const data = await response.json();
          setFullResults(data);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };
      if (query) fetchFullList(query);
    }
  }, [searchParams]);

  return (
    <>
      <SearchBar />
      <SearchResults results={fullResults} loading={loading} />
    </>
  );
}
