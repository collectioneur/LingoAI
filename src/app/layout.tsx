import type { Metadata } from "next";
import "./globals.css";
import Background from "./components/Background";
import Header from "./components/Header";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  weight: ["400", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LingoAI ⋅ Main",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Background />
        <Header />
        {children}
      </body>
    </html>
  );
}
