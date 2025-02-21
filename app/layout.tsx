import React from "react";

import type { Metadata } from "next";

import { ThemeProvider } from "next-themes";
import { Raleway, Roboto } from "next/font/google";

import "@/styles/globals.scss";

import ReactQueryProvider from "@/providers/react-query-provider";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const raleway = Raleway({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Song La",
  description: "A simple song game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${roboto.variable} ${raleway.variable}`} suppressHydrationWarning>
      <body className={`${raleway.className}`}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
