"use client";

import { useAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TagType } from "@/types/index.type";

import { cn } from "@/lib/utils";
import { selectedTagsAtom } from "@/store/selected-item-store";

interface TagSelectCardProps {
  data: Array<TagType>;
}

export function TagSelectCard(props: TagSelectCardProps) {
  const { data } = props;
  const [selectedTags, setSelectedTags] = useAtom(selectedTagsAtom);

  // 標籤 mapping
  const tagMapping: Record<number, string> = data
    .filter((t) => !t.deprecated)
    .reduce((acc, tag) => ({ ...acc, [tag.id]: tag.tag_name }), {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Tags</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-2">
        <Button
          variant={"outline"}
          className="w-fit min-w-24 self-end border-custom-red-700 p-0 text-custom-red-700 hover:bg-custom-red-700 dark:border-custom-red-300 dark:text-custom-red-300 dark:hover:bg-custom-red-300"
          onClick={() => setSelectedTags([])}
        >
          Remove all
        </Button>
        <div className="flex flex-wrap gap-2">
          {data.map((t) => (
            <button
              key={`tag-${t.id}`}
              className={cn(
                "flex w-fit select-none items-center rounded-full border border-primary px-2.5 py-0.5 font-semibold dark:border-dark-primary",
                selectedTags.some((st) => st.id === t.id)
                  ? "bg-primary text-dark-text dark:bg-dark-primary dark:text-light-text"
                  : "text-primary dark:text-dark-primary",
              )}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.some((st) => st.id === t.id) ? prev.filter((st) => st.id !== t.id) : [...prev, t],
                )
              }
            >
              <span>{tagMapping[t.id]}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
