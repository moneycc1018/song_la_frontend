"use server";

import { KkboxInfoType } from "@/types/kkbox-info.type";

export async function addInfo(paramsObj: KkboxInfoType) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + "/kkbox/info/add", {
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
        data: data.map((d: KkboxInfoType) => d.track_name.split(" - ")[0].split(" (")[0]),
      };
    } else {
      throw new Error(`kkbox addInfo response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to add",
    };
  }
}

export async function deleteInfo(trackIdsStr: string) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + `/kkbox/info/delete?track_ids_str=${trackIdsStr}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      return {
        status: 200,
        message: "success",
        data: data.map((d: KkboxInfoType) => d.track_name.split(" - ")[0].split(" (")[0]),
      };
    } else {
      throw new Error(`kkbox deleteInfo response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to delete",
    };
  }
}

export async function updateTags(trackId: string, paramsObj: { tags: Array<number> }) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + `/kkbox/tags/update?track_id=${trackId}`, {
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
      throw new Error(`kkbox updateTags response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to update",
    };
  }
}
