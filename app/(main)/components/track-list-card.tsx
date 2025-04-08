import { JsonValue } from "@prisma/client/runtime/library";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TrackListCardProps {
  data: Array<Record<string, JsonValue>>;
}

export default function TrackListCard(props: TrackListCardProps) {
  const { data } = props;

  console.log(data[0]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track List</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="grid h-96 w-full grid-cols-5 text-sm">
            <Checkbox />
            <span className="col-span-2 font-bold">Track</span>
            <span className="font-bold">Artist</span>
            <span className="font-bold">Tags</span>
            {data.map((d) => (
              <>
                <Checkbox />
                <span className="col-span-2 flex items-center">
                  {(d.track_name as string).split(" - ")[0].split(" (")[0]}
                </span>
                <span className="flex items-center">{(d.artist_name as string).split(" (")[0]}</span>
                <span>{}</span>
              </>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
