import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans text-sm font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-mist disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "bg-mist text-canvas hover:bg-paper",
        outline:
          "bg-transparent text-stone shadow-[0_0_0_1px_#2a2a2a] hover:text-mist hover:shadow-[0_0_0_1px_#3a3a3a]",
        ghost: "bg-transparent text-stone hover:text-mist",
      },
      size: {
        default: "h-8 rounded-md px-3",
        pill: "h-7 rounded-full px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
