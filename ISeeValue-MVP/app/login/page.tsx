'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from '@/components/ui/logo'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { GradientBackground } from '@/components/ui/gradient-background'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const success = await login(email, password)
      if (success) {
        router.push('/dashboard')
      } else {
        // Handle login failure (e.g., show an error message)
        console.error('Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <GradientBackground>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Logo className="mx-auto w-16 h-16" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </GradientBackground>
  )
}

