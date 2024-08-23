import Button, { ButtonProps } from "@/components/Button";
import { cn } from "@/utils";

export const CreateButton = ({
  children,
  isActive,
  className,
  ...props
}: ButtonProps & { isActive: boolean }) => {
  return (
    <Button className={cn([isActive && "bg-red-700", className])} {...props}>
      {children}
    </Button>
  );
};
