"use client";

import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button className={cn(theme === "light" ? "hidden" : "block")} onClick={() => setTheme("light")}>
        <SunIcon />
      </button>
      <button className={cn(theme === "dark" ? "hidden" : "block")} onClick={() => setTheme("dark")}>
        <MoonIcon />
      </button>
    </>
  );
};

export default ThemeSwitch;
