// For adding custom fonts with other frameworks, see:
// https://tailwindcss.com/docs/font-family

import type { Metadata } from "next";
import { Geist, Merriweather, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Code Royale",
  description: "Real-time competitive coding platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <html lang="en" className="dark">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <main>
          <Toaster />
          {children}
        </main>
      </body>
    </html>
  );
}
