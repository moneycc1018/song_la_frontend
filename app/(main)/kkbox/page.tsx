import { ScrollArea } from "@/components/ui/scroll-area";

import ArtistSelectCard from "../components/artist-select-card";
import GameArea from "../components/game-area";

export default async function KkboxPage() {
  const res = await fetch(`${process.env.SITE_URL}/api/kkbox?type=artists`);
  const result = await res.json();

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 px-16 py-4">
        <GameArea />
        <div className="grid grid-cols-2">
          <ArtistSelectCard data={result.data} />
        </div>
      </div>
    </ScrollArea>
  );
}
