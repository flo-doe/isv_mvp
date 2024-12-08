import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from 'lucide-react'

export default function DataTab() {
  const [pdfs, setPdfs] = useState([
    { id: 1, name: 'Company Overview.pdf', hash: 'abc123', url: '/pdfs/company-overview.pdf', visibility: 'public' },
    { id: 2, name: 'Sustainability Report.pdf', hash: 'def456', url: '/pdfs/sustainability-report.pdf', visibility: 'private' },
  ])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const newPdf = {
        id: pdfs.length + 1,
        name: file.name,
        hash: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
        visibility: 'private'
      }
      setPdfs([...pdfs, newPdf])
    }
  }

  const toggleVisibility = (id: number) => {
    setPdfs(pdfs.map(pdf =>
      pdf.id === id ? {...pdf, visibility: pdf.visibility === 'public' ? 'private' : 'public'} : pdf
    ))
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>
      {pdfs.map(pdf => (
        <div key={pdf.id} className="flex items-center justify-between p-4 border-b border-gray-200">
          <a href={pdf.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {pdf.name}
          </a>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Hash: {pdf.hash}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleVisibility(pdf.id)}
            >
              {pdf.visibility === 'public' ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
          </div>
        </div>
      ))}
      <div>
        <Input type="file" accept=".pdf" onChange={handleFileUpload} />
        <p className="text-sm text-gray-500 mt-2">Upload PDF documents to share with others.</p>
      </div>
    </div>
  )
}

