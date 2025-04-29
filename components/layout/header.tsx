"use client";

import { GamepadIcon, PickaxeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import ThemeSwitch from "../theme-switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const selectedPlatform = pathname.split("/")[1];
  const selectedInteraction = pathname.split("/")[2];

  return (
    <div className="fixed inset-x-0 top-0 z-10 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
      <nav className="flex items-center justify-between px-32 py-4">
        <span className="text-2xl font-bold">Song La</span>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-6 w-32 items-center justify-end outline-none">
                <div className="rounded-full bg-primary p-1 text-dark-text dark:bg-dark-primary dark:text-light-text">
                  {selectedInteraction === "action" ? <PickaxeIcon /> : <GamepadIcon />}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-0 border-none bg-none shadow-none">
              <DropdownMenuItem className="flex w-32 justify-end px-0 py-1 text-base" asChild>
                <Link href={`/${selectedPlatform}/action`} className="cursor-pointer">
                  <span className="rounded-full bg-primary px-3 py-0.5 text-dark-text dark:bg-dark-primary dark:text-light-text">
                    action
                  </span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex w-32 justify-end px-0 py-1 text-base" asChild>
                <Link href={`/${selectedPlatform}/playground`} className="cursor-pointer">
                  <span className="rounded-full bg-primary px-3 py-0.5 text-dark-text dark:bg-dark-primary dark:text-light-text">
                    playground
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeSwitch />
        </div>
      </nav>
    </div>
  );
}
