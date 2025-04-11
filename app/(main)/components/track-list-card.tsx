"use client";

import React, { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { deleteInfo as kkboxDeleteInfo } from "@/actions/kkbox.action";
import { deleteInfo as ytmusicDeleteInfo } from "@/actions/ytmusic.action";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DisplayedTrackType } from "@/types/index.type";

interface TrackListCardProps {
  data: Array<DisplayedTrackType>;
}

export default function TrackListCard(props: TrackListCardProps) {
  const { data } = props;
  const [isCheckedArray, setIsCheckedArray] = useState(data.map(() => false));
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState<Array<DisplayedTrackType>>([]);
  const pathname = usePathname();
  const platform = pathname.split("/")[1];

  function updateIsAllChecked(newIsCheckedArray: Array<boolean>) {
    setIsAllChecked(newIsCheckedArray.every((e) => e));
  }

  function handleSelectOne(index: number) {
    const newIsCheckedArray = [...isCheckedArray];
    newIsCheckedArray[index] = !newIsCheckedArray[index];

    setIsCheckedArray(newIsCheckedArray);
    updateIsAllChecked(newIsCheckedArray);
  }

  function handleSelectAll() {
    const newIsCheckedArray = [...isCheckedArray];
    newIsCheckedArray.fill(!isAllChecked);

    setIsCheckedArray(newIsCheckedArray);
    updateIsAllChecked(newIsCheckedArray);
  }

  useEffect(() => {
    if (data && data.length > 0) {
      setFilteredData(
        data.filter(
          (d) =>
            (d.track_name as string).split(" - ")[0].split(" (")[0].includes(searchInput.trim()) ||
            (d.artist_name as string).split(" (")[0].includes(searchInput.trim()),
        ),
      );
    }
  }, [searchInput]);

  async function clickDeleteBtn() {
    const selectedTrackIdsStr = filteredData
      .filter((_: DisplayedTrackType, index: number) => isCheckedArray[index])
      .map((d) => (d.track_id ? d.track_id : d.video_id))
      .join("!@!");

    const res =
      platform === "kkbox" ? await kkboxDeleteInfo(selectedTrackIdsStr) : await ytmusicDeleteInfo(selectedTrackIdsStr);

    if (res?.status === 200) {
      alert(`${res.data.join(", ")} deleted successfully!`);
      window.location.reload();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Track List
          <span className="ml-2 text-base">
            ({isCheckedArray.filter((e) => e).length}/{data.length} tracks)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <Button variant={"outline"} className="w-32">
            Update
          </Button>
          <Button
            variant={"outline"}
            className="w-32 border-custom-red-700 text-custom-red-700 hover:bg-custom-red-700 dark:border-custom-red-300 dark:text-custom-red-300 dark:hover:bg-custom-red-300"
            onClick={clickDeleteBtn}
            disabled={!isCheckedArray.some((e) => e)}
          >
            Delete
          </Button>
        </div>
        <ScrollArea className="h-96">
          <div className="grid w-full grid-cols-12 pr-3 text-sm">
            <div className="flex h-8 items-center border-b border-light-text px-1 dark:border-dark-text">
              <Checkbox checked={isAllChecked} onCheckedChange={handleSelectAll} />
            </div>
            <span className="col-span-5 flex h-8 items-center border-b border-light-text px-1 font-bold dark:border-dark-text">
              Track
            </span>
            <span className="col-span-3 flex h-8 items-center border-b border-light-text px-1 font-bold dark:border-dark-text">
              Artist
            </span>
            <span className="col-span-3 flex h-8 items-center border-b border-light-text px-1 font-bold dark:border-dark-text">
              Tags
            </span>
            {filteredData.map((d, index) => (
              <React.Fragment key={`track-${index}`}>
                <div className="flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                  <Checkbox checked={isCheckedArray[index]} onCheckedChange={() => handleSelectOne(index)} />
                </div>
                <span className="col-span-5 flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                  {(d.track_name as string).split(" - ")[0].split(" (")[0]}
                </span>
                <span className="col-span-3 flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                  {(d.artist_name as string).split(" (")[0]}
                </span>
                <span className="col-span-3 flex items-center border-b border-custom-gray-900/50 px-1 py-2">{}</span>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
