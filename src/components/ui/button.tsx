import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-md font-mono uppercase tracking-[0.12em] transition-colors duration-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent/90",
        secondary:
          "border border-border-strong text-foreground hover:border-foreground/40",
        ghost: "text-muted-foreground hover:text-foreground",
        subtle: "bg-foreground text-background hover:bg-foreground/90",
      },
      size: {
        sm: "h-9 px-3.5 text-[0.62rem] sm:px-4 sm:text-[0.66rem]",
        md: "h-10 px-4 text-[0.66rem] sm:h-11 sm:px-5 sm:text-[0.72rem]",
        lg: "h-10 px-4 text-[0.66rem] sm:h-11 sm:px-5 sm:text-[0.72rem] md:h-12 md:px-7 md:text-[0.78rem]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

type LinkButtonProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

export function LinkButton({
  className,
  variant,
  size,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
