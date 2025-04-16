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

import { YtmusicInfoType } from "@/types/ytmusic-info.type";

import { shuffle } from "@/lib";
import { selectedArtistsAtom, selectedTagsAtom, selectedTrackAtom } from "@/store/selected-item-store";

// 柱狀波浪動畫
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
    <div className="relative">
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

// button bar (play, answer)
function BtnBar() {
  const selectedArtists = useAtomValue(selectedArtistsAtom);
  const selectedArtistsStr = selectedArtists.map((sa) => sa.artist_id).join("!@!");
  const [selectedTrack, setSelectedTrack] = useAtom(selectedTrackAtom);
  const [trackIndex, setTrackIndex] = useState(0);
  const selectedTags = useAtomValue(selectedTagsAtom);
  const selectedTagIdArray = selectedTags.map((st) => st.id);

  useEffect(() => {
    setTrackIndex(0);
  }, [selectedArtistsStr]);

  // 根據所選歌手取得歌曲
  const { isLoading, data } = useQuery({
    queryKey: ["info", selectedArtistsStr],
    queryFn: async () => {
      const res = await fetch(`/api/ytmusic/info?column=artist_id&value=${selectedArtistsStr}`);
      const result = await res.json();

      return shuffle(result.data); // 隨機打亂陣列順序
    },
    enabled: selectedArtistsStr !== "",
  });

  const filteredData =
    selectedTagIdArray.length === 0
      ? data
      : data?.filter(
          (d: YtmusicInfoType) => d.tags && (d.tags as Array<number>).some((t) => selectedTagIdArray.includes(t)),
        );
  const trackCount = filteredData?.length || 0;

  // 點擊 play 按鈕
  function clickPlayBtn() {
    if (trackCount === 0) {
      alert("Track pool is empty!");
      return;
    }

    if (trackIndex < trackCount) {
      const track = filteredData?.[trackIndex] || {};
      setTrackIndex((pre) => pre + 1);
      setSelectedTrack(track);
    } else {
      alert("Track pool is empty!");
    }
  }

  return (
    <div className="absolute bottom-0 z-10 flex items-center justify-center gap-4">
      {/* track count (played/total) */}
      <div className="flex h-10 w-32 select-none items-center justify-center rounded-md border border-primary text-primary dark:border-dark-primary dark:text-dark-primary">
        {isLoading ? "Loading..." : `${trackIndex}/${trackCount} tracks`}
      </div>
      {/* play button */}
      <Button variant={"outline"} className="px-8" onClick={clickPlayBtn}>
        <PlayIcon />
      </Button>
      {/* answer button */}
      <AlertDialog>
        <AlertDialogTrigger className="!ring-0 !ring-offset-0" asChild>
          <Button variant={"outline"} className="px-8">
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

// music game area
export function MusicGameArea() {
  return (
    <>
      <TrackFrame />
      <BtnBar />
    </>
  );
}
