"use client";

import { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TagModifyCard() {
  const [searchInput, setSearchInput] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["tag"],
    queryFn: async () => {
      const res = await fetch("/api/tag");
      const result = await res.json();

      return result.data;
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modify Tag</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Input placeholder="Tag Name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <Button variant={"outline"} className="w-32">
            Add
          </Button>
          <Button variant={"outline"} className="w-32">
            Update
          </Button>
        </div>
        {isLoading ? (
          <span className="flex h-[30px] w-full items-center justify-center">Loading...</span>
        ) : (
          data &&
          data.length > 0 &&
          data.map((t: Record<string, string>) => (
            <div
              key={`tag-${t.id}`}
              className="flex w-fit select-none items-center gap-1 rounded-full border border-primary px-2.5 py-0.5 font-semibold text-primary dark:border-dark-primary dark:text-dark-primary"
            >
              <button
                className="text-custom-red-300"
                //   onClick={() => setSelectedArtists((prev) => prev.filter((p) => p.artist_id !== sa.artist_id))}
              >
                <XIcon size={20} />
              </button>
              <span>{t.tag_name}</span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
