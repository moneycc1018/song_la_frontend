import React from "react";

import Header from "@/components/layout/header";
import PageSwitch from "@/components/layout/page-switch";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <PageSwitch />
      <div className="flex h-screen overflow-hidden bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
        <main className="w-full pt-[136px]">{children}</main>
      </div>
    </>
  );
}
