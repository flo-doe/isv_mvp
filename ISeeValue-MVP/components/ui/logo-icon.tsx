export default function LogoIcon({ className }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {/* Main black circle */}
      <div className="w-full h-full bg-black rounded-full">
        {/* Small white circle in top right */}
        <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-white rounded-full" />
      </div>
    </div>
  )
}

