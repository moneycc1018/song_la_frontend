import { JsonValue } from "@prisma/client/runtime/library";

export interface KkboxInfoType {
  track_id: string;
  track_name: string;
  artist_id: string;
  artist_name: string;
  album_id: string;
  album_name: string;
  release_date?: string;
  tags?: JsonValue;
}
