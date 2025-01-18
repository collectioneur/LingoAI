import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FastSearchResults from "./FastSearchResults";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("FastSearchResults Component", () => {
  const mockSetShowResults = jest.fn();
  const mockPush = jest.fn();
  const results = [
    {
      id: "1",
      url: "https://example.com/song1",
      image: "https://example.com/image1.jpg",
      title: "Song 1",
      artist_name: "Artist 1",
    },
    {
      id: "2",
      url: "https://example.com/song2",
      image: "https://example.com/image2.jpg",
      title: "Song 2",
      artist_name: "Artist 2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders loader when loading is true", () => {
    render(
      <FastSearchResults
        results={[]}
        loading={true}
        setShowResults={mockSetShowResults}
      />
    );


  });

  it("renders search results when loading is false", () => {
    render(
      <FastSearchResults
        results={results}
        loading={false}
        setShowResults={mockSetShowResults}
      />
    );

  });

  it("calls handleSongClick with the correct arguments when a result is clicked", () => {
    render(
      <FastSearchResults
        results={results}
        loading={false}

        setShowResults={mockSetShowResults}
      />
    );

    const firstResultButton = screen.getByText("Song 1").closest("button");

    fireEvent.click(firstResultButton!);


    expect(mockPush).toHaveBeenCalledWith("/song/1?url=https://example.com/song1");

    expect(mockSetShowResults).toHaveBeenCalledWith(false);
  });

  it("renders no results if results array is empty", () => {
    render(
      <FastSearchResults
        results={[]}

        loading={false}
        setShowResults={mockSetShowResults}
      />
    );


  });

  it("renders images correctly for each result", () => {
    render(
      <FastSearchResults
        results={results}
        loading={false}
        setShowResults={mockSetShowResults}
      />
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);

  });
});
