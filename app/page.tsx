import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function IndexPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
      <Button asChild>
        <Link href={"/main"}>PLAY</Link>
      </Button>
    </div>
  );
}
