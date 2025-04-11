import { JsonValue } from "@prisma/client/runtime/library";

export interface YtmusicInfoType {
  video_id: string;
  track_name: string;
  artist_ids: JsonValue;
  artist_names: JsonValue;
  author: string;
  album_id: string;
  album_name: string;
  release_year?: string;
  tags?: JsonValue;
  lyrics_id?: string;
  lyrics?: string;
}
