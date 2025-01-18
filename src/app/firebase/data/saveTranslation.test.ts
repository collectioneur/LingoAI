import { collection, addDoc } from "firebase/firestore";
import addTranslation from "./saveTranslation";
import { db } from "../config";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock("../config", () => ({
  db: {},
}));

describe("addTranslation", () => {
  it("should add translation when user is authenticated", async () => {
    const userId = "user123";
    const data = {
      title: "Test Title",
      artist: "Test Artist",
      imageUrl: "url",
      originalLanguage: "en",
      translationLanguage: "pl",
      originalLyrics: "Original lyrics",
      translatedLyrics: "Translated lyrics",
    };

    await addTranslation(userId, data);

    expect(collection).toHaveBeenCalledWith(
      expect.any(Object),
      "Translations"
    );
    expect(addDoc).toHaveBeenCalledWith(expect.any(Object), data);
  });

  it("should log error if user is not authenticated", async () => {
    jest.spyOn(console, "error").mockImplementation();

    await addTranslation(null, {} as any);

    expect(console.error).toHaveBeenCalledWith("User is not authenticated");
  });
});
