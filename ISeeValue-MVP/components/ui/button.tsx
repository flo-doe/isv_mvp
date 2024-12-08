import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#E30B5D] text-white hover:bg-[#824579]",
        destructive:
          "bg-[#E30B5D] text-white hover:bg-[#824579]",
        outline:
          "border border-input bg-background hover:bg-[#24ff45] hover:text-white",
        secondary:
          "bg-[#824579] text-white hover:bg-[#708052]",
        ghost: "hover:bg-[#b6ff24] hover:text-black",
        link: "text-[#E30B5D] underline-offset-4 hover:underline",
        green: "bg-[#24ff45] text-black hover:bg-[#528058] hover:text-white",
        lime: "bg-[#b6ff24] text-black hover:bg-[#708052] hover:text-white",
        purple: "bg-[#824579] text-white hover:bg-[#528058]",
        darkGreen: "bg-[#528058] text-white hover:bg-[#708052]",
        olive: "bg-[#708052] text-white hover:bg-[#528058]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-xl px-3",
        lg: "h-11 rounded-2xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

