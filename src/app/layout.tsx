import type { Metadata } from "next";
import { Geist, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KopiCode // Masterclass HTML & CSS",
  description: "Platform Pembelajaran Interaktif HTML & CSS Dasar dengan Live Code Runner, Sandbox Preview, dan Showcase Gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased bg-[#050505] text-[#F5F5F5] min-h-screen selection:bg-white selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
