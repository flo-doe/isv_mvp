export function GradientBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 min-h-screen bg-gradient-to-br from-[#E30B5D]/80 via-[#824579]/70 to-[#a76d9f]/60 flex items-center justify-center">
      {children}
    </div>
  )
}

