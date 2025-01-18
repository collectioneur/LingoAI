import { setDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";
import createUserDocument from "./createUserDocument";
import { db } from "../config";

jest.mock("firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
}));

jest.mock("../config", () => ({
  db: {},
}));

describe("createUserDocument", () => {
  it("should call setDoc with correct arguments when user is provided", async () => {
    const user: User = {
      uid: "123",
      email: "test@example.com",
    } as User;

    await createUserDocument(user);

    expect(doc).toHaveBeenCalledWith(db, "users", "123");
    expect(setDoc).toHaveBeenCalledWith(
      expect.any(Object),
      {
        mail: "test@example.com",
        createdAt: expect.any(Date),
      },
      { merge: true }
    );
  });

  it("should log error if no user is provided", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    await createUserDocument(null as any);

    expect(consoleSpy).toHaveBeenCalledWith("No user provided!");
    consoleSpy.mockRestore();
  });

  it("should handle setDoc errors gracefully", async () => {
    const user: User = { uid: "123", email: "test@example.com" } as User;
    jest.spyOn(console, "error").mockImplementation();

    (setDoc as jest.Mock).mockRejectedValue(new Error("Firebase error"));
    await createUserDocument(user);

    expect(console.error).toHaveBeenCalledWith(
      "Error creating user document:",
      expect.any(Error)
    );
  });
});
