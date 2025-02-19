"use client";

import { useState } from "react";

import { useAtom } from "jotai";
import { XIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { selectedArtistsAtom } from "@/store/selected-items-store";

interface ArtistSelectCardProps {
  data: Array<Record<string, string>>;
}

export default function ArtistSelectCard(props: ArtistSelectCardProps) {
  const { data } = props;
  const [searchInput, setSearchInput] = useState("");
  const [selectedArtists, setSelectedArtists] = useAtom(selectedArtistsAtom);

  const filteredData = (
    searchInput.trim() === "" ? data : data.filter((d) => d.artist_name.includes(searchInput))
  ).filter((d) => !selectedArtists.some((s) => s.artist_id === d.artist_id));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Artists</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* search input */}
        <div className="flex h-9 w-full items-center gap-2 rounded-md border border-light-text px-3 dark:border-dark-text">
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
        {/* menu items */}
        {filteredData.length > 0 && (
          <div className="select-none rounded-md border border-light-text dark:border-dark-text">
            <ScrollArea className={cn("flex flex-col", filteredData.length > 4 ? "h-40" : "h-auto")}>
              {filteredData
                .filter((d) => d.artist_name.includes(searchInput))
                .map((d) => (
                  <div
                    key={d.artist_id}
                    className="cursor-pointer px-3 py-1.5 hover:bg-accent hover:text-light-text"
                    onClick={() => setSelectedArtists((prev) => [...prev, d])}
                  >
                    {d.artist_name}
                  </div>
                ))}
            </ScrollArea>
          </div>
        )}
        {/* selected items */}
        {selectedArtists.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedArtists.map((s) => (
              <div
                key={`s-${s.artist_id}`}
                className="flex select-none items-center gap-1 rounded-full border-2 border-accent px-2.5 py-0.5 font-semibold"
              >
                <button
                  className="hover:text-custom-red-300"
                  onClick={() => setSelectedArtists((prev) => prev.filter((p) => p.artist_id !== s.artist_id))}
                >
                  <XIcon size={20} />
                </button>
                <span>{s.artist_name}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
