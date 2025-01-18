import type { Metadata } from "next";
import "./globals.css";
import Background from "./components/Background";
import Header from "./components/Header";
import { Lexend } from "next/font/google";
import { AuthProvider } from "./context/authContext";
import { Bagel_Fat_One } from "next/font/google";
import { Suspense } from "react";

const lexend = Lexend({
  weight: ["400", "800"],
  subsets: ["latin"],
});

export const bagelFatOne = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <Suspense>
        <html lang="en">
          <head>
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <title>LingoAI</title>
          </head>
          <body className={lexend.className}>
            <Background />
            <Header />
            {children}
          </body>
        </html>
      </Suspense>
    </AuthProvider>
  );
}
