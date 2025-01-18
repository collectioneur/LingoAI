import { collection, doc, deleteDoc } from "firebase/firestore";
import deleteTranslation from "./deleteTranslation";
import { db } from "../config";

jest.mock("firebase/firestore", () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  deleteDoc: jest.fn(),
}));

jest.mock("../config", () => ({
  db: {},
}));

describe("deleteTranslation", () => {
  it("should call deleteDoc with correct reference", async () => {
    const userId = "user123";
    const docId = "doc456";

    await deleteTranslation(userId, docId);

    expect(collection).toHaveBeenCalledWith(db, "users", userId, "Translations");
    expect(doc).toHaveBeenCalledWith(expect.any(Object), docId);
    expect(deleteDoc).toHaveBeenCalledWith(expect.any(Object));
  });

  it("should handle deleteDoc errors gracefully", async () => {
    jest.spyOn(console, "error").mockImplementation();

    (deleteDoc as jest.Mock).mockRejectedValue(new Error("Firebase error"));
    await expect(deleteTranslation("user123", "doc456")).rejects.toThrow(
      "Firebase error"
    );

    expect(console.error).toHaveBeenCalledWith(
      "Error deleting translation:",
      expect.any(Error)
    );
  });
});
