'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileUp, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CreateAgentPage() {
  const [agent, setAgent] = useState({
    name: '',
    description: '',
    price: '',
    permissions: {
      publicAccess: true,
      allowDownload: false,
      allowModification: false,
    },
    dataFiles: [] as File[],
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: any) => {
    setAgent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePermissionChange = (field: keyof typeof agent.permissions) => {
    setAgent(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [field]: !prev.permissions[field]
      }
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAgent(prev => ({
        ...prev,
        dataFiles: [...Array.from(e.target.files as FileList)]
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Here you would typically upload the files and create the agent
      console.log('Creating agent:', agent)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message or redirect
    } catch (error) {
      console.error('Error creating agent:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Agent</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide the basic details about your agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                placeholder="Enter agent name"
                value={agent.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what your agent does..."
                value={agent.description}
                onChange={(e) => handleChange('description', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Upload</CardTitle>
            <CardDescription>
              Upload the data files your agent will use
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="data">Data Files</Label>
              <Input
                id="data"
                type="file"
                multiple
                accept=".pdf,.txt,.csv,.json"
                onChange={handleFileChange}
                required
              />
            </div>
            
            {agent.dataFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Files:</Label>
                <ul className="text-sm text-gray-500">
                  {agent.dataFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Make sure your data files don't contain any sensitive or personal information.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
            <CardDescription>
              Set the price for using your agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={agent.price}
                onChange={(e) => handleChange('price', e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissions</CardTitle>
            <CardDescription>
              Configure how others can interact with your agent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public-access">Public Access</Label>
                <p className="text-sm text-gray-500">
                  Make your agent available to everyone
                </p>
              </div>
              <Switch
                id="public-access"
                checked={agent.permissions.publicAccess}
                onCheckedChange={() => handlePermissionChange('publicAccess')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-download">Allow Download</Label>
                <p className="text-sm text-gray-500">
                  Let users download the agent's data
                </p>
              </div>
              <Switch
                id="allow-download"
                checked={agent.permissions.allowDownload}
                onCheckedChange={() => handlePermissionChange('allowDownload')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-modification">Allow Modification</Label>
                <p className="text-sm text-gray-500">
                  Let users modify the agent's behavior
                </p>
              </div>
              <Switch
                id="allow-modification"
                checked={agent.permissions.allowModification}
                onCheckedChange={() => handlePermissionChange('allowModification')}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            className="bg-[#E30B5D] hover:bg-[#C00A4E] text-white"
            disabled={loading}
          >
            {loading ? 'Creating Agent...' : 'Create Agent'}
          </Button>
        </div>
      </form>
    </div>
  )
}

