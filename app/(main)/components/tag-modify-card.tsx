"use client";

import { useEffect, useRef, useState } from "react";

import { useSetAtom } from "jotai";
import { XIcon } from "lucide-react";

import { addTag, deleteTag, updateTag } from "@/actions/tag.action";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { TagType } from "@/types/index.type";

import { cn } from "@/lib/utils";
import { tagModifyCardHeightAtom } from "@/store";

interface TagModifyCardProps {
  data: Array<TagType>;
}

export default function TagModifyCard(props: TagModifyCardProps) {
  const { data } = props;
  const [tagName, setTagName] = useState("");
  const [selectedTagId, setSelectedTagId] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  const setHeight = useSetAtom(tagModifyCardHeightAtom);

  async function clickAddBtn() {
    if (tagName.trim() !== "") {
      const res = await addTag({ tag_name: tagName });

      if (res?.status === 200) {
        alert(`${res.data} added successfully!`);
        window.location.reload();
      }
    }
  }

  async function clickDeleteBtn(tagId: number) {
    const res = await deleteTag(tagId);

    if (res?.status === 200) {
      alert(`${res.data} deleted successfully!`);
      window.location.reload();
    }
  }

  async function clickUpdateBtn() {
    if (tagName.trim() !== "") {
      const res = await updateTag(selectedTagId!, { tag_name: tagName });

      if (res?.status === 200) {
        alert(`${res.data} updated successfully!`);
        window.location.reload();
      }
    }
  }

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  }, []);

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle>Modify Tag</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <Input placeholder="Tag Name" value={tagName} onChange={(e) => setTagName(e.target.value)} />
          <Button
            variant={"outline"}
            className="min-w-24 p-0"
            onClick={clickAddBtn}
            disabled={selectedTagId !== undefined}
          >
            Add
          </Button>
          <Button
            variant={"outline"}
            className="min-w-24 p-0"
            onClick={clickUpdateBtn}
            disabled={selectedTagId === undefined}
          >
            Update
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.length > 0 &&
            data.map((t: TagType) => (
              <div
                key={`tag-${t.id}`}
                className={cn(
                  "flex w-fit select-none items-center gap-1 rounded-full border border-primary px-2.5 py-0.5 font-semibold dark:border-dark-primary",
                  selectedTagId === t.id
                    ? "bg-primary text-dark-text dark:bg-dark-primary dark:text-light-text"
                    : "text-primary dark:text-dark-primary",
                )}
              >
                <button
                  className={
                    selectedTagId === t.id ? "text-custom-red-300 dark:text-custom-red-700" : "text-custom-red-300"
                  }
                  onClick={() => clickDeleteBtn(t.id)}
                >
                  <XIcon size={20} />
                </button>
                <button
                  onClick={() => {
                    if (selectedTagId === t.id) {
                      setSelectedTagId(undefined);
                      setTagName("");
                    } else {
                      setSelectedTagId(t.id);
                      setTagName(t.tag_name);
                    }
                  }}
                >
                  {t.tag_name}
                </button>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
