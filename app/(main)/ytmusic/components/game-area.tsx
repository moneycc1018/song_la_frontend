"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { LightbulbIcon, PlayIcon } from "lucide-react";
import ReactPlayer from "react-player/youtube";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { selectedArtistsAtom, selectedTrackAtom } from "@/store/selected-item-store";

function MusicAnimation() {
  const [lengthArray, setLengthArray] = useState<Array<number>>([32, 24, 16, 8, 0]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLengthArray((prev) => prev.map((e) => (e + 8 > 32 ? 0 : e + 8)));
    }, 100);

    return () => clearTimeout(t);
  });

  return (
    <div className="absolute left-[84px] top-12 z-20 flex size-8 flex-row items-end gap-[2px]">
      {lengthArray.map((e, index) => (
        <div key={index} className="w-1/5 bg-primary transition-all" style={{ height: `${e}px` }}></div>
      ))}
    </div>
  );
}

// track frame
function TrackFrame() {
  const track = useAtomValue(selectedTrackAtom);

  return (
    <div className="relative h-[150px] w-[200px]">
      {track && Object.keys(track).length > 0 && (
        <>
          <MusicAnimation />
          <div className="pointer-events-none absolute z-10 h-[150px] w-[200px] bg-light-background dark:bg-dark-background"></div>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${track.video_id}`} width={200} height={150} playing />
        </>
      )}
    </div>
  );
}

function BtnBar() {
  const selectedArtists = useAtomValue(selectedArtistsAtom);
  const selectedArtistsStr = selectedArtists.map((sa) => sa.artist_id).join("!@!");
  const [selectedTrack, setSelectedTrack] = useAtom(selectedTrackAtom);
  const [trackIndex, setTrackIndex] = useState(0);

  useEffect(() => {
    setTrackIndex(0);
  }, [selectedArtistsStr]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function shuffle(array: Array<any>) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 隨機索引
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // 交換
    }
    return newArray;
  }

  const { isLoading, data } = useQuery({
    queryKey: ["info", selectedArtistsStr],
    queryFn: async () => {
      const res = await fetch(`/api/ytmusic/info?column=artist_id&value=${selectedArtistsStr}`);
      const result = await res.json();

      return shuffle(result.data);
    },
  });

  const trackCount = data?.length || 0;

  function clickPlay() {
    if (trackCount === 0) {
      alert("Track pool is empty!");
      return;
    }

    if (trackIndex < trackCount) {
      const track = data?.[trackIndex] || {};
      setTrackIndex((pre) => pre + 1);
      setSelectedTrack(track);
    } else {
      alert("Track pool is empty!");
    }
  }

  return (
    <div className="absolute bottom-0 z-10 flex items-center justify-center gap-4">
      <div className="dark:border-dark-primary dark:text-dark-primary flex h-10 w-32 select-none items-center justify-center rounded-md border border-primary text-primary">
        {isLoading ? "Loading..." : `${trackIndex}/${trackCount} tracks`}
      </div>
      <Button variant={"outline"} className="px-8 text-primary" onClick={() => clickPlay()}>
        <PlayIcon />
      </Button>
      <AlertDialog>
        <AlertDialogTrigger className="!ring-0 !ring-offset-0" asChild>
          <Button variant={"outline"} className="px-8 text-primary">
            <LightbulbIcon />
          </Button>
        </AlertDialogTrigger>
        {selectedTrack && Object.keys(selectedTrack).length > 0 && (
          <AlertDialogContent className="top-[25%]">
            <AlertDialogHeader>
              <AlertDialogTitle>{selectedTrack.track_name}</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col">
                <span>Artist: {(selectedTrack.artist_names as Array<string>).join(", ")}</span>
                <span>Album: {selectedTrack.album_name}</span>
                <span>Year: {selectedTrack.release_year}</span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
}

export default function GameArea() {
  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      {/* track frame */}
      <TrackFrame />
      {/* button bar */}
      <BtnBar />
    </div>
  );
}
