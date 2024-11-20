import "@/app/globals.css";
import Footer from "@/app/ui/Footer";
import Header from "@/app/ui/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html lang="en" className="text-foreground bg-background">
      <body
        className={[
          "antialiased p-2 relative",
          "max-w-screen-2xl mx-auto",
          font.className,
        ].join(" ")}
      >
        <div className="grid grid-rows-body grid-cols-body h-screen gap-2 py-2 pb-4 rounded-lg">
          <Header />

          {children}

          <Footer />
        </div>
      </body>
    </html>
  );
}
