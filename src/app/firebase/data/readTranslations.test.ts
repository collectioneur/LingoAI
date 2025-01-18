import { collection, getDocs } from "firebase/firestore";
import readTranslations from "./readTranslations";
import { db } from "../config";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

jest.mock("../config", () => ({
  db: {},
}));

describe("readTranslations", () => {
  it("should return translations data when available", async () => {
    const userId = "user123";

    const mockDocs = [
      {
        id: "doc1",
        data: () => ({
          title: "Title 1",
          artist: "Artist 1",
          imageUrl: "url1",
          originalLanguage: "en",
          translationLanguage: "pl",
          originalLyrics: "Lyrics 1",
          translatedLyrics: "Translated Lyrics 1",
        }),
      },
    ];

    (getDocs as jest.Mock).mockResolvedValue({ docs: mockDocs });

    const result = await readTranslations(userId);

    expect(result).toEqual([
      {
        id: "doc1",
        title: "Title 1",
        artist: "Artist 1",
        imageUrl: "url1",
        originalLanguage: "en",
        translationLanguage: "pl",
        originalLyrics: "Lyrics 1",
        translatedLyrics: "Translated Lyrics 1",
      },
    ]);
  });

  it("should log error if user is not authenticated", async () => {
    jest.spyOn(console, "error").mockImplementation();

    await readTranslations(null);

    expect(console.error).toHaveBeenCalledWith("User is not authenticated");
  });
});
