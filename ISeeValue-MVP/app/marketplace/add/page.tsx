'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddListingPage() {
  const [listing, setListing] = useState({
    title: '',
    type: '',
    category: '',
    impactAreas: [],
    description: '',
    status: 'Open',
    skillsRequired: [],
    budget: '',
    timeline: '',
    geographicFocus: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setListing({ ...listing, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (field: string, value: string) => {
    setListing({ ...listing, [field]: value })
  }

  const handleMultiSelect = (field: string, value: string) => {
    setListing(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the listing data to your backend
    console.log('Listing submitted:', listing)
    // Redirect to marketplace or show success message
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Add New Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Listing Title*</Label>
          <Input id="title" name="title" value={listing.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="type">Listing Type*</Label>
          <Select onValueChange={(value) => handleSelectChange('type', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select listing type" />
            </SelectTrigger>
            <SelectContent>
              {['Offer', 'Request for Proposal', 'Bounty'].map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category*</Label>
          <Select onValueChange={(value) => handleSelectChange('category', value)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {['Funding', 'Partnership', 'Research', 'Training', 'Technical Support', 'Resource Sharing'].map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Impact Areas</Label>
          <div className="grid grid-cols-2 gap-2">
            {['No Poverty', 'Zero Hunger', 'Good Health and Well-being', 'Quality Education', 'Gender Equality', 'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Climate Action'].map((area) => (
              <div key={area} className="flex items-center">
                <Checkbox
                  id={`impact-${area}`}
                  checked={listing.impactAreas.includes(area)}
                  onCheckedChange={() => handleMultiSelect('impactAreas', area)}
                />
                <label htmlFor={`impact-${area}`} className="ml-2 text-sm">{area}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description*</Label>
          <Textarea id="description" name="description" value={listing.description} onChange={handleChange} required />
        </div>

        <div>
          <Label>Skills Required</Label>
          <div className="grid grid-cols-2 gap-2">
            {['Project Management', 'Fundraising', 'Technical Writing', 'Data Analysis', 'Community Engagement', 'Software Development'].map((skill) => (
              <div key={skill} className="flex items-center">
                <Checkbox
                  id={`skill-${skill}`}
                  checked={listing.skillsRequired.includes(skill)}
                  onCheckedChange={() => handleMultiSelect('skillsRequired', skill)}
                />
                <label htmlFor={`skill-${skill}`} className="ml-2 text-sm">{skill}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="budget">Budget/Resources Available</Label>
          <Input id="budget" name="budget" value={listing.budget} onChange={handleChange} placeholder="e.g., $50,000 - $100,000" />
        </div>

        <div>
          <Label htmlFor="timeline">Timeline</Label>
          <Input id="timeline" name="timeline" value={listing.timeline} onChange={handleChange} placeholder="e.g., 6 months" />
        </div>

        <div>
          <Label htmlFor="geographicFocus">Geographic Focus</Label>
          <Input id="geographicFocus" name="geographicFocus" value={listing.geographicFocus} onChange={handleChange} placeholder="e.g., Global, Southeast Asia, etc." />
        </div>

        <Button type="submit" className="bg-[#E30B5D] hover:bg-[#C00A4E] text-white">Create Listing</Button>
      </form>
    </div>
  )
}

