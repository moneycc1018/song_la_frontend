"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const data = [
  {
    value: "artist1",
    label: "Artist 1",
  },
  {
    value: "artist2",
    label: "Artist 2",
  },
  {
    value: "artist3",
    label: "Artist 3",
  },
  {
    value: "artist4",
    label: "Artist 4",
  },
  {
    value: "artist5",
    label: "Artist 5",
  },
];

export default function ArtistSelectArea() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Artists</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Artist Name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      </CardContent>
    </Card>
  );
}
