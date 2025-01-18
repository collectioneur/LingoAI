import { collection, doc, getDoc } from "firebase/firestore";
import readSpecTranslation from "./readSpecTranslation";
import { db } from "../config";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock("../config", () => ({
  db: {},
}));

describe("readSpecTranslation", () => {
  it("should fetch and return translation data when document exists", async () => {
    const userId = "user123";
    const docId = "doc456";

    const mockDocData = {
      title: "Title",
      artist: "Artist",
      imageUrl: "http://example.com",
      originalLanguage: "en",
      translationLanguage: "pl",
      originalLyrics: "Original lyrics",
      translatedLyrics: "Translated lyrics",
    };

    (getDoc as jest.Mock).mockResolvedValue({
      exists: () => true,
      id: docId,
      data: () => mockDocData,
    });

    const result = await readSpecTranslation(userId, docId);

    expect(result).toEqual({ id: docId, ...mockDocData });
  });

  it("should log error if user is not authenticated", async () => {
    jest.spyOn(console, "error").mockImplementation();

    await readSpecTranslation(null, "doc456");

    expect(console.error).toHaveBeenCalledWith("User is not authenticated");
  });

  it("should handle errors gracefully", async () => {
    jest.spyOn(console, "error").mockImplementation();
    (getDoc as jest.Mock).mockRejectedValue(new Error("Firebase error"));

    await readSpecTranslation("user123", "doc456");

    expect(console.error).toHaveBeenCalledWith(
      "Error fetching translations:",
      expect.any(Error)
    );
  });
});
