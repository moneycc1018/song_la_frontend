import React from "react";

import Header from "@/components/layout/header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
        <main className="w-full pt-16">{children}</main>
      </div>
    </>
  );
}
