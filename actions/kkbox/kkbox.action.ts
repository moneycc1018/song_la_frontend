"use server";

import { KkboxInfo } from "@/types/kkbox-info.type";

export async function addInfo(paramsObj: KkboxInfo) {
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
        data: data.map((d: KkboxInfo) => d.track_name.split(" - ")[0].split(" (")[0]),
      };
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

    const response = await fetch(baseUrl + `/kkbox/info/delete?value=${trackIdsStr}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      return {
        status: 200,
        message: "success",
        data: data.map((d: KkboxInfo) => d.track_name.split(" - ")[0].split(" (")[0]),
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to delete",
    };
  }
}
