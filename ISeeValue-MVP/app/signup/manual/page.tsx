'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Logo from '@/components/ui/logo'
import { GradientBackground } from '@/components/ui/gradient-background'

const steps = [
  { id: 'details', title: 'Company Details' },
  { id: 'description', title: 'Company Description' },
  { id: 'impact', title: 'Impact Goals' },
]

const impactGoals = [
  'Carbon Neutrality', 'Zero Waste', 'Renewable Energy', 'Water Conservation',
  'Biodiversity', 'Social Equity', 'Circular Economy', 'Sustainable Agriculture',
  'Clean Transportation', 'Green Building', 'Education', 'Healthcare',
  'Poverty Reduction', 'Gender Equality', 'Clean Water and Sanitation'
]

export default function ManualSignup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    companyName: '',
    companySize: '',
    orgType: '',
    industry: '',
    sector: '',
    companyDescription: '',
    impactGoals: [] as string[],
  })
  const { login } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleImpactGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      impactGoals: prev.impactGoals.includes(goal)
        ? prev.impactGoals.filter(g => g !== goal)
        : [...prev.impactGoals, goal]
    }))
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      // In a real app, you'd make an API call to create the company profile here
      console.log('Submitting company profile:', formData)
      
      // Simulate successful signup
      await login(formData.companyName, 'password') // Use a proper authentication method in a real app
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup failed:', error)
    }
  }

  return (
    <GradientBackground>
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Logo className="mx-auto w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
          <p className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentStep === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select onValueChange={(value) => handleSelectChange('companySize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orgType">Organization Type</Label>
                  <Select onValueChange={(value) => handleSelectChange('orgType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ngo">NGO</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="sme">SME</SelectItem>
                      <SelectItem value="startup">Start-Up</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select onValueChange={(value) => handleSelectChange('industry', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="energy">Energy</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector (Optional)</Label>
                  <Input id="sector" name="sector" value={formData.sector} onChange={handleChange} placeholder="e.g., Renewable Energy, Fintech, etc." />
                </div>
              </>
            )}
            {currentStep === 1 && (
              <div className="space-y-2">
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  placeholder="Provide a brief description of your company, its mission, and its primary activities."
                  rows={6}
                  required
                />
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-2">
                <Label>Impact Goals (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2">
                  {impactGoals.map((goal) => (
                    <Button
                      key={goal}
                      variant={formData.impactGoals.includes(goal) ? "default" : "outline"}
                      onClick={() => handleImpactGoalToggle(goal)}
                      className="text-sm"
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-between">
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)} variant="outline">
                Previous
              </Button>
            )}
            <Button onClick={handleNext} className={currentStep === 0 ? "w-full" : "ml-auto"}>
              {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </GradientBackground>
  )
}

