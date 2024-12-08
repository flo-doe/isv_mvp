'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from '@/components/ui/logo'
import { FileUploader } from './FileUploader'
import { GradientBackground } from '@/components/ui/gradient-background'
import { PasswordStrengthMeter } from './PasswordStrengthMeter'
import { LoadingScreen } from '../components/LoadingScreen'

export default function SignupPage() {
  const [step, setStep] = useState<'initial' | 'method' | 'quickstart' | null>('initial')
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords don't match")
      return
    }
    setStep('method')
  }

  const handleQuickStart = async (file: File) => {
    setIsLoading(true)
    console.log('File uploaded:', file.name)
    await login(userData.email, userData.password)
    setTimeout(() => {
      router.push('/dashboard')
    }, 5000)
  }

  const handleManualSetup = () => {
    router.push('/signup/manual')
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      {!isLoading && (
        <GradientBackground>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Logo className="mx-auto w-16 h-16" />
            </CardHeader>
            <CardContent className="space-y-4">
              {step === 'initial' && (
                <form onSubmit={handleInitialSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      required
                    />
                    <PasswordStrengthMeter password={userData.password} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={userData.confirmPassword}
                      onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Next</Button>
                </form>
              )}
              {step === 'method' && (
                <>
                  <Button onClick={() => setStep('quickstart')} className="w-full">
                    Quick Start
                  </Button>
                  <Button onClick={handleManualSetup} variant="outline" className="w-full">
                    Manual Setup
                  </Button>
                </>
              )}
              {step === 'quickstart' && (
                <FileUploader onFileUpload={handleQuickStart} />
              )}
            </CardContent>
          </Card>
        </GradientBackground>
      )}
    </>
  )
}

