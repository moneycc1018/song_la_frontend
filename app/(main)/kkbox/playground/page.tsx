import { ScrollArea } from "@/components/ui/scroll-area";

import prisma from "@/lib/prisma";

import ArtistSelectCard from "../../components/artist-select-card";
import GameArea from "../components/game-area";

export default async function KkboxPlaygroundPage() {
  const result = await prisma.kkbox_info.groupBy({
    by: ["artist_id", "artist_name"],
    orderBy: {
      artist_name: "asc",
    },
  });

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 px-64 py-4">
        <GameArea />
        <div className="grid grid-cols-2 gap-4">
          <ArtistSelectCard data={result} />
        </div>
      </div>
    </ScrollArea>
  );
}
