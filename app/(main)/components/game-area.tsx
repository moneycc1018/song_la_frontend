"use client";

import { useAtomValue } from "jotai";
import { LightbulbIcon, PlayIcon } from "lucide-react";

import { trackIdAtom } from "@/store/track-id-store";

function TrackFrame() {
  const trackId = useAtomValue(trackIdAtom);
  // const trackId = "0qkYKglakH9Q88BJyP";

  return (
    <div className="relative left-[-50px] h-[150px] w-[300px]">
      <div className="pointer-events-none absolute z-10 h-[150px] w-[300px] border-y-[50px] border-s-[100px] border-light-background dark:border-dark-background"></div>
      {/* kkbox iframe */}
      <iframe src={`https://widget.kkbox.com/v1/?id=${trackId}&type=song&terr=TW&autoplay=true`} allow="autoplay" />
    </div>
  );
}

function BtnBar() {
  return (
    <div className="absolute bottom-2 z-10 flex items-center justify-center gap-8">
      <button>
        <PlayIcon />
      </button>
      <button>
        <LightbulbIcon />
      </button>
    </div>
  );
}

export default function GameArea() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      {/* track frame */}
      <TrackFrame />
      <BtnBar />
    </div>
  );
}
