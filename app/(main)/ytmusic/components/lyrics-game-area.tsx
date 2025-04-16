"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { LightbulbIcon, PlayIcon, RotateCw } from "lucide-react";

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

// lyrics area
function LyricsArea() {
  const track = useAtomValue(selectedTrackAtom);
  const lyricsArray =
    track && Object.keys(track).length > 0
      ? (track?.lyrics as string).split("\n").filter((e) => e.trim() !== "" && e.trim() !== "\r")
      : [];
  const lyricsLength = lyricsArray.length;
  const [randomRowNumber, setRandomRowNumber] = useState<number>(Math.floor(Math.random() * lyricsLength));

  // 點擊 fresh 按鈕
  function clickFreshBtn() {
    setRandomRowNumber(Math.floor(Math.random() * lyricsLength));
  }

  return (
    track &&
    Object.keys(track).length > 0 && (
      <div className="flex items-center gap-4">
        <div className="w-6"></div>
        <span className="flex w-[600px] justify-center text-2xl">{lyricsArray[randomRowNumber]}</span>
        <button onClick={clickFreshBtn}>
          <RotateCw />
        </button>
      </div>
    )
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

// lyrics game area
export function LyricsGameArea() {
  return (
    <>
      <LyricsArea />
      <BtnBar />
    </>
  );
}
