'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Star, PlusCircle, Edit2, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

type Listing = {
  id: number;
  title: string;
  type: string;
  category: string;
  impactAreas: string[];
  description: string;
  status: string;
  skillsRequired: string[];
  budget: string;
  timeline: string;
  geographicFocus: string;
  rating: number;
}

export default function Marketplace() {
  const [listings, setListings] = useState<Listing[]>([
    {
      id: 1,
      title: "Sustainable Agriculture Initiative",
      type: "Partnership",
      category: "Agriculture",
      impactAreas: ["No Poverty", "Zero Hunger"],
      description: "Looking for partners to implement sustainable farming practices in developing regions.",
      status: "Open",
      skillsRequired: ["Agriculture", "Project Management"],
      budget: "$50,000 - $100,000",
      timeline: "6 months",
      geographicFocus: "Sub-Saharan Africa",
      rating: 4.5
    },
    {
      id: 2,
      title: 'Solar Energy Project',
      type: 'Partnership',
      category: 'Renewable Energy',
      impactAreas: ['Affordable and Clean Energy', 'Climate Action'],
      description: 'Developing a solar energy project in a rural community.',
      status: 'Open',
      skillsRequired: ['Engineering', 'Project Management'],
      budget: '$200,000 - $300,000',
      timeline: '12 months',
      geographicFocus: 'Latin America',
      rating: 4.0
    },
    {
      id: 3,
      title: 'Ocean Cleanup Campaign',
      type: 'Volunteer',
      category: 'Environment',
      impactAreas: ['Life Below Water', 'Climate Action'],
      description: 'Join our team to clean up ocean plastic pollution.',
      status: 'Open',
      skillsRequired: ['Environmental Science', 'Community Engagement'],
      budget: 'Volunteer-based',
      timeline: 'Ongoing',
      geographicFocus: 'Global',
      rating: 4.8
    },
    {
      id: 4,
      title: 'AI for Climate Change',
      type: 'Research',
      category: 'Technology',
      impactAreas: ['Climate Action', 'Industry, Innovation and Infrastructure'],
      description: 'Researching AI solutions for climate change mitigation.',
      status: 'Open',
      skillsRequired: ['Artificial Intelligence', 'Data Science'],
      budget: '$100,000 - $200,000',
      timeline: '24 months',
      geographicFocus: 'Global',
      rating: 4.2
    },
    {
      id: 5,
      title: 'Microfinance for Women Entrepreneurs',
      type: 'Funding',
      category: 'Finance',
      impactAreas: ['No Poverty', 'Gender Equality'],
      description: 'Providing microfinance loans to women entrepreneurs.',
      status: 'Open',
      skillsRequired: ['Finance', 'Business Development'],
      budget: '$50,000 - $100,000',
      timeline: '12 months',
      geographicFocus: 'South Asia',
      rating: 4.7
    },
    {
      id: 6,
      title: 'Reforestation Project',
      type: 'Partnership',
      category: 'Environment',
      impactAreas: ['Life on Land', 'Climate Action'],
      description: 'Planting trees to restore forests and combat climate change.',
      status: 'Open',
      skillsRequired: ['Environmental Science', 'Community Engagement'],
      budget: '$150,000 - $250,000',
      timeline: '18 months',
      geographicFocus: 'Southeast Asia',
      rating: 4.5
    },
  ])

  const [filters, setFilters] = useState({
    category: '',
    type: '',
    status: '',
    impactArea: '',
  })

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null)

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const filteredListings = listings.filter(listing => 
    (!filters.category || listing.category === filters.category) &&
    (!filters.type || listing.type === filters.type) &&
    (!filters.status || listing.status === filters.status) &&
    (!filters.impactArea || listing.impactAreas.includes(filters.impactArea))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Marketplace</h1>
        <div className="space-x-2">
          <Link href="/marketplace/add">
            <Button className="bg-[#E30B5D] hover:bg-[#824579] text-white">
              <PlusCircle className="mr-2" size={20} />
              Add Listing
            </Button>
          </Link>
          <Link href="/marketplace/create-agent">
            <Button className="bg-[#528058] hover:bg-[#708052] text-white">
              <PlusCircle className="mr-2" size={20} />
              Create Agent
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Search listings..."
          className="pl-10 pr-4 py-2 w-full md:w-64 border-[#000000]"
        />
        <Search className="absolute left-3 top-2.5 text-[#708052]" size={20} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <FilterSelect label="Category" options={['Funding', 'Partnership', 'Research', 'Training', 'Technical Support', 'Resource Sharing']} onChange={(value) => handleFilterChange('category', value)} />
        <FilterSelect label="Listing Type" options={['Offer', 'Request for Proposal', 'Bounty']} onChange={(value) => handleFilterChange('type', value)} />
        <FilterSelect label="Status" options={['Open', 'In Progress', 'Closed']} onChange={(value) => handleFilterChange('status', value)} />
        <FilterSelect label="Impact Area" options={['No Poverty', 'Zero Hunger', 'Good Health and Well-being', 'Quality Education', 'Gender Equality', 'Clean Water and Sanitation', 'Affordable and Clean Energy', 'Decent Work and Economic Growth', 'Industry, Innovation and Infrastructure', 'Reduced Inequalities', 'Sustainable Cities and Communities', 'Responsible Consumption and Production', 'Climate Action', 'Life Below Water', 'Life on Land', 'Peace, Justice and Strong Institutions', 'Partnerships for the Goals']} onChange={(value) => handleFilterChange('impactArea', value)} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} onView={() => setSelectedListing(listing)} />
        ))}
      </div>

      <Dialog open={!!selectedListing} onOpenChange={() => setSelectedListing(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedListing?.title}</DialogTitle>
            <DialogDescription>
              Listing Details
            </DialogDescription>
          </DialogHeader>
          {selectedListing && (
            <ScrollArea className="mt-4 h-[60vh]">
              <div className="space-y-4">
                <div>
                  <Label className="font-bold">Type</Label>
                  <p>{selectedListing.type}</p>
                </div>
                <div>
                  <Label className="font-bold">Category</Label>
                  <p>{selectedListing.category}</p>
                </div>
                <div>
                  <Label className="font-bold">Impact Areas</Label>
                  <p>{selectedListing.impactAreas.join(', ')}</p>
                </div>
                <div>
                  <Label className="font-bold">Description</Label>
                  <p>{selectedListing.description}</p>
                </div>
                <div>
                  <Label className="font-bold">Status</Label>
                  <p>{selectedListing.status}</p>
                </div>
                <div>
                  <Label className="font-bold">Skills Required</Label>
                  <p>{selectedListing.skillsRequired.join(', ')}</p>
                </div>
                <div>
                  <Label className="font-bold">Budget</Label>
                  <p>{selectedListing.budget}</p>
                </div>
                <div>
                  <Label className="font-bold">Timeline</Label>
                  <p>{selectedListing.timeline}</p>
                </div>
                <div>
                  <Label className="font-bold">Geographic Focus</Label>
                  <p>{selectedListing.geographicFocus}</p>
                </div>
                <div>
                  <Label className="font-bold">Rating</Label>
                  <div className="flex items-center">
                    <Star className="text-[#b6ff24] mr-1" size={16} />
                    <span>{selectedListing.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FilterSelect({ label, options, onChange }: { label: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <div>
      <Label>{label}</Label>
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>{option}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ListingCard({ listing, onView }: { listing: Listing; onView: () => void }) {
  return (
    <div className="border border-[#708052] rounded-lg p-6 flex flex-col h-full relative">
      <Button
        className="absolute top-2 right-2 bg-transparent hover:bg-[#E30B5D] text-[#E30B5D] hover:text-white"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Simulate edit functionality
          alert(`Editing listing: ${listing.title}`);
        }}
      >
        <Edit2 size={18} />
      </Button>
      <h3 className="text-xl font-bold mb-2">{listing.title}</h3>
      <p className="text-[#708052] mb-2">{listing.type}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {listing.impactAreas.map((area, index) => (
          <span key={index} className="bg-[#b6ff24] text-[#000000] text-xs px-2 py-1 rounded-full">
            {area}
          </span>
        ))}
      </div>
      <p className="text-sm text-[#528058] mb-4 flex-grow">{listing.description}</p>
      <div className="flex justify-between items-center mt-auto">
        <span className="inline-block bg-[#E30B5D] text-white rounded-full px-3 py-1 text-sm font-semibold">
          {listing.status}
        </span>
        <div className="flex items-center">
          <Star className="text-[#b6ff24] mr-1" size={16} />
          <span className="text-sm font-semibold">{listing.rating.toFixed(1)}</span>
        </div>
      </div>
      <Button onClick={onView} className="mt-4 w-full bg-[#824579] hover:bg-[#528058] text-white">View Details</Button>
    </div>
  )
}

