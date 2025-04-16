"use client";

import React, { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import { usePathname } from "next/navigation";

import { deleteInfo as kkboxDeleteInfo, updateTags as kkboxUpdateTags } from "@/actions/kkbox.action";
import { deleteInfo as ytmusicDeleteInfo, updateTags as ytmusicUpdateTags } from "@/actions/ytmusic.action";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DisplayedTrackType, TagType } from "@/types/index.type";

import { arraysHaveSameElements } from "@/lib";
import { tagModifyCardHeightAtom } from "@/store";

interface UpdateButtonProps {
  trackData: DisplayedTrackType;
  tagData: Array<TagType>;
  tagMapping: Record<number, string>;
  disabled: boolean;
  platform: string;
}

// update button (update tags)
function UpdateButton(props: UpdateButtonProps) {
  const { trackData, tagData, tagMapping, disabled, platform } = props;
  const [addedTags, setAddedTags] = useState<Array<number>>([]);
  const [unaddedTags, setUnaddedTags] = useState<Array<number>>(tagData.sort().map((t) => t.id));

  // initialize
  useEffect(() => {
    if (trackData) {
      const tags = trackData.tags ? (trackData.tags as Array<number>) : [];
      setAddedTags(tags);
      setUnaddedTags((prev) => prev.filter((id) => !tags.includes(id)));
    } else {
      setAddedTags([]);
      setUnaddedTags(tagData.sort().map((t) => t.id));
    }
  }, [trackData]);

  // 點擊 confirm 按鈕 (儲存 tags)
  async function clickConfirmBtn() {
    const tags = trackData.tags ? (trackData.tags as Array<number>) : [];
    if (arraysHaveSameElements(tags, addedTags)) return;
    const res =
      platform === "kkbox"
        ? await kkboxUpdateTags(trackData.track_id!, { tags: addedTags })
        : await ytmusicUpdateTags(trackData.video_id!, { tags: addedTags });

    if (res?.status === 200) {
      alert(`${res.data} updated successfully!`);
      window.location.reload();
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="min-w-24 p-0" disabled={disabled}>
          Update
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Tag</DialogTitle>
          <DialogDescription>{trackData && trackData.track_name}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <span>Added Tags:</span>
            <div className="flex flex-col gap-2">
              {addedTags.map((id) => (
                <button
                  key={`tag-${id}`}
                  className="flex w-fit select-none items-center rounded-full border border-primary px-2.5 py-0.5 font-semibold text-primary dark:border-dark-primary dark:text-dark-primary"
                  onClick={() => {
                    setAddedTags(addedTags.filter((t) => t !== id));
                    setUnaddedTags([...unaddedTags, id]);
                  }}
                >
                  <span>{tagMapping[id]}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <span>Unadded Tags:</span>
            <div className="flex flex-col gap-2">
              {unaddedTags.map((id) => (
                <button
                  key={`tag-${id}`}
                  className="flex w-fit select-none items-center rounded-full border border-primary px-2.5 py-0.5 font-semibold text-primary dark:border-dark-primary dark:text-dark-primary"
                  onClick={() => {
                    setAddedTags([...addedTags, id]);
                    setUnaddedTags(unaddedTags.filter((t) => t !== id));
                  }}
                >
                  <span>{tagMapping[id]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={clickConfirmBtn}>Confirm</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface TrackListCardProps {
  data: Array<DisplayedTrackType>;
  tagData: Array<TagType>;
}

// track list card
export default function TrackListCard(props: TrackListCardProps) {
  const { data, tagData } = props;
  const [isCheckedArray, setIsCheckedArray] = useState(data.map(() => false));
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState<Array<DisplayedTrackType>>([]);
  const pathname = usePathname();
  const platform = pathname.split("/")[1];
  const height = useAtomValue(tagModifyCardHeightAtom);

  // 處理 header 的 checkbox
  function updateIsAllChecked(newIsCheckedArray: Array<boolean>) {
    setIsAllChecked(newIsCheckedArray.every((e) => e));
  }

  // 勾選一列
  function handleSelectOne(index: number) {
    const newIsCheckedArray = [...isCheckedArray];
    newIsCheckedArray[index] = !newIsCheckedArray[index];

    setIsCheckedArray(newIsCheckedArray);
    updateIsAllChecked(newIsCheckedArray);
  }

  // 勾選全部
  function handleSelectAll() {
    const newIsCheckedArray = [...isCheckedArray];
    newIsCheckedArray.fill(!isAllChecked);

    setIsCheckedArray(newIsCheckedArray);
    updateIsAllChecked(newIsCheckedArray);
  }

  // 根據 input 篩選歌曲
  useEffect(() => {
    if (data && data.length > 0) {
      const handledData = data.filter(
        (d) =>
          (d.track_name as string).split(" - ")[0].split(" (")[0].includes(searchInput.trim()) ||
          (d.artist_name as string).split(" (")[0].includes(searchInput.trim()),
      );
      setFilteredData(handledData);
      setIsCheckedArray(new Array(handledData.length).fill(false));
      updateIsAllChecked(new Array(handledData.length).fill(false));
    }
  }, [searchInput]);

  // 點擊 delete 按鈕
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

  // 標籤 mapping
  const tagMapping: Record<number, string> = tagData
    .filter((t) => !t.deprecated)
    .reduce((acc, tag) => ({ ...acc, [tag.id]: tag.tag_name }), {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Track List
          <span className="ml-2 text-base leading-none">
            ({isCheckedArray.filter((e) => e).length}/{filteredData.length} tracks)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {/* search input */}
          <Input placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          {/* update button */}
          <UpdateButton
            trackData={filteredData.filter((_: DisplayedTrackType, index: number) => isCheckedArray[index])[0]}
            tagData={tagData}
            tagMapping={tagMapping}
            disabled={!(isCheckedArray.filter((e) => e).length === 1)}
            platform={platform}
          />
          {/* delete button */}
          <Button
            variant={"outline"}
            className="min-w-24 border-custom-red-700 p-0 text-custom-red-700 hover:bg-custom-red-700 dark:border-custom-red-300 dark:text-custom-red-300 dark:hover:bg-custom-red-300"
            onClick={clickDeleteBtn}
            disabled={!isCheckedArray.some((e) => e)}
          >
            Delete
          </Button>
        </div>
        {/* track list */}
        <ScrollArea style={{ height: height + 256 }}>
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
              <React.Fragment key={d.track_id}>
                <div className="flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                  <Checkbox checked={isCheckedArray[index]} onCheckedChange={() => handleSelectOne(index)} />
                </div>
                <span className="col-span-5 flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                  {(d.track_name as string).split(" - ")[0].split(" (")[0]}
                </span>
                <span className="col-span-3 flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                  {(d.artist_name as string).split(" (")[0]}
                </span>
                <div className="col-span-3 flex flex-col items-start justify-center gap-1 border-b border-custom-gray-900/50 px-1 py-2">
                  {d.tags &&
                    (d.tags as Array<number>).length > 0 &&
                    (d.tags as Array<number>).map(
                      (t: number) =>
                        tagMapping[t] && (
                          <div
                            key={`${d.track_id}-tag-${t}`}
                            className="flex w-fit select-none items-center rounded-full border border-primary px-1.5 py-px text-xs font-semibold text-primary dark:border-dark-primary dark:text-dark-primary"
                          >
                            <span>{tagMapping[t]}</span>
                          </div>
                        ),
                    )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
