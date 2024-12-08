import { cn } from "@/lib/utils"

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  variant?: 'default' | 'large';
}

export default function Logo({ collapsed = false, className, variant = 'default' }: LogoProps) {
  const isLarge = variant === 'large'
  
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "transition-transform duration-200",
          collapsed ? "w-6 h-6" : isLarge ? "w-32 h-32" : "w-8 h-8"
        )}
      >
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <circle cx="18" cy="6" r="3" fill="white" />
      </svg>
      {!collapsed && (
        <span className={cn(
          "font-bold",
          isLarge ? "mt-4 text-3xl" : "mt-2 text-lg"
        )}>
          iseevalue
        </span>
      )}
    </div>
  )
}

