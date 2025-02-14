import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-light-text bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-custom-gray-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-text",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
