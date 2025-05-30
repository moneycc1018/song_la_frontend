import { ScrollArea } from "@/components/ui/scroll-area";

import prisma from "@/lib/prisma";

import TagModifyCard from "../../components/tag-modify-card";
import TrackAddCard from "../../components/track-add-card";
import TrackListCard from "../../components/track-list-card";

export const dynamic = "force-dynamic";

export default async function YtmusicActionPage() {
  const result = await prisma.ytmusic_info.findMany({
    select: {
      video_id: true,
      track_name: true,
      artist_names: true,
      album_name: true,
      tags: true,
    },
    orderBy: {
      track_name: "asc",
    },
  });

  const handledData = result.map((d) => {
    return {
      ...d,
      artist_name: (d.artist_names as Array<string>).join(" & "),
    };
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
        <TrackListCard data={handledData} tagData={tagResult} />
        <div className="flex flex-col gap-4">
          <TrackAddCard />
          <TagModifyCard data={tagResult} />
        </div>
      </div>
    </ScrollArea>
  );
}
