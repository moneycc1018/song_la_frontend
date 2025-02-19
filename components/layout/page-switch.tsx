"use client";

import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function PageSwitch() {
  return (
    <div className="fixed inset-x-0 top-16 z-10 bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
      <Tabs defaultValue="kkbox" className="flex w-full justify-center px-16 py-4">
        <TabsList className="w-1/2">
          <TabsTrigger value="kkbox" className="w-full" asChild>
            <Link href={"/kkbox"} className="flex items-center gap-2">
              <div className="relative min-h-5 min-w-5">
                <Image
                  src={"/images/kkbox_logo.svg"}
                  alt="kkbox_logo"
                  className="absolute"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  fill
                />
              </div>
              <span>KKBOX</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="ytmusic" className="w-full">
            <Link href={"/ytmusic"} className="flex items-center gap-2">
              <div className="relative min-h-5 min-w-5">
                <Image
                  src={"/images/ytmusic_logo.svg"}
                  alt="ytmusic_logo"
                  className="absolute"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  fill
                />
              </div>

              <span>YouTube Music</span>
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
