import { Button } from "@/components/ui/button"
import Logo from '@/components/ui/logo'
import Link from 'next/link'
import { GradientBackground } from '@/components/ui/gradient-background'

export default function Home() {
  return (
    <GradientBackground>
      <div className="bg-white px-8 py-12 rounded-lg shadow-lg w-[480px]">
        <Logo className="mx-auto mb-12" variant="large" />
        <div className="space-y-6">
          <Link href="/login">
            <Button size="lg" className="w-full mb-4">Login</Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline" className="w-full">Sign Up</Button>
          </Link>
        </div>
      </div>
    </GradientBackground>
  )
}

