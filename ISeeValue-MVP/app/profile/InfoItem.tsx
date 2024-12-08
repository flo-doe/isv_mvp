import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Edit2 } from 'lucide-react'

export function InfoItem({ label, value, field, onEdit, visibility, isEditMode }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedValue, setEditedValue] = useState(value)
  const [isVisible, setIsVisible] = useState(visibility)

  const handleSave = () => {
    onEdit(field, editedValue)
    setIsEditing(false)
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
    // Here you would typically update the visibility in your backend
    console.log(`Toggled visibility for ${field}: ${!isVisible}`)
  }

  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex-grow">
        <span className="font-medium">{label}:</span>
        {isEditMode && isEditing ? (
          <Input
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="mt-2"
          />
        ) : (
          <span className="ml-2">{value}</span>
        )}
      </div>
      {isEditMode && (
        <div className="flex items-center">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="mr-2">Save</Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="mr-2"
              >
                <Edit2 size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVisibility}
              >
                {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

