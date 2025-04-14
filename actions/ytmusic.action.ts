"use server";

import { YtmusicInfoType } from "@/types/ytmusic-info.type";

export async function addInfo(paramsObj: YtmusicInfoType) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + "/ytmusic/info/add", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsObj),
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      return {
        status: 200,
        message: "success",
        data: data.map((d: YtmusicInfoType) => d.track_name.split(" - ")[0].split(" (")[0]),
      };
    } else {
      throw new Error(`ytmusic addInfo response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to add",
    };
  }
}

export async function deleteInfo(videoIdsStr: string) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + `/ytmusic/info/delete?value=${videoIdsStr}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      return {
        status: 200,
        message: "success",
        data: data.map((d: YtmusicInfoType) => d.track_name.split(" - ")[0].split(" (")[0]),
      };
    } else {
      throw new Error(`ytmusic addInfo response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to delete",
    };
  }
}

export async function updateTags(videoId: string, paramsObj: { tags: Array<number> }) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + `/ytmusic/tags/update?video_id=${videoId}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paramsObj),
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      return {
        status: 200,
        message: "success",
        data: data.track_name.split(" - ")[0].split(" (")[0],
      };
    } else {
      throw new Error(`ytmusic updateTags response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to update",
    };
  }
}
