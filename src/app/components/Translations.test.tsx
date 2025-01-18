import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Translations from "./Translations";
import { useAuth } from "@/app/context/authContext";
import readTranslations from "../firebase/data/readTranslations";
import { useRouter } from "next/navigation";

jest.mock("../firebase/data/readTranslations", () => jest.fn());
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("./TransSongCardInfo", () => ({
  __esModule: true,
  default: ({ translation }: any) => <div>{translation.title}</div>,
}));
jest.mock("./DeleteButton", () => ({
  __esModule: true,
  default: ({ docId }: any) => <button>Delete {docId}</button>,
}));

jest.mock("@/app/context/authContext", () => ({
  useAuth: jest.fn(),
}));

describe("Translations Component", () => {
  const mockRouterPush = jest.fn();
  const mockTranslations = [
    { id: "1", title: "Translation 1" },
    { id: "2", title: "Translation 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ userId: "testUserId" });
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("renders translations correctly when data is available", async () => {
    (readTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    render(<Translations />);

    await waitFor(() => {
      expect(screen.getByText("Translation 1")).toBeInTheDocument();
      expect(screen.getByText("Translation 2")).toBeInTheDocument();
    });
  });

  it("handles click on translation and navigates to the correct route", async () => {
    (readTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    render(<Translations />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Translation 1"));
    });

    expect(mockRouterPush).toHaveBeenCalledWith("/translations/1");
  });

  it("renders DeleteButton for each translation", async () => {
    (readTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    render(<Translations />);

    await waitFor(() => {
      expect(screen.getByText("Delete 1")).toBeInTheDocument();
      expect(screen.getByText("Delete 2")).toBeInTheDocument();
    });
  });

  it("does not render translations if userId is not available", async () => {
    (useAuth as jest.Mock).mockReturnValue({ userId: null });
    (readTranslations as jest.Mock).mockResolvedValue(mockTranslations);

    render(<Translations />);

    await waitFor(() => {
      expect(screen.queryByText("Translation 1")).not.toBeInTheDocument();
      expect(screen.queryByText("Translation 2")).not.toBeInTheDocument();
    });
  });

  it("logs error if fetching translations fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (readTranslations as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    render(<Translations />);

    await waitFor(() =>
      expect(consoleErrorSpy).toHaveBeenCalledWith("Error fetching translations:", expect.any(Error))
    );

    consoleErrorSpy.mockRestore();
  });
});
