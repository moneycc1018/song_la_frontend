"use client";

import { useState } from "react";

import { useSetAtom } from "jotai";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { selectedTrackAtom } from "@/store/selected-item-store";

import { LyricsGameArea } from "./lyrics-game-area";
import { MusicGameArea } from "./music-game-area";

// game area
export default function GameArea() {
  const [selectedMode, setSelectedMode] = useState("music");
  const setSelectedTrack = useSetAtom(selectedTrackAtom);

  return (
    <div className="relative flex h-[150px] flex-col items-center justify-center gap-4">
      <RadioGroup
        className="absolute top-0 z-20 flex items-center gap-4"
        defaultValue="music"
        onValueChange={setSelectedMode}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="music" id="music" onClick={() => setSelectedTrack({})} />
          <label htmlFor="music">Music</label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="lyrics" id="lyrics" onClick={() => setSelectedTrack({})} />
          <label htmlFor="lyrics">Lyrics</label>
        </div>
      </RadioGroup>
      {selectedMode === "music" ? <MusicGameArea /> : <LyricsGameArea />}
    </div>
  );
}
