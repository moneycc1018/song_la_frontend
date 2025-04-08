import { ScrollArea } from "@/components/ui/scroll-area";

import prisma from "@/lib/prisma";

import ArtistSelectCard from "../../components/artist-select-card";
import GameArea from "../components/game-area";

export default async function YtmusicPlaygroundPage() {
  const result = await prisma.ytmusic_info.groupBy({
    by: ["author", "artist_ids", "artist_names"],
    orderBy: {
      author: "asc",
    },
  });

  const handledData = result.map((a) => {
    return {
      artist_id: (a.artist_ids as Array<string>).join("!@!"),
      artist_name: (a.artist_names as Array<string>).join(" & "),
    };
  });

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 px-64 py-4">
        <GameArea />
        <div className="grid grid-cols-2 gap-4">
          <ArtistSelectCard data={handledData} />
        </div>
      </div>
    </ScrollArea>
  );
}
