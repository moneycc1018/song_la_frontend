"use client";

import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";

import { addInfo as kkboxAddInfo } from "@/actions/kkbox.action";
import { addInfo as ytmusicAddInfo } from "@/actions/ytmusic.action";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { DisplayedTrackType } from "@/types/index.type";

export default function TrackAddCard() {
  const pathname = usePathname();
  const platform = pathname.split("/")[1];
  const [searchInput, setSearchInput] = useState("");
  const [queryValue, setQueryValue] = useState("");
  const [isCheckedArray, setIsCheckedArray] = useState(new Array(10).fill(false));
  const [isAllChecked, setIsAllChecked] = useState(false);

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

  const { isLoading, data } = useQuery({
    queryKey: ["api_query", queryValue],
    queryFn: async () => {
      const paramsObj = {
        value: queryValue,
        type: "track",
        terr: "TW",
        limit: "10",
      };
      const searchParams = new URLSearchParams(paramsObj);
      const res = await fetch(`/api/${platform}/api-query?${searchParams.toString()}`);
      const result = await res.json();

      return result.data;
    },
    enabled: !!queryValue,
  });

  async function clickAddBtn() {
    const selectedData = data.filter((_: DisplayedTrackType, index: number) => isCheckedArray[index]);

    const res = platform === "kkbox" ? await kkboxAddInfo(selectedData) : await ytmusicAddInfo(selectedData);

    if (res?.status === 200) {
      alert(`${res.data.join(", ")} added successfully!`);
      window.location.reload();
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Track</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Search..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <Button variant={"outline"} className="w-32" onClick={() => setQueryValue(searchInput.trim())}>
            Search
          </Button>
          <Button variant={"outline"} className="w-32" onClick={clickAddBtn} disabled={!(data && data.length > 0)}>
            Add
          </Button>
        </div>
        {isLoading ? (
          <span className="flex h-60 w-full items-center justify-center">Loading...</span>
        ) : data && data.length > 0 ? (
          <ScrollArea className="h-60">
            <div className="grid w-full grid-cols-12 pr-3 text-sm">
              <div className="flex items-center border-b border-light-text px-1 dark:border-dark-text">
                <Checkbox checked={isAllChecked} onCheckedChange={handleSelectAll} />
              </div>
              <span className="col-span-4 flex h-8 items-center border-b border-light-text px-1 font-bold dark:border-dark-text">
                Track
              </span>
              <span className="col-span-3 flex h-8 items-center border-b border-light-text px-1 font-bold dark:border-dark-text">
                Artist
              </span>
              <span className="col-span-4 flex h-8 items-center border-b border-light-text px-1 font-bold dark:border-dark-text">
                Album
              </span>
              {data.map((d: DisplayedTrackType, index: number) => (
                <React.Fragment key={`new-track-${index}`}>
                  <div className="flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                    <Checkbox checked={isCheckedArray[index]} onCheckedChange={() => handleSelectOne(index)} />
                  </div>
                  <span className="col-span-4 flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                    {(d.track_name as string).split(" - ")[0].split(" (")[0]}
                  </span>
                  <span className="col-span-3 flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                    {d.artist_name
                      ? (d.artist_name as string).split(" (")[0]
                      : (d.artist_names as Array<string>).join(" & ")}
                  </span>
                  <span className="col-span-4 flex items-center border-b border-custom-gray-900/50 px-1 py-2">
                    {(d.album_name as string).split(" - ")[0].split(" (")[0]}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <span className="flex h-60 w-full items-center justify-center">No results.</span>
        )}
      </CardContent>
    </Card>
  );
}
