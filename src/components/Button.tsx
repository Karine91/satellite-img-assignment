import React from "react";

import { cn } from "@/utils";

export type ButtonProps = React.ComponentPropsWithoutRef<"button">;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "p-2 bg-blue-900 text-white min-w-12 rounded-md disabled:bg-gray-500",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
