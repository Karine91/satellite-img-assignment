import React from "react";

const Button = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"button">) => {
  return (
    <button
      className="p-2 bg-blue-900 text-white min-w-12 rounded-md"
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
