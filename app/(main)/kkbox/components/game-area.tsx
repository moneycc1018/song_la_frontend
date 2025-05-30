"use client";

import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useAtom, useAtomValue } from "jotai";
import { LightbulbIcon, PlayIcon } from "lucide-react";

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

import { KkboxInfoType } from "@/types/kkbox-info.type";

import { shuffle } from "@/lib";
import { selectedArtistsAtom, selectedTagsAtom, selectedTrackAtom } from "@/store/selected-item-store";

// track frame
function TrackFrame() {
  const track = useAtomValue(selectedTrackAtom);

  return (
    <div className="relative left-[-50px] h-[150px] w-[300px]">
      <div className="pointer-events-none absolute z-10 h-[150px] w-[300px] border-y-[50px] border-s-[100px] border-light-background dark:border-dark-background"></div>
      {/* kkbox iframe */}
      {track && Object.keys(track).length > 0 && (
        <iframe
          src={`https://widget.kkbox.com/v1/?id=${track.track_id}&type=song&terr=TW&autoplay=true`}
          allow="autoplay"
        />
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

  const { isLoading, data } = useQuery({
    queryKey: ["info", selectedArtistsStr],
    queryFn: async () => {
      const res = await fetch(`/api/kkbox/info?column=artist_id&value=${selectedArtistsStr}`);
      const result = await res.json();

      return shuffle(result.data);
    },
    enabled: selectedArtistsStr !== "",
  });

  const filteredData =
    selectedTagIdArray.length === 0
      ? data
      : data?.filter(
          (d: KkboxInfoType) => d.tags && (d.tags as Array<number>).some((t) => selectedTagIdArray.includes(t)),
        );

  const trackCount = filteredData?.length || 0;

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
      <div className="flex h-10 w-32 select-none items-center justify-center rounded-md border border-primary text-primary dark:border-dark-primary dark:text-dark-primary">
        {isLoading ? "Loading..." : `${trackIndex}/${trackCount} tracks`}
      </div>
      <Button variant={"outline"} className="px-8" onClick={() => clickPlayBtn()}>
        <PlayIcon />
      </Button>
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
                <span>Artist: {selectedTrack.artist_name}</span>
                <span>Album: {selectedTrack.album_name}</span>
                <span>Date: {selectedTrack.release_date}</span>
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
