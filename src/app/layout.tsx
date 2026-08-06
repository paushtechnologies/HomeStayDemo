import type { Metadata } from "next";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { Footer } from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Kanatal Homestay by Saur Properties",
  description: "Experience breathtaking sunsets and authentic life in Village Saur, Kanatal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}
      >
        <Navbar />
        {children}
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
