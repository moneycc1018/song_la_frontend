"use client";

import { useState } from "react";

import { useAtom } from "jotai";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { selectedArtistsAtom } from "@/store/selected-item-store";

interface ArtistSelectCardProps {
  data: Array<Record<string, string>>;
}

export default function ArtistSelectCard(props: ArtistSelectCardProps) {
  const { data } = props;
  const [searchInput, setSearchInput] = useState("");
  const [selectedArtists, setSelectedArtists] = useAtom(selectedArtistsAtom);

  const filteredData = (
    searchInput.trim() === "" ? data : data.filter((a) => a.artist_name.includes(searchInput))
  ).filter((a) => !selectedArtists.some((sa) => sa.artist_id === a.artist_id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Artists</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* search input */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-full items-center gap-2 rounded-md border border-light-text px-3 py-2 dark:border-dark-text">
            <input
              type="text"
              placeholder="Artist Name"
              className="w-full bg-transparent text-base placeholder:text-custom-gray-900 focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="hover:text-custom-red-300" onClick={() => setSearchInput("")}>
              <XIcon />
            </button>
          </div>
          <Button variant={"outline"} className="w-24" onClick={() => setSelectedArtists(data.map((a) => a))}>
            Select All
          </Button>
          <Button variant={"outline"} className="w-24" onClick={() => setSelectedArtists([])}>
            Remove All
          </Button>
        </div>
        {/* menu items */}
        {filteredData.length > 0 && (
          <div className="h-[180px] select-none overflow-hidden rounded-md border border-light-text dark:border-dark-text">
            <ScrollArea className={cn("flex flex-col", filteredData.length > 4 ? "h-[180px]" : "h-auto")}>
              {filteredData
                .filter((a) => a.artist_name.includes(searchInput))
                .map((a) => (
                  <div
                    key={a.artist_id}
                    className="dark:hover:bg-dark-primary cursor-pointer px-3 py-2 hover:bg-primary hover:text-dark-text dark:hover:text-light-text"
                    onClick={() => setSelectedArtists((prev) => [...prev, a])}
                  >
                    {a.artist_name}
                  </div>
                ))}
            </ScrollArea>
          </div>
        )}
        {/* selected items */}
        {selectedArtists.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedArtists.map((sa) => (
              <div
                key={`s-${sa.artist_id}`}
                className="dark:border-dark-primary dark:text-dark-primary flex select-none items-center gap-1 rounded-full border border-primary px-2.5 py-0.5 font-semibold text-primary"
              >
                <button
                  className="hover:text-custom-red-300"
                  onClick={() => setSelectedArtists((prev) => prev.filter((p) => p.artist_id !== sa.artist_id))}
                >
                  <XIcon size={20} />
                </button>
                <span>{sa.artist_name}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
