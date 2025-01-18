import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchBar Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders the input field and search button", () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText("Search song title or lyrics")).toBeInTheDocument();
    expect(screen.getByAltText("search icon")).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search song title or lyrics") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Test Song" } });
    expect(input.value).toBe("Test Song");
  });

  it("calls router.push with correct query when search button is clicked", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search song title or lyrics");
    const button = screen.getByAltText("search icon");

    fireEvent.change(input, { target: { value: "Test Song" } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/search?q=Test Song");
  });

  it("renders FastSearchResults component when results are available", async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search song title or lyrics");

    fireEvent.change(input, { target: { value: "Test Song" } });

    await waitFor(() => {
      expect(screen.getByTestId("fast-search-results")).toBeInTheDocument();
    });
  });

  it("clears results and stops loading when input is empty", async () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("Search song title or lyrics");

    fireEvent.change(input, { target: { value: "Test Song" } });
    fireEvent.change(input, { target: { value: "" } });

    await waitFor(() => {
      expect(screen.queryByTestId("fast-search-results")).not.toBeInTheDocument();
    });
  });
});
