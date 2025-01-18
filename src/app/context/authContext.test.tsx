import { render, screen } from "@testing-library/react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthProvider, useAuth } from "./authContext";
import { ReactNode } from "react";

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));


const TestComponent = () => {
  const { userId } = useAuth();
  return <div data-testid="user-id">{userId}</div>;
};
describe("AuthProvider", () => {
  it("should initialize with null userId", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null); 
      return jest.fn(); 
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const userIdElement = screen.getByTestId("user-id");
    expect(userIdElement.textContent).toBe("null");
  });

  it("should update userId when authentication state changes", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback({ uid: "123" }); 
      return jest.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const userIdElement = screen.getByTestId("user-id");
    expect(userIdElement.textContent).toBe("123");
  });



  it("should reset userId to null when no user is logged in", () => {
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null); 
      return jest.fn();

    });

    render(

      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const userIdElement = screen.getByTestId("user-id");
    expect(userIdElement.textContent).toBe("null");
  });

  it("should throw an error if useAuth is used outside AuthProvider", () => {
    const renderWithoutProvider = () => render(<TestComponent />);
    expect(renderWithoutProvider).toThrow(

      "useAuth must be used within an AuthProvider"
    );
  });
});
