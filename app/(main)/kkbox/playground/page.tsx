import { ScrollArea } from "@/components/ui/scroll-area";

import prisma from "@/lib/prisma";

import ArtistSelectCard from "../../components/artist-select-card";
import { TagSelectCard } from "../../components/tag-select-card";
import GameArea from "../components/game-area";

export const dynamic = "force-dynamic";

export default async function KkboxPlaygroundPage() {
  const result = await prisma.kkbox_info.groupBy({
    by: ["artist_id", "artist_name"],
    orderBy: {
      artist_name: "asc",
    },
  });

  const tagResult = await prisma.tag.findMany({
    where: {
      deprecated: false,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 px-32 py-4">
        <GameArea />
        <div className="grid grid-cols-2 gap-4">
          <ArtistSelectCard data={result} />
          <TagSelectCard data={tagResult} />
        </div>
      </div>
    </ScrollArea>
  );
}
