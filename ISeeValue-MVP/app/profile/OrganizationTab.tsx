import { useState } from 'react'
import { InfoItem } from './InfoItem'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, X } from 'lucide-react'

export default function OrganizationTab({ profile, onEdit, isEditMode }) {
  const [customFields, setCustomFields] = useState(profile.customFields || [])

  const addCustomField = () => {
    setCustomFields([...customFields, { label: '', value: '' }])
  }

  const updateCustomField = (index, key, value) => {
    const updatedFields = [...customFields]
    updatedFields[index][key] = value
    setCustomFields(updatedFields)
    onEdit('customFields', updatedFields)
  }

  const removeCustomField = (index) => {
    const updatedFields = customFields.filter((_, i) => i !== index)
    setCustomFields(updatedFields)
    onEdit('customFields', updatedFields)
  }

  return (
    <div className="space-y-4">
      <InfoItem label="Description" value={profile.description} field="description" onEdit={onEdit} visibility={profile.visibility.description} isEditMode={isEditMode} />
      <InfoItem label="Vision" value={profile.vision} field="vision" onEdit={onEdit} visibility={profile.visibility.vision} isEditMode={isEditMode} />
      <InfoItem label="Mission" value={profile.mission} field="mission" onEdit={onEdit} visibility={profile.visibility.mission} isEditMode={isEditMode} />
      <InfoItem label="Headquarters" value={profile.headquartersLocation} field="headquartersLocation" onEdit={onEdit} visibility={profile.visibility.headquartersLocation} isEditMode={isEditMode} />
      <InfoItem label="Organization Type" value={profile.organizationType} field="organizationType" onEdit={onEdit} visibility={profile.visibility.organizationType} isEditMode={isEditMode} />
      <InfoItem label="Industry Sectors" value={profile.industrySectors.join(', ')} field="industrySectors" onEdit={onEdit} visibility={profile.visibility.industrySectors} isEditMode={isEditMode} />
      <InfoItem label="Solutions and Services" value={profile.solutionsAndServices.join(', ')} field="solutionsAndServices" onEdit={onEdit} visibility={profile.visibility.solutionsAndServices} isEditMode={isEditMode} />
      <InfoItem label="Standards and Certifications" value={profile.standardsAndCertifications.join(', ')} field="standardsAndCertifications" onEdit={onEdit} visibility={profile.visibility.standardsAndCertifications} isEditMode={isEditMode} />
      
      {customFields.map((field, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            placeholder="Field Name"
            value={field.label}
            onChange={(e) => updateCustomField(index, 'label', e.target.value)}
            className="w-1/3"
          />
          <Input
            placeholder="Field Value"
            value={field.value}
            onChange={(e) => updateCustomField(index, 'value', e.target.value)}
            className="w-1/2"
          />
          <Button variant="ghost" size="icon" onClick={() => removeCustomField(index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      {isEditMode && (
        <Button onClick={addCustomField} className="mt-2">
          <Plus className="mr-2 h-4 w-4" /> Add Custom Field
        </Button>
      )}
    </div>
  )
}

