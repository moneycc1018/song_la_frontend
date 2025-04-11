import { JsonValue } from "@prisma/client/runtime/library";

export interface DisplayedTrackType {
  video_id?: string;
  track_id?: string;
  track_name: string;
  artist_names?: JsonValue;
  album_name: string;
  tags?: JsonValue;
  artist_name: string;
}

export interface TagType {
  id: number;
  tag_name: string;
  deprecated: boolean;
}
