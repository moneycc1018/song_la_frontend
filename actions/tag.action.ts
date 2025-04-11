"use server";

export async function addTag(paramsObj: { tag_name: string }) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + "/tag/add", {
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
        data: data.tag_name,
      };
    } else {
      throw new Error(`addTag response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to add",
    };
  }
}

export async function deleteTag(tagId: number) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + `/tag/delete?id=${tagId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    if (response.ok) {
      const data = await response.json();

      return {
        status: 200,
        message: "success",
        data: data.tag_name,
      };
    } else {
      throw new Error(`deleteTag response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to delete",
    };
  }
}

export async function updateTag(tagId: number, paramsObj: { tag_name: string }) {
  try {
    const baseUrl = process.env.API_URL;

    const response = await fetch(baseUrl + `/tag/update?id=${tagId}`, {
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
        data: data.tag_name,
      };
    } else {
      throw new Error(`updateTag response was not ok, ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "failed to update",
    };
  }
}
