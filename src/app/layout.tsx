import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ChatWidget } from "@/components/ui/chat-widget";


const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HALO Nexus",
  description: "The Digital Operating System for M A D HALO Technologies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${manrope.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}

