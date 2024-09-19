import { cn } from "@/utils/utils";
import { cva } from "class-variance-authority";
import React from "react";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "default" | "outline";
};

const buttonVariants = cva(
  "w-auto py-3 px-5 rounded-md disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-[#3B82F6] text-white outline-[#307dfa]",
        outline: "border border-[#666D80] text-[#666D80]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, children, ...args }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, className }))}
        {...args}
      >
        {children}
      </button>
    );
  }
);

export default Button;
