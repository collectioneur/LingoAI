import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TranslateSection from "./TranslateSection";

jest.mock("./TranslateBar", () => ({
  __esModule: true,
  default: ({ language, translate }: any) => (
    <div>
      <p>Language: {language}</p>
      <button onClick={() => translate("es")}>Translate</button>
    </div>
  ),
}));

jest.mock("./LyricsSection", () => ({
  __esModule: true,
  default: ({ lyrics, translatedLyrics, loading }: any) => (
    <div>
      <p>Original Lyrics: {lyrics}</p>
      {loading ? (
        <p>Loading translation...</p>
      ) : (
        <p>Translated Lyrics: {translatedLyrics}</p>
      )}
    </div>
  ),
}));

global.fetch = jest.fn();

describe("TranslateSection Component", () => {
  const mockLyrics = "This is a test lyric";
  const mockLanguage = "en";
  const mockSong = { title: "Test Song", artist: "Test Artist" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders TranslateBar and LyricsSection with correct props", () => {
    render(
      <TranslateSection
        lyrics={mockLyrics}
        language={mockLanguage}
        song={mockSong}
      />
    );

    expect(screen.getByText("Language: English")).toBeInTheDocument();
    expect(screen.getByText("Original Lyrics: This is a test lyric")).toBeInTheDocument();
  });

  it("displays loading state when translation is in progress", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok: true,
              json: () => Promise.resolve({ data: "Esto es una letra de prueba" }),
            }),
          500
        )
      )
    );

    render(
      <TranslateSection
        lyrics={mockLyrics}
        language={mockLanguage}
        song={mockSong}
      />
    );

    fireEvent.click(screen.getByText("Translate"));

    expect(screen.getByText("Loading translation...")).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByText("Translated Lyrics: Esto es una letra de prueba")
      ).toBeInTheDocument()
    );
  });

  it("handles translation errors gracefully", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(
      <TranslateSection
        lyrics={mockLyrics}
        language={mockLanguage}
        song={mockSong}
      />
    );

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    fireEvent.click(screen.getByText("Translate"));

    await waitFor(() =>
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error("Ошибка при запросе к серверу"))
    );

    consoleErrorSpy.mockRestore();
  });
});
