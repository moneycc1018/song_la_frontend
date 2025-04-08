"use client";

import { useSetAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { selectedArtistsAtom, selectedTrackAtom } from "@/store/selected-item-store";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export default function PageSwitch() {
  const pathname = usePathname();
  const setSelectedArtists = useSetAtom(selectedArtistsAtom);
  const setSelectedTrack = useSetAtom(selectedTrackAtom);

  return (
    <div className="fixed inset-x-0 top-16 z-10">
      <Tabs defaultValue={pathname.split("/")[1]} className="flex w-full justify-center px-64 py-4">
        <TabsList className="w-1/2 select-none">
          <TabsTrigger value="kkbox" className="w-full" asChild>
            <Link
              href={`/kkbox/${pathname.split("/")[2]}`}
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedArtists([]);
                setSelectedTrack({});
              }}
            >
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
          <TabsTrigger value="ytmusic" className="w-full" asChild>
            <Link
              href={`/ytmusic/${pathname.split("/")[2]}`}
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedArtists([]);
                setSelectedTrack({});
              }}
            >
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
