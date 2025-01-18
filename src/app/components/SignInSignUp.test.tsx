import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignInSignUp from "./SignInSignUp";

import { useAuth } from "@/app/context/authContext";
import {


  useCreateUserWithEmailAndPassword,

  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

jest.mock("react-firebase-hooks/auth", () => ({
  useCreateUserWithEmailAndPassword: jest.fn(),
  useSignInWithEmailAndPassword: jest.fn(),
}));

jest.mock("@/app/context/authContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("../firebase/data/createUserDocument", () => jest.fn());

describe("SignInSignUp Component", () => {
  const mockToggleOpenSignIn = jest.fn();
  const mockCreateUserWithEmailAndPassword = jest.fn();
  const mockSignInWithEmailAndPassword = jest.fn();

  const mockCreateUserDocument = require("../firebase/data/createUserDocument");

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ userId: null });
    (useCreateUserWithEmailAndPassword as jest.Mock).mockReturnValue([
      mockCreateUserWithEmailAndPassword,
    ]);

    (useSignInWithEmailAndPassword as jest.Mock).mockReturnValue([
      mockSignInWithEmailAndPassword,
    ]);
  });


  it("renders the component correctly", () => {
    render(<SignInSignUp toggleOpenSignIn={mockToggleOpenSignIn} />);

    expect(screen.getByText("Welcome to LingoAI")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();

    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("toggles between Sign In and Sign Up", () => {
    render(<SignInSignUp toggleOpenSignIn={mockToggleOpenSignIn} />);

    const toggleButton = screen.getByText("Sign Up");
    fireEvent.click(toggleButton);

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
  });

  it("updates input fields correctly", () => {
    render(<SignInSignUp toggleOpenSignIn={mockToggleOpenSignIn} />);

    const emailInput = screen.getByPlaceholderText("Enter your email") as HTMLInputElement;

    const passwordInput = screen.getByPlaceholderText("Enter your password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");

    expect(passwordInput.value).toBe("password123");
  });

  it("calls createUserWithEmailAndPassword and createUserDocument on Sign Up", async () => {
    render(<SignInSignUp toggleOpenSignIn={mockToggleOpenSignIn} />);
    fireEvent.click(screen.getByText("Sign Up"));
    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByText("Sign Up");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        "test@example.com",
        "password123"
      )
    );
    await waitFor(() =>
      expect(mockCreateUserDocument).toHaveBeenCalled()
    );
  });

  it("calls signInWithEmailAndPassword on Sign In", async () => {
    render(<SignInSignUp toggleOpenSignIn={mockToggleOpenSignIn} />);

    const emailInput = screen.getByPlaceholderText("Enter your email");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const submitButton = screen.getByText("Sign In");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(

        "test@example.com",
        "password123"
      )
    );
    await waitFor(() => expect(mockToggleOpenSignIn).toHaveBeenCalled());
  });

  it("resets form data after submission", async () => {
    render(<SignInSignUp toggleOpenSignIn={mockToggleOpenSignIn} />);

    const emailInput = screen.getByPlaceholderText("Enter your email") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Enter your password") as HTMLInputElement;
    const submitButton = screen.getByText("Sign In");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(emailInput.value).toBe("");
      expect(passwordInput.value).toBe("");
    });
  });
});
