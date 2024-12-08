'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit2 } from 'lucide-react'
import { Input } from "@/components/ui/input"
import OrganizationTab from './OrganizationTab'
import ImpactTab from './ImpactTab'
import ListingsTab from './ListingsTab'
import ProjectsTab from './ProjectsTab'
import DataTab from './DataTab'
import { LoadingScreen } from '../components/LoadingScreen'

const tabs = [
  { id: 'organization', label: 'Organization' },
  { id: 'impact', label: 'Impact' },
  { id: 'listings', label: 'Listings' },
  { id: 'projects', label: 'Projects' },
  { id: 'data', label: 'Data' },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string | null>('organization')
  const [isEditMode, setIsEditMode] = useState(false)
  const [profile, setProfile] = useState({
    fullName: 'Eco Solutions Inc.',
    shortDescription: 'Innovative sustainable technology solutions',
    description: 'Eco Solutions Inc. is a leading provider of sustainable technology solutions, dedicated to accelerating the global transition to clean energy.',
    vision: 'A world powered by clean, renewable energy',
    mission: 'To accelerate the global transition to sustainable energy through innovative technology and collaborative partnerships',
    email: 'contact@ecosolutions.com',
    profilePicture: '/placeholder.svg?height=200&width=200',
    companyName: 'Eco Solutions Inc.',
    entityType: 'Corporation',
    location: { country: 'United States', city: 'San Francisco' },
    headquartersLocation: 'San Francisco, California, USA',
    organizationType: 'Corporate',
    industrySectors: ['Renewable Energy', 'Technology', 'Environmental Services'],
    solutionsAndServices: ['Solar Panel Systems', 'Energy Storage Solutions', 'Smart Grid Technologies', 'Sustainability Consulting'],
    employeeCount: '501-1000',
    linkedinOrWebsite: 'https://www.ecosolutions.com',
    standardsAndCertifications: ['ISO 14001:2015', 'B Corp Certified', 'LEED Accredited'],
    esgDescription: {
      environmental: 'We are committed to reducing carbon emissions through our products and operations, aiming for net-zero emissions by 2030.',
      social: 'We prioritize diversity, equity, and inclusion in our workforce and support community-based clean energy initiatives in underserved areas.',
      governance: 'Our board maintains a strong commitment to sustainability, with dedicated committees overseeing ESG performance and ethical business practices.'
    },
    visibility: {
      fullName: true,
      shortDescription: true,
      description: true,
      vision: true,
      mission: true,
      email: true,
      companyName: true,
      entityType: true,
      location: true,
      headquartersLocation: true,
      organizationType: true,
      industrySectors: true,
      solutionsAndServices: true,
      employeeCount: true,
      linkedinOrWebsite: true,
      standardsAndCertifications: true,
      esgDescription: true,
    }
  })

  const handleEdit = (field: string, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header Card */}
      <Card className="mb-8">
        <CardContent className="p-6 relative">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute top-4 right-4"
            onClick={toggleEditMode}
          >
            <Edit2 size={16} className="mr-2" />
            {isEditMode ? 'Save Profile' : 'Edit Profile'}
          </Button>
          <div className="flex items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-grow">
              <h1 className="text-3xl font-bold mb-4">{profile.fullName}</h1>
              {isEditMode ? (
                <Input
                  value={profile.shortDescription}
                  onChange={(e) => handleEdit('shortDescription', e.target.value)}
                  className="text-lg text-gray-600"
                />
              ) : (
                <p className="text-lg text-gray-600">
                  {profile.shortDescription}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Container */}
      <div className="relative">
        <div className="flex w-full">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center h-12 px-6 focus:outline-none
                ${activeTab === tab.id 
                  ? 'bg-white text-gray-900 border-t-2 border-l-2 border-r-2 border-black rounded-t-xl relative z-10' 
                  : 'bg-gray-50 text-gray-600 border-2 border-black hover:bg-gray-100 rounded-t-xl'}
                ${index === 0 ? '' : '-ml-[2px]'}
              `}
            >
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white pt-6 px-8 pb-8 border-2 border-t-0 border-black rounded-b-xl relative -mt-[2px]"
        >
          <div className="min-h-[400px]">
            {activeTab === 'organization' && (
              <OrganizationTab profile={profile} onEdit={handleEdit} isEditMode={isEditMode} />
            )}
            {activeTab === 'impact' && (
              <ImpactTab profile={profile} onEdit={handleEdit} isEditMode={isEditMode} />
            )}
            {activeTab === 'listings' && (
              <ListingsTab />
            )}
            {activeTab === 'projects' && (
              <ProjectsTab />
            )}
            {activeTab === 'data' && (
              <DataTab />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

