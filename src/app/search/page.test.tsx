import { render, screen, waitFor } from "@testing-library/react";
import SearchPage from "./page";
import { useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("../components/SearchBar", () => {
  return jest.fn(() => <div data-testid="search-bar">SearchBar Component</div>);
});

jest.mock("../components/SearchResults", () => {
  return jest.fn(({ results, loading }) => (
    <div data-testid="search-results">
      {loading ? "Loading..." : `Results: ${results.length}`}
    </div>
  ));
});

describe("SearchPage", () => {
  const mockUseSearchParams = useSearchParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render SearchBar and SearchResults components", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
    render(<SearchPage />);

    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("search-results")).toBeInTheDocument();
  });

  it("should call the fetch function and display results", async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("q=test"));

    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: 1, title: "Song 1" }, { id: 2, title: "Song 2" }],
    } as Response);

    render(<SearchPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith(
      "/api/genius/songs/search/full?q=test"
    ));

    await waitFor(() => {
      expect(screen.getByText("Results: 2")).toBeInTheDocument();
    });

    mockFetch.mockRestore();
  });

  it("should display an error if the fetch fails", async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("q=test"));

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();
    const mockFetch = jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response);

    render(<SearchPage />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledWith(
      "/api/genius/songs/search/full?q=test"
    ));

    expect(consoleSpy).toHaveBeenCalledWith(
      new Error("Error fetching full search results")
    );

    mockFetch.mockRestore();
    consoleSpy.mockRestore();
  });

  it("should not call fetch if query is empty", async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("q="));

    const mockFetch = jest.spyOn(global, "fetch");

    render(<SearchPage />);

    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });

    mockFetch.mockRestore();
  });

  it("should handle the absence of a search query gracefully", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams());

    render(<SearchPage />);

    expect(screen.getByText("Results: 0")).toBeInTheDocument();
  });
});
