import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-shadcn-border border-shadcn-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-shadcn-ring focus-visible:ring-3 focus-visible:ring-shadcn-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-shadcn-input/50 disabled:opacity-50 aria-invalid:border-shadcn-destructive aria-invalid:ring-3 aria-invalid:ring-shadcn-destructive/20 md:text-sm dark:bg-shadcn-input/30 dark:disabled:bg-shadcn-input/80 dark:aria-invalid:border-shadcn-destructive/50 dark:aria-invalid:ring-shadcn-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
