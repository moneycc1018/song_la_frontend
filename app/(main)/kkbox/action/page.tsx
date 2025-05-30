import { ScrollArea } from "@/components/ui/scroll-area";

import prisma from "@/lib/prisma";

import TagModifyCard from "../../components/tag-modify-card";
import TrackAddCard from "../../components/track-add-card";
import TrackListCard from "../../components/track-list-card";

export const dynamic = "force-dynamic";

export default async function KkboxActionPage() {
  const result = await prisma.kkbox_info.findMany({
    select: {
      track_id: true,
      track_name: true,
      artist_name: true,
      album_name: true,
      tags: true,
    },
    orderBy: {
      track_name: "asc",
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
      <div className="grid grid-cols-2 gap-4 px-32 py-4">
        <TrackListCard data={result} tagData={tagResult} />
        <div className="flex flex-col gap-4">
          <TrackAddCard />
          <TagModifyCard data={tagResult} />
        </div>
      </div>
    </ScrollArea>
  );
}
