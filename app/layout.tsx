import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Network Rail Jobs",
  description: "Search for jobs at Network Rail",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={[
          "container mx-auto bg-brand-blue antialiased",
          font.className,
        ].join(" ")}
      >
        {children}
      </body>
    </html>
  );
}
